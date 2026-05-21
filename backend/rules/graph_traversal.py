# backend/rules/graph_traversal.py

def detect_graph_structures(node, code_bytes):
    """
    Looks for the signature data structures of a graph traversal:
    1. A 'visited' set being initialized or added to.
    2. A Queue (deque/popleft) or Stack (pop) being used.
    """
    found_set = False
    found_queue_stack = False

    # Check function calls and methods
    if node.type in ['call', 'attribute']:
        text = code_bytes[node.start_byte:node.end_byte].decode('utf8').lower()
        
        # Look for Set operations (visited tracking)
        if 'set(' in text or '.add(' in text:
            found_set = True
            
        # Look for Queue/Stack operations (frontier tracking)
        if 'deque(' in text or '.popleft(' in text or '.pop(' in text or '.append(' in text:
            found_queue_stack = True

    for child in node.children:
        child_set, child_qs = detect_graph_structures(child, code_bytes)
        found_set = found_set or child_set
        found_queue_stack = found_queue_stack or child_qs
        
    return found_set, found_queue_stack

def has_loops(node):
    if node.type in ['for_statement', 'while_statement']:
        return True
    for child in node.children:
        if has_loops(child):
            return True
    return False

def analyze_graph_traversal(root_node, raw_code):
    """
    Returns O(V + E) if it detects graph traversal structures inside a loop/recursion.
    """
    code_bytes = bytes(raw_code, "utf8")
    
    # Do we have the required data structures?
    has_set, has_frontier = detect_graph_structures(root_node, code_bytes)
    
    # If we have a set (to track visited) and a queue/stack, AND we are looping:
    if has_set and has_frontier and has_loops(root_node):
        return {
            "time_complexity": "O(V + E)", 
            "space_complexity": "O(V)", # V is the number of vertices stored in the visited set
        }
            
    return None