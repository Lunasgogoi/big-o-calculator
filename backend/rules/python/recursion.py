# backend/rules/python/recursion.py

def count_recursive_calls(node, func_name, code_bytes):
    """Recursively scans the AST to count how many times a function calls itself."""
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
    """Distinguishes between Linear O(n), Branching O(2^n), and Divide & Conquer O(n log n)."""
    code_bytes = bytes(raw_code, "utf8")
    
    for node in root_node.children:
        if node.type == 'function_definition':
            name_node = node.child_by_field_name('name')
            if not name_node: continue
            
            func_name = code_bytes[name_node.start_byte:name_node.end_byte].decode('utf8')
            body_node = node.child_by_field_name('body')
            if not body_node: continue
            
            calls = count_recursive_calls(body_node, func_name, code_bytes)
            
            if calls == 1:
                return {"time_complexity": "O(n)", "space_complexity": "O(n)"}
                
            elif calls > 1:
                # 🚨 DIVIDE & CONQUER INTERCEPTOR 🚨
                # Extract the raw text of the function body to look for halving math
                body_text = code_bytes[body_node.start_byte:body_node.end_byte].decode('utf8').lower().replace(" ", "")
                
                if "//2" in body_text or "/2" in body_text or ">>1" in body_text or "mid=" in body_text or "[:" in body_text:
                    return {
                        "time_complexity": "O(n log n)",
                        "space_complexity": "O(n)", # Merge sort requires O(n) array allocations
                    }
                    
                # If no halving math is found, it's standard Branching Recursion
                return {
                    "time_complexity": "O(2^n)",
                    "space_complexity": "O(n)", 
                }
                
    return None