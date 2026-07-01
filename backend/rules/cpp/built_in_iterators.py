def analyze_built_in_iterators(root_node, raw_code):
    """Detects hidden linear scans in common C++ STL algorithms."""
    compact = raw_code.lower().replace(" ", "")

    linear_algorithms = {
        "accumulate(",
        "all_of(",
        "any_of(",
        "none_of(",
        "count(",
        "count_if(",
        "find(",
        "find_if(",
        "for_each(",
        "max_element(",
        "min_element(",
        "remove(",
        "remove_if(",
        "transform(",
    }

    if ".begin()" not in compact or ".end()" not in compact:
        return None

    matched = sorted(algorithm.rstrip("(") for algorithm in linear_algorithms if algorithm in compact)
    if matched:
        return {
            "time_complexity": "O(n)",
            "space_complexity": "O(1)",
            "evidence": [f"Detected STL algorithm {matched[0]} with hidden linear iteration."],
        }

    return None
