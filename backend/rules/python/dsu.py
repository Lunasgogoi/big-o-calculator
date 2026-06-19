# backend/rules/python/dsu.py

def detect_dsu_keywords(node, code_bytes, found_keywords):
    """
    Scans the AST for standard Union-Find identifiers.
    """
    if node.type in ['identifier', 'function_definition']:
        # For functions, grab the name
        if node.type == 'function_definition':
            name_node = node.child_by_field_name('name')
            if name_node:
                text = code_bytes[name_node.start_byte:name_node.end_byte].decode('utf8').lower()
                found_keywords.add(text)
        else:
            text = code_bytes[node.start_byte:node.end_byte].decode('utf8').lower()
            found_keywords.add(text)
            
    for child in node.children:
        detect_dsu_keywords(child, code_bytes, found_keywords)

def analyze_dsu(root_node, raw_code):
    """
    Detects Disjoint Set Union (Union-Find) and Kruskal's Algorithm.
    """
    code_bytes = bytes(raw_code, "utf8")
    found_keywords = set()
    
    detect_dsu_keywords(root_node, code_bytes, found_keywords)
    
    # The holy trinity of DSU
    dsu_signatures = {'parent', 'find', 'union'}
    
    # Check if we have at least 'parent' and one of the functions
    if 'parent' in found_keywords and ('find' in found_keywords or 'union' in found_keywords):
        
        # Did they sort the edges for Kruskal's MST?
        if 'sort' in found_keywords or 'sorted' in found_keywords:
            return {
                "time_complexity": "O(E log E)", # Sorting dominates the time
                "space_complexity": "O(V)",      # Parent/Rank arrays take O(V)
            }
        else:
            return {
                "time_complexity": "O(E * α(V))", # Inverse Ackermann function (Amortized O(E))
                "space_complexity": "O(V)",
            }
            
    return None