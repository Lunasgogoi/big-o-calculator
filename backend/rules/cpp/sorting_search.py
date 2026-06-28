from rules.cpp.common import code_bytes, node_text, walk


def analyze_sorting_search(root_node, raw_code):
    source = code_bytes(raw_code)
    lowered = raw_code.lower().replace(" ", "")

    if "binary_search(" in lowered or "lower_bound(" in lowered or "upper_bound(" in lowered:
        return {
            "time_complexity": "O(log n)",
            "space_complexity": "O(1)",
        }

    for node in walk(root_node):
        if node.type != "while_statement":
            continue

        text = node_text(node, source).replace(" ", "")
        if "/2" in text or ">>1" in text or "mid=" in text:
            return {
                "time_complexity": "O(log n)",
                "space_complexity": "O(1)",
            }

    return None
