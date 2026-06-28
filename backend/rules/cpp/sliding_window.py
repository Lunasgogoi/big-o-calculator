from rules.cpp.common import LOOP_NODE_TYPES, code_bytes, node_text, walk


def _has_pointer_moving_while(node, source: bytes) -> bool:
    for child in walk(node):
        if child.type != "while_statement":
            continue

        text = node_text(child, source).lower()
        if "/=" in text or ">>=" in text:
            return False
        if "++" in text or "--" in text or "+=" in text or "-=" in text:
            return True

    return False


def analyze_sliding_window(root_node, raw_code):
    source = code_bytes(raw_code)

    for node in walk(root_node):
        if node.type in LOOP_NODE_TYPES and node.type != "while_statement":
            body = node.child_by_field_name("body")
            if body and _has_pointer_moving_while(body, source):
                return {
                    "time_complexity": "O(n)",
                    "space_complexity": "O(1)",
                }

    return None
