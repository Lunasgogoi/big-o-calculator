# backend/rules/binary_tree.py

def detect_tree_attributes(node, code_bytes):
    """
    Hunts for explicit Binary Tree structural properties like .left or .right.
    This works for both recursive and iterative (Queue/Stack) approaches!
    """
    if node.type == 'attribute':
        attr_text = code_bytes[node.start_byte:node.end_byte].decode('utf8').lower()
        if attr_text.endswith('.left') or attr_text.endswith('.right'):
            return True
            
    for child in node.children:
        if detect_tree_attributes(child, code_bytes):
            return True
            
    return False

def has_bst_conditional(node, code_bytes):
    """
    Looks for an 'if' statement that compares values (e.g., target < node.val)
    to identify a Binary Search Tree cutting the search space.
    """
    if node.type == 'if_statement':
        condition = node.child_by_field_name('condition')
        if condition:
            cond_text = code_bytes[condition.start_byte:condition.end_byte].decode('utf8')
            if '<' in cond_text or '>' in cond_text:
                return True
                
    for child in node.children:
        if has_bst_conditional(child, code_bytes):
            return True
    return False


def has_bfs_frontier(node, code_bytes):
    """
    Detects iterative breadth-first traversal where the queue/frontier can grow to O(n).
    Recursive traversal is handled as O(h) call-stack space below.
    """
    text = code_bytes[node.start_byte:node.end_byte].decode('utf8').lower()
    frontier_signals = ['deque(', 'queue(', 'popleft(', 'pop(0)', '.get(']
    loop_signals = ['while ', 'for ']
    return any(signal in text for signal in frontier_signals) and any(signal in text for signal in loop_signals)


def analyze_binary_tree(root_node, raw_code):
    """
    Distinguishes between standard Tree Traversal and BST Search.
    """
    code_bytes = bytes(raw_code, "utf8")
    
    # 🚨 NEW: If it explicitly accesses .left or .right, it is a Tree algorithm!
    if detect_tree_attributes(root_node, code_bytes):
        
        # Does it use < or > to cut the search space in half?
        if has_bst_conditional(root_node, code_bytes):
            return {
                "time_complexity": "O(log n)",
                "space_complexity": "O(h)", # Height of tree
            }
        # Queue-based breadth-first traversals can hold an entire tree level.
        if has_bfs_frontier(root_node, code_bytes):
            return {
                "time_complexity": "O(n)",
                "space_complexity": "O(n)",
            }

        # Recursive DFS traversal uses call-stack space proportional to tree height.
        else:
            return {
                "time_complexity": "O(n)",
                "space_complexity": "O(h)",
            }
                
    return None
