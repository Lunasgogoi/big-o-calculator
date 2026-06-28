from rules.cpp.common import code_bytes, walk, node_text


SORT_FUNCTIONS = {"sort", "stable_sort", "partial_sort", "nth_element"}


def analyze_sort_search(root_node, raw_code):
    source = code_bytes(raw_code)

    for node in walk(root_node):
        if node.type != "call_expression":
            continue

        function_node = node.child_by_field_name("function")
        if not function_node:
            continue

        function_name = node_text(function_node, source).split("::")[-1].lower()
        if function_name in SORT_FUNCTIONS or function_name.endswith(".sort"):
            return {
                "time_complexity": "O(n log n)",
                "space_complexity": "O(1)",
            }

    return None
