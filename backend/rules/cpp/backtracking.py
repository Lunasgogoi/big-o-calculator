def analyze_backtracking(root_node, raw_code):
    """Detects common C++ backtracking patterns."""
    lowered = raw_code.lower()
    compact = lowered.replace(" ", "")

    has_backtracking_name = any(
        signal in lowered
        for signal in ("backtrack", "permute", "permutation", "combination", "subset", "queen")
    )
    reverses_state = ".pop_back(" in compact or ".erase(" in compact
    mutates_state = ".push_back(" in compact or ".insert(" in compact

    if "permute" in lowered or "permutation" in lowered or "queen" in lowered:
        return {
            "time_complexity": "O(n!)",
            "space_complexity": "O(n)",
            "evidence": ["Detected permutation/N-Queens style backtracking with branching search state."],
        }

    if has_backtracking_name or (mutates_state and reverses_state):
        return {
            "time_complexity": "O(2^n)",
            "space_complexity": "O(n)",
            "evidence": ["Detected backtracking state mutation followed by state reversal."],
        }

    return None
