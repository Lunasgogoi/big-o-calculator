from rules.cpp.common import LOOP_NODE_TYPES, walk


def _has_nested_subscript(node) -> bool:
    if node.type != "subscript_expression":
        return False

    return any(child.type == "subscript_expression" for child in node.children)


def _detect_matrix_traversal(node, loop_depth=0) -> bool:
    if node.type in LOOP_NODE_TYPES:
        loop_depth += 1

    if loop_depth >= 2 and _has_nested_subscript(node):
        return True

    return any(_detect_matrix_traversal(child, loop_depth) for child in node.children)


def analyze_matrix(root_node, raw_code):
    if _detect_matrix_traversal(root_node):
        return {
            "time_complexity": "O(N * M)",
            "space_complexity": "O(N * M)",
        }

    return None
