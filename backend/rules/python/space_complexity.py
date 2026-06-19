# backend/rules/python/space_complexity.py

def get_allocation_depth(node, code_bytes, current_loop_depth=0):
    """
    Recursively scans the AST to find the maximum depth of memory allocation.
    Returns an integer representing the dimension of the space (e.g., 1 for O(n), 2 for O(n^2)).
    """
    max_depth = 0

    # 1. Track if we are inside a loop (increases multiplier for appends)
    if node.type in ['for_statement', 'while_statement']:
        current_loop_depth += 1

    # 2. Track Comprehensions (These are essentially loops that create arrays/dicts)
    if node.type in ['list_comprehension', 'dictionary_comprehension', 'set_comprehension']:
        # A comprehension immediately counts as at least 1 dimension of space O(n)
        local_depth = current_loop_depth + 1
        max_depth = max(max_depth, local_depth)
        # We temporarily increase loop depth for children (to catch 2D matrices)
        current_loop_depth += 1 

    # 3. Check for Array Multiplication (e.g., [0] * n)
    if node.type == 'binary_operator':
        op_node = node.child_by_field_name('operator')
        if op_node:
            operator_str = code_bytes[op_node.start_byte:op_node.end_byte].decode('utf8')
            if operator_str == '*':
                left_node = node.child_by_field_name('left')
                # If we are multiplying a list by a variable, it allocates O(n) space!
                if left_node and left_node.type == 'list':
                    max_depth = max(max_depth, current_loop_depth + 1)

    # 4. Check for dynamic growth (.append, .add) inside loops
    if node.type == 'call':
        func_node = node.child_by_field_name('function')
        if func_node and func_node.type == 'attribute':
            attr_node = func_node.child_by_field_name('attribute')
            if attr_node:
                method_name = code_bytes[attr_node.start_byte:attr_node.end_byte].decode('utf8')
                if method_name in ['append', 'add', 'insert', 'update']:
                    # The space grows relative to how many loops deep we are
                    max_depth = max(max_depth, current_loop_depth)

    # Recursively check all children
    for child in node.children:
        child_depth = get_allocation_depth(child, code_bytes, current_loop_depth)
        max_depth = max(max_depth, child_depth)

    return max_depth


def analyze_space_complexity(root_node, raw_code, current_space_guess):
    """
    Analyzes the AST to determine space complexity.
    Upgrades O(1) based on allocations, and prevents downgrading smart rule outputs.
    """
    code_bytes = bytes(raw_code, "utf8")
    
    # Get the integer depth of our memory allocations
    depth = get_allocation_depth(root_node, code_bytes)
    
    # Map the integer depth to a Big O string
    calculated_space = "O(1)"
    if depth == 1:
        calculated_space = "O(n)"
    elif depth == 2:
        calculated_space = "O(n^2)"
    elif depth >= 3:
        calculated_space = f"O(n^{depth})"

    # --- RESOLVE CLASHES WITH SMART RULES ---
    
    # If the smart rule already output something heavy (like O(V + E) or O(N * M)), trust it.
    if current_space_guess not in ["O(1)", "O(n)", "O(n^2)"]:
        return current_space_guess
        
    # Otherwise, return whichever is mathematically heavier: our calculated depth or the smart rule
    ranks = {"O(1)": 1, "O(n)": 2, "O(n^2)": 3, "O(n^3)": 4}
    
    rank_calculated = ranks.get(calculated_space, 0)
    rank_current = ranks.get(current_space_guess, 0)
    
    if rank_calculated > rank_current:
        return calculated_space
        
    return current_space_guess