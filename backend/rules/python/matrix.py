# backend/rules/python/matrix.py

def detect_matrix_traversal(node, code_bytes, loop_depth=0):
    """
    Hunts for nested loops that contain 2D array indexing (e.g., matrix[i][j]).
    """
    # Track how deep we are inside loops
    if node.type in ['for_statement', 'while_statement']:
        loop_depth += 1
        
    # If we are inside nested loops, look for a 2D array access
    if loop_depth >= 2:
        if node.type == 'subscript':
            # Check if the variable being accessed is ITSELF a subscript (e.g., X[i][j])
            value_node = node.child_by_field_name('value')
            if value_node and value_node.type == 'subscript':
                return True
                
    # Recursively check children, passing down the current loop depth
    for child in node.children:
        if detect_matrix_traversal(child, code_bytes, loop_depth):
            return True
            
    return False

def analyze_matrix(root_node, raw_code):
    """
    Detects standard 2D Matrix traversals and multiplications.
    """
    code_bytes = bytes(raw_code, "utf8")
    
    if detect_matrix_traversal(root_node, code_bytes):
        return {
            "time_complexity": "O(N * M)", 
            "space_complexity": "O(N * M)", # For things like Transpose/Multiplication that create a new grid
        }
            
    return None