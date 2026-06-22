# backend/rules/python/morris_traversal.py

def detect_morris_signatures(node, code_bytes, context):
    """
    Looks for the distinct threading pattern of Morris Traversal:
    1. Modifying a .right pointer to point to a variable (creating thread).
    2. Modifying a .right pointer to point to None (breaking thread).
    3. An inner loop checking for cycle or None.
    """
    if node.type == 'while_statement':
        condition = node.child_by_field_name('condition')
        if condition:
            cond_text = code_bytes[condition.start_byte:condition.end_byte].decode('utf8').lower()
            # Typically checks: while pre.right is not None and pre.right != curr
            if '!=' in cond_text or 'is not' in cond_text:
                context['has_inner_while'] = True
                
    if node.type == 'assignment':
        left = node.child_by_field_name('left')
        right = node.child_by_field_name('right')
        if left and right:
            left_text = code_bytes[left.start_byte:left.end_byte].decode('utf8')
            right_text = code_bytes[right.start_byte:right.end_byte].decode('utf8')
            
            # Check if we are modifying a right pointer
            if left_text.endswith('.right'):
                if right_text == 'none':
                    context['breaks_thread'] = True
                elif right.type == 'identifier': # Pointing it to a node variable
                    context['makes_thread'] = True

    for child in node.children:
        detect_morris_signatures(child, code_bytes, context)

def analyze_morris_traversal(root_node, raw_code):
    """
    Detects Morris Inorder/Preorder Traversal (O(n) Time, O(1) Space).
    """
    code_bytes = bytes(raw_code, "utf8")
    context = {'has_inner_while': False, 'makes_thread': False, 'breaks_thread': False}
    
    # Quick filter: Morris requires heavy use of left and right pointers
    if '.left' in raw_code and '.right' in raw_code:
        detect_morris_signatures(root_node, code_bytes, context)
        
        # If we dynamically rewire the tree and restore it, it is a Morris Traversal!
        if context['has_inner_while'] and context['makes_thread'] and context['breaks_thread']:
            return {
                "time_complexity": "O(n)",
                "space_complexity": "O(1)", 
            }
            
    return None