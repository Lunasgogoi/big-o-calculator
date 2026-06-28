from rules.cpp.common import code_bytes, node_text, walk


def _function_name(function_node, source: bytes):
    declarator = function_node.child_by_field_name("declarator")
    if not declarator:
        return None

    for child in walk(declarator):
        if child.type == "identifier":
            return node_text(child, source)

    return None


def _count_calls(node, function_name: str, source: bytes) -> int:
    count = 0
    for child in walk(node):
        if child.type != "call_expression":
            continue

        call_target = child.child_by_field_name("function")
        if call_target and node_text(call_target, source) == function_name:
            count += 1

    return count


def _has_tree_child_access(node, source: bytes) -> bool:
    body_text = node_text(node, source).lower()
    return "->left" in body_text or "->right" in body_text or ".left" in body_text or ".right" in body_text


def analyze_recursion(root_node, raw_code):
    source = code_bytes(raw_code)

    for node in walk(root_node):
        if node.type != "function_definition":
            continue

        function_name = _function_name(node, source)
        body_node = node.child_by_field_name("body")
        if not function_name or not body_node:
            continue

        recursive_calls = _count_calls(body_node, function_name, source)
        if recursive_calls > 0 and _has_tree_child_access(body_node, source):
            return {"time_complexity": "O(n)", "space_complexity": "O(h)"}

        if recursive_calls == 1:
            return {"time_complexity": "O(n)", "space_complexity": "O(n)"}

        if recursive_calls > 1:
            body_text = node_text(body_node, source).lower().replace(" ", "")
            if "/2" in body_text or ">>1" in body_text or "mid" in body_text:
                return {"time_complexity": "O(n log n)", "space_complexity": "O(n)"}

            return {"time_complexity": "O(2^n)", "space_complexity": "O(n)"}

    return None
