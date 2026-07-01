def analyze_bellman_ford(root_node, raw_code):
    """Detects Bellman-Ford style edge relaxation in C++."""
    raw_lower = raw_code.lower()
    compressed = raw_lower.replace(" ", "")

    if "bellman" in raw_lower:
        return {
            "time_complexity": "O(V * E)",
            "space_complexity": "O(V)",
            "evidence": ["Detected Bellman-Ford by name."],
        }

    is_relaxing = (
        ("dist[" in compressed or "distance[" in compressed)
        and ("+weight" in compressed or "+w" in compressed)
        and "<" in compressed
    )
    has_vertex_minus_one_loop = (
        "-1;" in compressed
        or "-1)" in compressed
        or "<v-1" in compressed
        or "<n-1" in compressed
        or "<vertices-1" in compressed
    )
    has_edge_iteration = (
        "edges" in compressed
        or "edge:" in compressed
        or "edge&" in compressed
        or "tuple" in compressed
    )

    if is_relaxing and has_vertex_minus_one_loop and has_edge_iteration:
        return {
            "time_complexity": "O(V * E)",
            "space_complexity": "O(V)",
            "evidence": ["Detected distance edge relaxation inside a V - 1 outer loop over edges."],
        }

    return None
