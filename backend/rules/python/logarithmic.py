# backend/rules/python/logarithmic.py

def detect_log_division(node, code_bytes):
    """
    Looks for division or bit-shift assignments (e.g., //=, /=, >>=) 
    which signify the search space is being halved or reduced logarithmically.
    """
    # 1. Check for augmented assignments (num //= 10)
    if node.type == 'augmented_assignment':
        op_node = node.child_by_field_name('operator')
        if op_node:
            op = code_bytes[op_node.start_byte:op_node.end_byte].decode('utf8')
            if op in ['//=', '/=', '>>=']:
                return True
                
    # 2. Check for standard re-assignments (num = num // 10)
    if node.type == 'assignment':
        right = node.child_by_field_name('right')
        if right and right.type == 'binary_operator':
            op_node = right.child_by_field_name('operator')
            if op_node:
                op = code_bytes[op_node.start_byte:op_node.end_byte].decode('utf8')
                if op in ['//', '/', '>>']:
                    return True
                    
    for child in node.children:
        if detect_log_division(child, code_bytes):
            return True
            
    return False

def analyze_logarithmic(root_node, raw_code):
    """
    Returns O(log n) if a loop relies on division or bit-shifting to progress.
    """
    code_bytes = bytes(raw_code, "utf8")
    
    # Let's hunt for a loop...
    def check_loops(node):
        if node.type in ['while_statement', 'for_statement']:
            body = node.child_by_field_name('body')
            # ...and see if the body reduces a variable logarithmically!
            if body and detect_log_division(body, code_bytes):
                return True
        for child in node.children:
            if check_loops(child):
                return True
        return False

    if check_loops(root_node):
        return {
            "time_complexity": "O(log n)",
            "space_complexity": "O(1)", 
        }
        
    return None