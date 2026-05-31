# backend/rules/monotonic_stack.py

def find_pop_in_while(node, code_bytes):
    """
    Looks for a .pop() operation specifically inside a while loop.
    """
    if node.type == 'while_statement':
        body = node.child_by_field_name('body')
        if body:
            body_text = code_bytes[body.start_byte:body.end_byte].decode('utf8')
            if '.pop(' in body_text:
                return True
                
    for child in node.children:
        if find_pop_in_while(child, code_bytes):
            return True
            
    return False

def detect_monotonic_stack(node, code_bytes):
    """
    Hunts for a 'for' loop that appends to a stack, but uses an inner 'while' loop to pop.
    """
    if node.type == 'for_statement':
        body = node.child_by_field_name('body')
        if body:
            body_text = code_bytes[body.start_byte:body.end_byte].decode('utf8')
            
            # 1. Does this loop push to a stack?
            if '.append(' in body_text:
                # 2. Does it contain an inner while loop that pops from the stack?
                if find_pop_in_while(body, code_bytes):
                    return True

    for child in node.children:
        if detect_monotonic_stack(child, code_bytes):
            return True
            
    return False

def analyze_monotonic_stack(root_node, raw_code):
    """
    Returns O(n) Time and Space if the Monotonic Stack pattern is detected.
    """
    code_bytes = bytes(raw_code, "utf8")
    
    if detect_monotonic_stack(root_node, code_bytes):
        return {
            "time_complexity": "O(n)",  # Amortized O(n) despite the nested loops!
            "space_complexity": "O(n)", # The stack takes up to O(n) space
        }
            
    return None