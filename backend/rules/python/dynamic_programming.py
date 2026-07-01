# backend/rules/dynamic_programming.py


def _walk(node):
    yield node
    for child in node.children:
        yield from _walk(child)


def _node_text(node, code_bytes):
    return code_bytes[node.start_byte:node.end_byte].decode("utf8")


def _unwrap_function(node):
    decorators = []
    func_node = node

    if node.type == "decorated_definition":
        for child in node.children:
            if child.type == "decorator":
                decorators.append(child)
            if child.type == "function_definition":
                func_node = child

    if func_node.type != "function_definition":
        return None, decorators

    return func_node, decorators


def _function_name(function_node, code_bytes):
    name_node = function_node.child_by_field_name("name")
    if not name_node:
        return None
    return _node_text(name_node, code_bytes)


def _parameter_count(function_node):
    params = function_node.child_by_field_name("parameters")
    if not params:
        return 0

    return sum(1 for child in params.children if child.type == "identifier")


def detect_memoization(node, code_bytes):
    """
    Looks for cached subproblem results through decorators, dictionaries,
    or preallocated dp/memo/cache table checks.
    """
    if node.type == "decorator":
        decorator_text = _node_text(node, code_bytes).lower()
        if "cache" in decorator_text or "memoize" in decorator_text or "lru_cache" in decorator_text:
            return True

    if node.type == "if_statement":
        if_text = _node_text(node, code_bytes).lower()
        has_cache_lookup = (
            " in " in if_text
            or "!= -1" in if_text
            or "!=-1" in if_text
            or "is not none" in if_text
        )
        has_cache_name = "dp[" in if_text or "memo" in if_text or "cache" in if_text
        if has_cache_lookup and ("return" in if_text or has_cache_name):
            return True

    for child in node.children:
        if detect_memoization(child, code_bytes):
            return True

    return False


def _has_2d_cache_access(text):
    compact = text.lower().replace(" ", "")
    return (
        "dp[" in compact and "][" in compact
        or "memo[" in compact and "][" in compact
        or "cache[" in compact and "][" in compact
    )


def _has_2d_cache_allocation(raw_code):
    compact = raw_code.lower().replace(" ", "").replace("\n", "")
    return (
        "dp=[[" in compact
        or "memo=[[" in compact
        or "cache=[[" in compact
        or ("[[" in compact and "for_inrange" in compact)
    )


def analyze_dp(root_node, raw_code):
    """
    Detects recursive memoization, including nested helper functions.
    """
    code_bytes = bytes(raw_code, "utf8")

    for node in _walk(root_node):
        func_node, decorators = _unwrap_function(node)
        if not func_node:
            continue

        func_name = _function_name(func_node, code_bytes)
        body_node = func_node.child_by_field_name("body")
        if not func_name or not body_node:
            continue

        body_text = _node_text(body_node, code_bytes)
        is_recursive = f"{func_name}(" in body_text
        has_decorator_cache = any(detect_memoization(dec, code_bytes) for dec in decorators)
        has_cache = has_decorator_cache or detect_memoization(body_node, code_bytes)

        if not is_recursive or not has_cache:
            continue

        has_2d_state = (
            _has_2d_cache_access(body_text)
            or _has_2d_cache_allocation(raw_code)
            or (has_decorator_cache and _parameter_count(func_node) >= 2)
        )

        if has_2d_state:
            return {
                "time_complexity": "O(N * M)",
                "space_complexity": "O(N * M)",
                "evidence": ["Detected recursive memoization over a 2D DP state/cache."],
            }

        return {
            "time_complexity": "O(n)",
            "space_complexity": "O(n)",
            "evidence": ["Detected recursive memoization with cached subproblem results."],
        }

    return None
