# backend/rules/python/backtracking.py

def detect_backtrack_signatures(node, code_bytes, found_keywords):
    """Scans for backtracking nomenclature and state-reversal (.pop)."""
    if node.type in ['identifier', 'function_definition']:
        text = code_bytes[node.start_byte:node.end_byte].decode('utf8').lower()
        if any(k in text for k in ['backtrack', 'permute', 'combination', 'subset', 'queen']):
            found_keywords.add('backtrack_context')

    # Look for .pop() calls (The ultimate signature of reversing state in backtracking)
    if node.type == 'call':
        func_node = node.child_by_field_name('function')
        if func_node and func_node.type == 'attribute':
            attr_node = func_node.child_by_field_name('attribute')
            if attr_node:
                method_name = code_bytes[attr_node.start_byte:attr_node.end_byte].decode('utf8')
                if method_name == 'pop':
                    found_keywords.add('state_reversal')

    for child in node.children:
        detect_backtrack_signatures(child, code_bytes, found_keywords)

def analyze_backtracking(root_node, raw_code):
    """Detects Permutations O(n!) and Subsets/Combinations O(2^n)."""
    code_bytes = bytes(raw_code, "utf8")
    found_keywords = set()

    detect_backtrack_signatures(root_node, code_bytes, found_keywords)
    
    raw_lower = raw_code.lower()

    # 1. Did we explicitly find Permutations or N-Queens?
    if 'permute' in raw_lower or 'queen' in raw_lower:
        return {"time_complexity": "O(n!)", "space_complexity": "O(n)"}

    # 2. Did we find standard Backtracking or Subsets?
    if 'backtrack_context' in found_keywords or ('state_reversal' in found_keywords and 'append' in raw_lower):
        return {"time_complexity": "O(2^n)", "space_complexity": "O(n)"}

    return None