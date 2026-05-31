# backend/rules/linked_list.py

def detect_ll_attributes(node, code_bytes):
    """
    Hunts for explicit Linked List structural properties like .next.
    """
    if node.type == 'attribute':
        attr_text = code_bytes[node.start_byte:node.end_byte].decode('utf8').lower()
        if attr_text.endswith('.next'):
            return True
            
    for child in node.children:
        if detect_ll_attributes(child, code_bytes):
            return True
            
    return False

def detect_fast_pointer(node, code_bytes):
    """
    Hunts for the famous Fast/Slow pointer pattern by looking for .next.next
    """
    if node.type == 'attribute':
        attr_text = code_bytes[node.start_byte:node.end_byte].decode('utf8').lower()
        if attr_text.endswith('.next.next'):
            return True
            
    for child in node.children:
        if detect_fast_pointer(child, code_bytes):
            return True
            
    return False

def has_loops(node):
    """Simple helper to confirm if the code iterates."""
    if node.type in ['for_statement', 'while_statement']:
        return True
    for child in node.children:
        if has_loops(child):
            return True
    return False

def analyze_linked_list(root_node, raw_code):
    """
    Distinguishes between standard Linked List Iteration and Fast/Slow Pointers.
    """
    code_bytes = bytes(raw_code, "utf8")
    
    # 1. Is this a Linked List algorithm?
    if detect_ll_attributes(root_node, code_bytes):
        
        # 2. Is it iterating over the list?
        if has_loops(root_node):
            
            # Did it use Floyd's Tortoise and Hare?
            if detect_fast_pointer(root_node, code_bytes):
                return {
                    "time_complexity": "O(n)",
                    "space_complexity": "O(1)", # Fast/Slow pointers use no extra memory
                }
            # Otherwise, it's a standard traversal (like Reverse a Linked List)
            else:
                return {
                    "time_complexity": "O(n)",
                    "space_complexity": "O(1)", # Standard pointer manipulation is O(1) space
                }
                
    return None