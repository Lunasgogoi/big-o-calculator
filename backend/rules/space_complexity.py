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
    Analyzes the AST to determine space complexity for ANY depth: O(1), O(n), O(n^2), O(n^3), etc.
    """
    # If a previous rule (like Merge Sort) already knows the exact space, trust it.
    if current_space_guess not in ["O(1)", "O(n)"]: 
        return current_space_guess
        
    code_bytes = bytes(raw_code, "utf8")
    
    # Calculate how deeply nested our memory allocations are
    depth = get_allocation_depth(root_node, code_bytes)
    
    # Dynamically generate the Big O notation based on the actual depth!
    if depth == 0:
        return "O(1)"
    elif depth == 1:
        return "O(n)"
    else:
        return f"O(n^{depth})"