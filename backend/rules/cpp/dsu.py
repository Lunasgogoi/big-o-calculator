from rules.cpp.common import code_bytes, collect_identifiers


def analyze_dsu(root_node, raw_code):
    source = code_bytes(raw_code)
    identifiers = collect_identifiers(root_node, source)
    lowered = raw_code.lower()

    has_parent = "parent" in identifiers
    has_find = "find" in identifiers or "findparent" in identifiers or "findset" in identifiers
    has_union = "union" in identifiers or "unite" in identifiers or "union_sets" in identifiers

    if not (has_parent and (has_find or has_union)):
        return None

    if "sort(" in lowered or "stable_sort(" in lowered:
        return {
            "time_complexity": "O(E log E)",
            "space_complexity": "O(V)",
        }

    return {
        "time_complexity": "O(E * alpha(V))",
        "space_complexity": "O(V)",
    }
