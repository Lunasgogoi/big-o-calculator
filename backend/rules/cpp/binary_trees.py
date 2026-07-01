def analyze_binary_tree(root_node, raw_code):
    """Detects C++ binary tree traversal and balanced BST search patterns."""
    lowered = raw_code.lower()

    has_tree_child_access = (
        "->left" in lowered
        or "->right" in lowered
        or ".left" in lowered
        or ".right" in lowered
    )
    if not has_tree_child_access:
        return None

    has_bfs_frontier = (
        "queue<" in lowered
        or "deque<" in lowered
        or ".front(" in lowered
        or ".push(" in lowered
    ) and ("while" in lowered or "for" in lowered)
    has_bst_branch = (
        ("target" in lowered or "key" in lowered)
        and ("<" in lowered or ">" in lowered)
        and ("->val" in lowered or ".val" in lowered or "->data" in lowered or ".data" in lowered)
        and not has_bfs_frontier
    )

    if has_bst_branch:
        return {
            "time_complexity": "O(log n)",
            "space_complexity": "O(h)",
            "evidence": ["Detected binary-search-tree branch using node value comparisons."],
        }

    if has_bfs_frontier:
        return {
            "time_complexity": "O(n)",
            "space_complexity": "O(n)",
            "evidence": ["Detected binary tree breadth-first traversal with queue/deque frontier."],
        }

    return {
        "time_complexity": "O(n)",
        "space_complexity": "O(h)",
        "evidence": ["Detected binary tree child access through left/right pointers."],
    }
