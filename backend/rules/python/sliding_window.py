# backend/rules/sliding_window.py

def find_inner_while_with_pointer(node, code_bytes):
    """
    Looks for a 'while' statement that contains pointer math (like += or -=).
    """
    if node.type == 'while_statement':
        # Check if the body of the while loop modifies a variable (pointer math)
        body = node.child_by_field_name('body')
        if body:
            body_text = code_bytes[body.start_byte:body.end_byte].decode('utf8')
            if '+=' in body_text or '-=' in body_text:
                return True
                
    for child in node.children:
        if find_inner_while_with_pointer(child, code_bytes):
            return True
            
    return False

def detect_sliding_window(node, code_bytes):
    """
    Searches the AST for a loop containing a pointer-modifying while loop.
    """
    if node.type in ['for_statement', 'while_statement']:
        body = node.child_by_field_name('body')
        if body:
            # If we find a while loop inside this loop that modifies pointers
            if find_inner_while_with_pointer(body, code_bytes):
                return True
                
    for child in node.children:
        if detect_sliding_window(child, code_bytes):
            return True
            
    return False

def analyze_sliding_window(root_node, raw_code):
    """
    Returns O(n) if the amortized sliding window pattern is detected.
    """
    code_bytes = bytes(raw_code, "utf8")
    
    if detect_sliding_window(root_node, code_bytes):
        return {
            "time_complexity": "O(n)",
            "space_complexity": "O(1)", # Will be overridden by space analyzer if memory is allocated
            
        }
        
    return None