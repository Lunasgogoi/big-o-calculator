from rules.cpp.common import code_bytes, has_loop


def _has_bounded_k_heap(lowered: str) -> bool:
    normalized = lowered.replace(" ", "")
    has_push = ".push(" in normalized
    has_trim = ".pop(" in normalized
    has_k_bound = ".size()>k" in normalized
    return has_push and has_trim and has_k_bound


def analyze_heap(root_node, raw_code):
    lowered = code_bytes(raw_code).decode("utf8").lower()
    has_heap_signal = (
        "priority_queue" in lowered
        or "make_heap(" in lowered
        or "push_heap(" in lowered
        or "pop_heap(" in lowered
    )

    if not has_heap_signal:
        return None

    if has_loop(root_node):
        if _has_bounded_k_heap(lowered):
            return {
                "time_complexity": "O(n log k)",
                "space_complexity": "O(k)",
            }

        return {
            "time_complexity": "O(n log n)",
            "space_complexity": "O(n)",
        }

    return {
        "time_complexity": "O(log n)",
        "space_complexity": "O(1)",
    }
