def detect_bit_loop(node, code_bytes):
    if node.type in ['while_statement', 'for_statement']:
        text = code_bytes[node.start_byte:node.end_byte].decode('utf8').replace(" ", "")
        bit_progress_signals = ['&=', '^=', '|=', '>>=', '<<=', 'n=n&(n-1)', 'x=x&(x-1)']
        if any(signal in text for signal in bit_progress_signals):
            return True

    if node.type == 'call':
        text = code_bytes[node.start_byte:node.end_byte].decode('utf8').lower()
        if '.bit_count(' in text:
            return True

    for child in node.children:
        if detect_bit_loop(child, code_bytes):
            return True

    return False


def analyze_bit_manipulation(root_node, raw_code):
    code_bytes = bytes(raw_code, "utf8")

    if detect_bit_loop(root_node, code_bytes):
        return {
            "time_complexity": "O(log n)",
            "space_complexity": "O(1)",
        }

    return None
