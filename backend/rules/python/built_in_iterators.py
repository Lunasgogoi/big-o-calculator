# backend/rules/python/built_in_iterators.py

def _node_text(node, code_bytes):
    return code_bytes[node.start_byte:node.end_byte].decode('utf8')


def _is_iterating_builtin_call(node, func_name, code_bytes):
    if func_name in ['filter', 'map', 'sum', 'any', 'all', 'reduce']:
        return True

    if func_name not in ['max', 'min']:
        return False

    call_text = _node_text(node, code_bytes)
    argument_text = call_text[call_text.find('(') + 1:call_text.rfind(')')]

    # max(a, b) / min(a, b) are scalar comparisons, not hidden iteration.
    if ',' in argument_text and not argument_text.strip().startswith(('[', '(', '{')):
        return False

    return True


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
            text = _node_text(func_node, code_bytes)
            
            # These built-ins always iterate over the entire iterable (O(n) time)
            if _is_iterating_builtin_call(node, text, code_bytes):
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
            "evidence": ["Detected hidden iteration in comprehension or iterable built-in helper."],
        }
            
    return None
