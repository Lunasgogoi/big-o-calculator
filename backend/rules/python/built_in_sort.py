# backend/rules/python/sorting_search.py

def detect_sorting_calls(node, code_bytes):
    """
    Hunts specifically for Python's built-in Timsort functions: .sort() and sorted()
    """
    if node.type == 'call':
        func_node = node.child_by_field_name('function')
        if func_node:
            text = code_bytes[func_node.start_byte:func_node.end_byte].decode('utf8')
            
            # Check for sorted(arr) or arr.sort()
            if text == 'sorted' or text.endswith('.sort'):
                return True
                
    for child in node.children:
        if detect_sorting_calls(child, code_bytes):
            return True
            
    return False

def analyze_sort_search(root_node, raw_code):
    """
    Detects built-in O(n log n) sorting operations.
    """
    code_bytes = bytes(raw_code, "utf8")
    
    if detect_sorting_calls(root_node, code_bytes):
        return {
            "time_complexity": "O(n log n)",
            # Timsort in Python requires O(n) space in the worst case to maintain runs!
            "space_complexity": "O(n)", 
        }
            
    return None