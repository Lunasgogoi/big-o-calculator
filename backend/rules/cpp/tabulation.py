from rules.cpp.common import LOOP_NODE_TYPES, walk


def _loop_depth(node, depth=0):
    if node.type in LOOP_NODE_TYPES:
        depth += 1

    return max([depth, *(_loop_depth(child, depth) for child in node.children)])


def analyze_tabulation(root_node, raw_code):
    """Detects bottom-up C++ DP table filling."""
    lowered = raw_code.lower()
    compact = lowered.replace(" ", "")

    has_dp_storage = any(signal in lowered for signal in (" dp", "dp[", "memo", "cache"))
    has_vector_storage = "vector<" in lowered
    fills_dp_table = "dp[" in compact and _loop_depth(root_node) >= 1

    if has_dp_storage and has_vector_storage and fills_dp_table:
        if "vector<vector" in lowered or "dp[" in compact and "][" in compact:
            return {
                "time_complexity": "O(N * M)",
                "space_complexity": "O(N * M)",
                "evidence": ["Detected nested bottom-up DP table fill over 2D storage."],
            }

        return {
            "time_complexity": "O(n)",
            "space_complexity": "O(n)",
            "evidence": ["Detected bottom-up DP array fill using preallocated vector storage."],
        }

    return None
