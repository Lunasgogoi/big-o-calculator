# backend/rules/dynamic_programming.py

def detect_memoization(node, code_bytes):
    """
    Looks for signs of caching: decorators (@cache) or manual dictionary lookups.
    """
    if node.type == 'decorator':
        decorator_text = code_bytes[node.start_byte:node.end_byte].decode('utf8')
        if 'cache' in decorator_text or 'memoize' in decorator_text:
            return True

    if node.type == 'if_statement':
        if_text = code_bytes[node.start_byte:node.end_byte].decode('utf8')
        if (' in ' in if_text or '!= -1' in if_text or 'is not None' in if_text) and 'return' in if_text:
            return True

    for child in node.children:
        if detect_memoization(child, code_bytes):
            return True
            
    return False

def analyze_dp(root_node, raw_code):
    """
    Checks if a function is recursive AND uses memoization, handling decorators!
    """
    code_bytes = bytes(raw_code, "utf8")
    
    for node in root_node.children:
        # 🚨 THE FIX: Check if it's wrapped in a decorator!
        func_node = node
        decorators = []
        
        if node.type == 'decorated_definition':
            # Unwrap it! Grab the decorators and the actual function inside.
            for child in node.children:
                if child.type == 'decorator':
                    decorators.append(child)
                if child.type == 'function_definition':
                    func_node = child

        # Now proceed as normal with the unwrapped function!
        if func_node.type == 'function_definition':
            name_node = func_node.child_by_field_name('name')
            if not name_node: continue
            
            func_name = code_bytes[name_node.start_byte:name_node.end_byte].decode('utf8')
            body_node = func_node.child_by_field_name('body')
            
            if not body_node: continue
            
            # Check for caching logic
            has_cache = False
            
            # 1. Did we find any @cache decorators when unwrapping?
            for dec in decorators:
                if detect_memoization(dec, code_bytes):
                    has_cache = True
            
            # 2. Check for manual dictionary caching in the body
            if not has_cache and detect_memoization(body_node, code_bytes):
                has_cache = True
                
            if has_cache:
                # Confirm it's actually recursive!
                body_text = code_bytes[body_node.start_byte:body_node.end_byte].decode('utf8')
                if func_name + '(' in body_text:
                    return {
                        "time_complexity": "O(n)",  # DP drops exponential time down to linear!
                        "space_complexity": "O(n)", # Caching requires memory
                    }
                    
    return None