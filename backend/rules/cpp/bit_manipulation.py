from rules.cpp.common import LOOP_NODE_TYPES, code_bytes, node_text, walk


def analyze_bit_manipulation(root_node, raw_code):
    source = code_bytes(raw_code)
    lowered = raw_code.lower()

    if "__builtin_popcount" in lowered or "popcount(" in lowered:
        return {
            "time_complexity": "O(log n)",
            "space_complexity": "O(1)",
        }

    for node in walk(root_node):
        if node.type not in LOOP_NODE_TYPES:
            continue

        text = node_text(node, source).replace(" ", "")
        if any(signal in text for signal in ["&=", "^=", "|=", ">>=", "<<=", "n=n&(n-1)", "x=x&(x-1)"]):
            return {
                "time_complexity": "O(log n)",
                "space_complexity": "O(1)",
            }

    return None
