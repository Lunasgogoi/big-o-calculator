from rules.cpp.common import LOOP_NODE_TYPES


def get_max_loop_depth(node, current_depth=0):
    if node.type in LOOP_NODE_TYPES:
        current_depth += 1

    max_depth = current_depth
    for child in node.children:
        max_depth = max(max_depth, get_max_loop_depth(child, current_depth))

    return max_depth


def analyze_base_loops(root_node):
    depth = get_max_loop_depth(root_node)

    if depth == 0:
        time_complexity = "O(1)"
    elif depth == 1:
        time_complexity = "O(N)"
    elif depth == 2:
        time_complexity = "O(N^2)"
    elif depth == 3:
        time_complexity = "O(N^3)"
    else:
        time_complexity = f"O(N^{depth})"

    return {
        "time_complexity": time_complexity,
        "space_complexity": "O(1)",
    }
