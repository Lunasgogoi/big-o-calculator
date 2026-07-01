# backend/rules/python/recursion.py

def walk(node):
    yield node
    for child in node.children:
        yield from walk(child)


def node_text(node, code_bytes):
    return code_bytes[node.start_byte:node.end_byte].decode('utf8')


def count_recursive_calls(node, func_name, code_bytes):
    """Recursively scans the AST to count how many times a function calls itself."""
    count = 0
    if node.type == 'call':
        func_node = node.child_by_field_name('function')
        if func_node:
            call_name = node_text(func_node, code_bytes)
            if call_name == func_name:
                count += 1
                
    for child in node.children:
        count += count_recursive_calls(child, func_name, code_bytes)
        
    return count


def has_tree_child_access(node, code_bytes):
    """Detects recursive tree traversal patterns such as node.left / node.right."""
    if node.type == 'attribute':
        attr_text = node_text(node, code_bytes).lower()
        if attr_text.endswith('.left') or attr_text.endswith('.right'):
            return True

    for child in node.children:
        if has_tree_child_access(child, code_bytes):
            return True

    return False


def analyze_recursion(root_node, raw_code):
    """Distinguishes between Linear O(n), Branching O(2^n), and Divide & Conquer O(n log n)."""
    code_bytes = bytes(raw_code, "utf8")
    
    for node in walk(root_node):
        if node.type == 'function_definition':
            name_node = node.child_by_field_name('name')
            if not name_node: continue
            
            func_name = node_text(name_node, code_bytes)
            body_node = node.child_by_field_name('body')
            if not body_node: continue
            
            calls = count_recursive_calls(body_node, func_name, code_bytes)

            if calls > 0 and has_tree_child_access(body_node, code_bytes):
                return {
                    "time_complexity": "O(n)",
                    "space_complexity": "O(h)",
                    "evidence": ["Detected recursive traversal over left/right tree child attributes."],
                }
            
            if calls == 1:
                return {
                    "time_complexity": "O(n)",
                    "space_complexity": "O(n)",
                    "evidence": ["Detected one self-recursive call per activation."],
                }
                
            elif calls > 1:
                # 🚨 DIVIDE & CONQUER INTERCEPTOR 🚨
                # Extract the raw text of the function body to look for halving math
                body_text = node_text(body_node, code_bytes).lower().replace(" ", "")
                
                if "//2" in body_text or "/2" in body_text or ">>1" in body_text or "mid=" in body_text or "[:" in body_text:
                    return {
                        "time_complexity": "O(n log n)",
                        "space_complexity": "O(n)", # Merge sort requires O(n) array allocations
                        "evidence": ["Detected multiple recursive calls with halving/divide-and-conquer signals."],
                    }
                    
                # If no halving math is found, it's standard Branching Recursion
                return {
                    "time_complexity": "O(2^n)",
                    "space_complexity": "O(n)", 
                    "evidence": ["Detected recursive branching call pattern without halving progress."],
                }
                
    return None
