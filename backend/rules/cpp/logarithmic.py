from rules.cpp.common import LOOP_NODE_TYPES, code_bytes, node_text, walk


def _has_log_progress(node, source: bytes) -> bool:
    text = node_text(node, source).replace(" ", "")
    return any(signal in text for signal in ["//=", "/=", ">>=", "/2", ">>1"])


def _get_log_loop_depth(node, source: bytes, current_depth=0):
    local_depth = current_depth
    max_depth = current_depth

    if node.type in LOOP_NODE_TYPES and _has_log_progress(node, source):
        local_depth += 1
        max_depth = max(max_depth, local_depth)

    for child in node.children:
        max_depth = max(max_depth, _get_log_loop_depth(child, source, local_depth))

    return max_depth


def analyze_logarithmic(root_node, raw_code):
    source = code_bytes(raw_code)
    depth = _get_log_loop_depth(root_node, source)

    if depth >= 2:
        return {
            "time_complexity": "O((log n)^2)",
            "space_complexity": "O(1)",
        }

    if depth == 1:
        return {
            "time_complexity": "O(log n)",
            "space_complexity": "O(1)",
        }

    for node in walk(root_node):
        if node.type in LOOP_NODE_TYPES and _has_log_progress(node, source):
            return {
                "time_complexity": "O(log n)",
                "space_complexity": "O(1)",
            }

    return None
