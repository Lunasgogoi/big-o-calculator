from rules.cpp.common import code_bytes, collect_identifiers


def analyze_graph_traversal(root_node, raw_code):
    source = code_bytes(raw_code)
    identifiers = collect_identifiers(root_node, source)
    lowered = raw_code.lower()

    graph_structs = {"adj", "graph", "edges"}
    traversal_tools = {"visited", "dfs", "bfs", "queue", "deque"}
    has_stl_queue = "queue<" in lowered or "deque<" in lowered

    if (identifiers & graph_structs) and ((identifiers & traversal_tools) or has_stl_queue):
        return {
            "time_complexity": "O(V + E)",
            "space_complexity": "O(V + E)",
        }

    return None
