from rules.cpp.common import LOOP_NODE_TYPES, code_bytes, node_text


def get_allocation_depth(node, source: bytes, current_loop_depth=0):
    max_depth = 0

    if node.type in LOOP_NODE_TYPES:
        current_loop_depth += 1

    if node.type == "declaration":
        text = node_text(node, source).lower().replace(" ", "")
        if "vector<vector" in text:
            max_depth = max(max_depth, 2)
        elif "vector<" in text or "unordered_map<" in text or "unordered_set<" in text or "map<" in text or "set<" in text:
            max_depth = max(max_depth, 1)

    if node.type == "call_expression":
        text = node_text(node, source).lower()
        if ".push_back(" in text or ".insert(" in text or ".emplace(" in text or ".push(" in text:
            max_depth = max(max_depth, max(1, current_loop_depth))

    for child in node.children:
        max_depth = max(max_depth, get_allocation_depth(child, source, current_loop_depth))

    return max_depth


def analyze_space_complexity(root_node, raw_code, current_space_guess):
    source = code_bytes(raw_code)
    depth = get_allocation_depth(root_node, source)

    calculated_space = "O(1)"
    if depth == 1:
        calculated_space = "O(n)"
    elif depth == 2:
        calculated_space = "O(n^2)"
    elif depth >= 3:
        calculated_space = f"O(n^{depth})"

    if current_space_guess not in {"O(1)", "O(n)", "O(n^2)"}:
        return current_space_guess

    ranks = {"O(1)": 1, "O(n)": 2, "O(n^2)": 3, "O(n^3)": 4}
    if ranks.get(calculated_space, 0) > ranks.get(current_space_guess, 0):
        return calculated_space

    return current_space_guess
