# backend/rules/python/built_in_iterators.py

def detect_hidden_loops(node, code_bytes):
    """
    Hunts for hidden O(n) loops inside comprehensions and built-in functions like map/filter.
    """
    # 1. Check for Comprehensions (List, Set, Dict, Generator)
    if node.type in ['list_comprehension', 'set_comprehension', 'dictionary_comprehension', 'generator_expression']:
        return True

    # 2. Check for Built-in functions that iterate over collections
    if node.type == 'call':
        func_node = node.child_by_field_name('function')
        if func_node:
            text = code_bytes[func_node.start_byte:func_node.end_byte].decode('utf8')
            
            # These built-ins always iterate over the entire iterable (O(n) time)
            if text in ['filter', 'map', 'sum', 'any', 'all', 'max', 'min', 'reduce']:
                return True
                
    for child in node.children:
        if detect_hidden_loops(child, code_bytes):
            return True
            
    return False

def analyze_built_in_iterators(root_node, raw_code):
    """
    Detects O(n) functional programming paradigms.
    """
    code_bytes = bytes(raw_code, "utf8")
    
    if detect_hidden_loops(root_node, code_bytes):
        return {
            "time_complexity": "O(n)",
            "space_complexity": "O(n)", # Worst case: the new list contains all N elements
        }
            
    return None