from rules.cpp.common import code_bytes, collect_identifiers


def analyze_dp(root_node, raw_code):
    source = code_bytes(raw_code)
    identifiers = collect_identifiers(root_node, source)
    lowered = raw_code.lower()

    has_dp_storage = bool({"dp", "memo", "cache"} & identifiers)
    has_vector_storage = "vector<" in lowered
    has_memo_check = "!=-1" in lowered.replace(" ", "") or ".count(" in lowered or ".find(" in lowered

    if has_dp_storage and (has_vector_storage or has_memo_check):
        if "vector<vector" in lowered or "dp[" in lowered and "][" in lowered:
            return {"time_complexity": "O(N * M)", "space_complexity": "O(N * M)"}

        return {"time_complexity": "O(n)", "space_complexity": "O(n)"}

    return None
