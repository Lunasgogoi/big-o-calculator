# backend/rules/space_complexity.py

def get_allocation_depth(node, code_bytes):
    """
    Recursively scans the AST for signs of dynamic memory allocation 
    that scales with input (e.g., list comprehensions or appending to arrays).
    """
    # 1. Check for list or dictionary comprehensions (e.g., [x for x in range(n)])
    if node.type in ['list_comprehension', 'dictionary_comprehension', 'set_comprehension']:
        return True

    # 2. Check for method calls that grow a data structure (e.g., arr.append(x))
    if node.type == 'call':
        func_node = node.child_by_field_name('function')
        
        # In Tree-sitter, 'arr.append' is an attribute node
        if func_node and func_node.type == 'attribute':
            attr_node = func_node.child_by_field_name('attribute')
            if attr_node:
                method_name = code_bytes[attr_node.start_byte:attr_node.end_byte].decode('utf8')
                if method_name in ['append', 'add', 'insert', 'update']:
                    return True
                    
    # Keep scanning down the tree
    for child in node.children:
        if get_allocation_depth(child, code_bytes):
            return True
            
    return False

def analyze_space_complexity(root_node, raw_code, current_space_guess):
    """
    Analyzes the AST to determine space complexity. 
    It will upgrade O(1) based on allocations, but it will NEVER downgrade 
    a guess that was already flagged as O(n) by a smarter rule.
    """
    code_bytes = bytes(raw_code, "utf8")
    depth = get_allocation_depth(root_node, code_bytes)
    
    # 1. If the baseline is O(1), let the allocation depth dictate the final space
    if current_space_guess == "O(1)":
        if depth == 0:
            return "O(1)"
        elif depth == 1:
            return "O(n)"
        else:
            return f"O(n^{depth})"
            
    # 2. If a smart rule (like DP or Recursion) already flagged it as O(n),
    # we NEVER downgrade it to O(1). We only upgrade it if depth >= 2.
    if current_space_guess == "O(n)":
        if depth >= 2:
            return f"O(n^{depth})"
        return "O(n)"
        
    # 3. If it's already a complex space guess, just trust the smart rule
    return current_space_guess