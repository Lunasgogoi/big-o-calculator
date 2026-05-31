# backend/rules/tabulation.py

def detect_array_preallocation(node, code_bytes):
    """
    Looks for DP array pre-allocation like: dp = [0] * n
    """
    if node.type == 'assignment':
        right = node.child_by_field_name('right')
        if right and right.type == 'binary_operator':
            # Look for: [list] * [variable]
            left_op = right.child_by_field_name('left')
            op = right.child_by_field_name('operator')
            
            if left_op and left_op.type == 'list' and op:
                if code_bytes[op.start_byte:op.end_byte].decode('utf8') == '*':
                    return True
                    
    # Also check for 2D DP grids (e.g., [[0] * n for _ in range(m)])
    if node.type == 'list_comprehension':
        body = node.child_by_field_name('body')
        if body and body.type == 'binary_operator':
            left_op = body.child_by_field_name('left')
            if left_op and left_op.type == 'list':
                return True

    for child in node.children:
        if detect_array_preallocation(child, code_bytes):
            return True
            
    return False

def has_loops(node):
    """Simple helper to confirm the function actually iterates."""
    if node.type in ['for_statement', 'while_statement']:
        return True
    for child in node.children:
        if has_loops(child):
            return True
    return False

def analyze_tabulation(root_node, raw_code):
    """
    Checks if the code uses Bottom-Up DP (Tabulation) via array pre-allocation.
    """
    code_bytes = bytes(raw_code, "utf8")
    
    # Bottom-Up DP requires an array to be created...
    if detect_array_preallocation(root_node, code_bytes):
        # ...and it requires a loop to fill that array!
        if has_loops(root_node):
            return {
                "time_complexity": "O(n)", 
                "space_complexity": "O(n)", 
            }
            
    return None