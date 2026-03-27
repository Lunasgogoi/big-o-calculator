# backend/rules/sorting_search.py

def walk_ast_for_binary_search(node, code_bytes):
    """
    Recursively checks if a while loop contains a division by 2 (halving the search space).
    """
    if node.type == 'while_statement':
        # Get the actual text inside the while loop
        body_text = code_bytes[node.start_byte:node.end_byte].decode('utf8')
        
        # Look for the classic binary search 'halving' fingerprint
        if '/ 2' in body_text or '// 2' in body_text or '>> 1' in body_text:
            return True
            
    # Keep searching down the tree
    for child in node.children:
        if walk_ast_for_binary_search(child, code_bytes):
            return True
            
    return False

def analyze_sorting_search(root_node, raw_code):
    """
    Checks if the code matches known searching/sorting algorithms.
    Returns a result dict if found, or None if it should fall back to base rules.
    """
    code_bytes = bytes(raw_code, "utf8")
    
    # Check for Binary Search
    if walk_ast_for_binary_search(root_node, code_bytes):
        return {
            "time_complexity": "O(log n)",
            "space_complexity": "O(1)",
            "analysis_steps": [
                "Parsed source code into an Abstract Syntax Tree (AST).",
                "Detected a 'while' loop construct.",
                "Found a division by 2 operation inside the loop.",
                "Identified the classic 'Binary Search' pattern (halving the search space)."
            ]
        }
        
    # If it doesn't match anything here, return None so main.py knows to keep trying
    return None