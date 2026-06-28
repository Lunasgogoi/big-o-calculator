from rules.cpp.common import LOOP_NODE_TYPES, code_bytes, node_text, walk


def analyze_monotonic_stack(root_node, raw_code):
    source = code_bytes(raw_code)
    lowered = raw_code.lower()
    has_stack_type = "stack<" in lowered or "vector<" in lowered or "deque<" in lowered

    if not has_stack_type:
        return None

    for node in walk(root_node):
        if node.type not in LOOP_NODE_TYPES:
            continue

        text = node_text(node, source).lower()
        has_push = ".push(" in text or ".push_back(" in text
        has_pop = ".pop(" in text or ".pop_back(" in text
        has_inner_while = "while" in text

        if has_push and has_pop and has_inner_while:
            return {
                "time_complexity": "O(n)",
                "space_complexity": "O(n)",
            }

    return None
