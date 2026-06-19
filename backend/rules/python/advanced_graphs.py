# backend/rules/python/advanced_graphs.py

def detect_advanced_graph_keywords(node, code_bytes, found_keywords):
    """
    Scans the AST for identifiers related to Weighted Graphs and Priority Queues.
    """
    if node.type in ['identifier', 'attribute']:
        text = code_bytes[node.start_byte:node.end_byte].decode('utf8').lower()
        # Clean up attributes like 'heapq.heappush' -> 'heappush'
        if '.' in text: text = text.split('.')[-1]
        
        if text in ['adj', 'graph', 'edges', 'heapq', 'heappush', 'heappop', 'pq', 'dist']:
            found_keywords.add(text)
            
    for child in node.children:
        detect_advanced_graph_keywords(child, code_bytes, found_keywords)

def analyze_advanced_graphs(root_node, raw_code):
    """
    Detects Dijkstra's and Prim's Algorithms (Graph + Heap).
    """
    code_bytes = bytes(raw_code, "utf8")
    found_keywords = set()
    
    detect_advanced_graph_keywords(root_node, code_bytes, found_keywords)
    
    graph_structs = {'adj', 'graph', 'edges'}
    heap_tools = {'heappush', 'heappop', 'heapq', 'pq'}
    
    # If the code builds a graph AND uses a priority queue
    if (found_keywords & graph_structs) and (found_keywords & heap_tools):
        return {
            "time_complexity": "O(E log V)", 
            "space_complexity": "O(V + E)", # Adjacency list and Distance array
        }
        
    return None