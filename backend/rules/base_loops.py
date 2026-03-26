# backend/rules/base_loops.py

def get_max_loop_depth(node, current_depth=0):
    """
    Recursively walks the Tree-sitter AST to find the maximum loop nesting depth.
    """
    # 1. Define what Tree-sitter node types count as loops
    # (This covers Python. Later we can add 'do_statement' for C++/Java)
    loop_node_types = ['for_statement', 'while_statement']
    
    # 2. If the current node is a loop, increase our depth counter
    if node.type in loop_node_types:
        current_depth += 1
        
    max_depth = current_depth
    
    # 3. Recursively check all code block children inside this node
    for child in node.children:
        child_depth = get_max_loop_depth(child, current_depth)
        # Keep track of the deepest nesting we find
        max_depth = max(max_depth, child_depth)
        
    return max_depth

def analyze_base_loops(root_node):
    """
    Analyzes the root AST node and returns the base Big O time complexity.
    """
    # Calculate the exact nesting depth
    depth = get_max_loop_depth(root_node)
    
    # Generate the analysis steps to show the user what we did
    steps = [
        "Parsed source code into an Abstract Syntax Tree (AST).",
        "Traversed the AST looking for standard loop constructs (for/while).",
        f"Calculated a maximum loop nesting depth of {depth}."
    ]
    
    # Map the depth to a Big O notation
    if depth == 0:
        time_complexity = "O(1)"
        steps.append("No loops detected. Operations execute in constant time.")
    elif depth == 1:
        time_complexity = "O(N)"
        steps.append("Found single or side-by-side loops. Time scales linearly with input.")
    elif depth == 2:
        time_complexity = "O(N^2)"
        steps.append("Found nested loops. Time scales quadratically (e.g., comparing all pairs).")
    elif depth == 3:
        time_complexity = "O(N^3)"
        steps.append("Found 3-level deep nested loops. Time scales cubically.")
    else:
        time_complexity = f"O(N^{depth})"
        steps.append(f"Found highly nested loops ({depth} levels deep). Highly inefficient.")
        
    # Return a standardized dictionary
    return {
        "time_complexity": time_complexity,
        "space_complexity": "O(1)", # We will build space complexity logic later!
        "analysis_steps": steps
    }