def analyze_floyd_warshall(root_node, raw_code):
    """Detects Floyd-Warshall all-pairs shortest path in C++."""
    raw_lower = raw_code.lower()
    compressed = raw_lower.replace(" ", "")

    is_named = "floyd" in raw_lower and "warshall" in raw_lower
    has_ik_kj_math = "[i][k]+" in compressed or "+dist[k][j]" in compressed or "+graph[k][j]" in compressed
    has_2d_target = "[i][j]" in compressed
    has_comparison = "min(" in compressed or "<" in compressed

    if (has_ik_kj_math and has_2d_target and has_comparison) or is_named:
        allocates_memory = (
            ">>dist=" in compressed
            or "autodist=" in compressed
            or "vector<vector" in compressed and "dist(" in compressed
        )

        if allocates_memory:
            return {
                "time_complexity": "O(V^3)",
                "space_complexity": "O(V^2)",
                "evidence": ["Detected nested k/i/j matrix relaxation with copied 2D distance storage."],
            }

        return {
            "time_complexity": "O(V^3)",
            "space_complexity": "O(1)",
            "evidence": ["Detected nested k/i/j matrix relaxation updating the matrix in place."],
        }

    return None
