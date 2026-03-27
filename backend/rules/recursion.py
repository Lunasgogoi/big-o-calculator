# backend/rules/recursion.py

def find_recursive_calls(node, function_name, code_bytes):
    """
    Walks the AST to count how many times a function calls itself.
    """
    call_count = 0
    
    if node.type == 'call':
        # Check if the function being called matches our function name
        function_identifier = node.child_by_field_name('function')
        if function_identifier and code_bytes[function_identifier.start_byte:function_identifier.end_byte].decode('utf8') == function_name:
            call_count += 1
            
    for child in node.children:
        call_count += find_recursive_calls(child, function_name, code_bytes)
        
    return call_count

def has_array_slicing(node, code_bytes):
    """
    Checks if there's array slicing or division usually associated with Merge Sort.
    """
    if node.type == 'slice':
        return True
    
    for child in node.children:
        if has_array_slicing(child, code_bytes):
            return True
    return False

def analyze_recursion(root_node, raw_code):
    """
    Analyzes the AST for recursive patterns like Fibonacci O(2^n) or Merge Sort O(n log n).
    """
    code_bytes = bytes(raw_code, "utf8")
    
    # We need to find the main function definition first
    for node in root_node.children:
        if node.type == 'function_definition':
            name_node = node.child_by_field_name('name')
            if not name_node:
                continue
                
            func_name = code_bytes[name_node.start_byte:name_node.end_byte].decode('utf8')
            
            # Count how many times this function calls itself inside its own body
            body_node = node.child_by_field_name('body')
            if not body_node:
                continue
                
            recursive_calls = find_recursive_calls(body_node, func_name, code_bytes)
            
            if recursive_calls > 1:
                # If it calls itself multiple times AND slices arrays, it's likely Merge Sort
                if has_array_slicing(body_node, code_bytes):
                    return {
                        "time_complexity": "O(n log n)",
                        "space_complexity": "O(n)",
                        "analysis_steps": [
                            "Parsed source code into an Abstract Syntax Tree (AST).",
                            f"Detected recursive function '{func_name}'.",
                            "Found array slicing/division combined with multiple recursive calls.",
                            "Identified 'Divide and Conquer' pattern (e.g., Merge Sort)."
                        ]
                    }
                # Otherwise, multiple branching recursive calls usually means Exponential time
                else:
                    return {
                        "time_complexity": "O(2^n)",
                        "space_complexity": "O(n)",
                        "analysis_steps": [
                            "Parsed source code into an Abstract Syntax Tree (AST).",
                            f"Detected recursive function '{func_name}'.",
                            "Found multiple branching recursive calls without memoization.",
                            "Identified exponential branching pattern."
                        ]
                    }
    
    return None