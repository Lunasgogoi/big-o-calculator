# backend/rules/python/recursion.py

def count_recursive_calls(node, func_name, code_bytes):
    """
    Recursively scans the AST to count how many times a function calls itself.
    """
    count = 0
    if node.type == 'call':
        func_node = node.child_by_field_name('function')
        if func_node:
            call_name = code_bytes[func_node.start_byte:func_node.end_byte].decode('utf8')
            if call_name == func_name:
                count += 1
                
    for child in node.children:
        count += count_recursive_calls(child, func_name, code_bytes)
        
    return count

def analyze_recursion(root_node, raw_code):
    """
    Distinguishes between Linear Recursion O(n) and Branching Recursion O(2^n).
    """
    code_bytes = bytes(raw_code, "utf8")
    
    for node in root_node.children:
        if node.type == 'function_definition':
            # 1. Get the name of the function
            name_node = node.child_by_field_name('name')
            if not name_node: continue
            
            func_name = code_bytes[name_node.start_byte:name_node.end_byte].decode('utf8')
            body_node = node.child_by_field_name('body')
            
            if not body_node: continue
            
            # 2. Count how many times it calls itself inside its own body
            calls = count_recursive_calls(body_node, func_name, code_bytes)
            
            if calls == 1:
                # Linear Recursion (e.g., Factorial, simple DFS)
                return {
                    "time_complexity": "O(n)",
                    "space_complexity": "O(n)", # The Call Stack takes O(n) memory!
                }
            elif calls > 1:
                # Branching Recursion (e.g., standard Fibonacci)
                return {
                    "time_complexity": "O(2^n)",
                    "space_complexity": "O(n)", # The Call Stack still takes O(n) memory
                }
                
    return None