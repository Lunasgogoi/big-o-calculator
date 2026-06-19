# backend/rules/python/graph_traversal.py

def detect_graph_keywords(node, code_bytes, found_keywords):
    """
    Scans the AST explicitly for variable/function names (identifiers) related to graphs.
    """
    # Only look at actual variable and function names (ignores comments/strings)
    if node.type == 'identifier':
        text = code_bytes[node.start_byte:node.end_byte].decode('utf8').lower()
        if text in ['adj', 'graph', 'edges', 'visited', 'dfs', 'bfs', 'deque']:
            found_keywords.add(text)
            
    for child in node.children:
        detect_graph_keywords(child, code_bytes, found_keywords)

def analyze_graph_traversal(root_node, raw_code):
    """
    Detects if the code is a Graph algorithm by looking for a combination 
    of structural and traversal keywords.
    """
    code_bytes = bytes(raw_code, "utf8")
    found_keywords = set()
    
    # 1. Gather all identifiers in the code
    detect_graph_keywords(root_node, code_bytes, found_keywords)
    
    # 2. Define our mandatory categories
    graph_structs = {'adj', 'graph', 'edges'}
    traversal_tools = {'visited', 'dfs', 'bfs', 'deque'}
    
    # 3. If the code builds a graph AND traverses it, intercept it!
    if (found_keywords & graph_structs) and (found_keywords & traversal_tools):
        return {
            "time_complexity": "O(V + E)",
            "space_complexity": "O(V + E)", # Adjacency list and Visited array
        }
        
    return None