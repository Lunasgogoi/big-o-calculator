# backend/rules/python/floyd_warshall.py

def analyze_floyd_warshall(root_node, raw_code):
    """Detects Floyd-Warshall O(V^3) time and dynamically determines Space."""
    raw_lower = raw_code.lower()
    compressed = raw_lower.replace(" ", "")

    # Signature 1: The explicit algorithm name
    is_named = 'floyd' in raw_lower and 'warshall' in raw_lower

    # Signature 2: The classic 2D relaxation math
    has_ik_kj_math = "[i][k]+" in compressed or "+[k][j]" in compressed
    has_2d_matrix_target = "[i][j]" in compressed
    has_comparison = "min(" in compressed or "<" in compressed

    if (has_ik_kj_math and has_2d_matrix_target and has_comparison) or is_named:
        
        # 🚨 THE SPACE COMPLEXITY HEURISTIC
        # Check if the code allocates a new 2D matrix (Auxiliary Space)
        # We look for Python 2D array initializations or deep copies
        allocates_memory = (
            "[[0]*" in compressed or 
            "[[float" in compressed or 
            "deepcopy(" in compressed or
            ("[[" in compressed and "for" in raw_lower)
        )

        if allocates_memory:
            return {"time_complexity": "O(V^3)", "space_complexity": "O(V^2)"}
        else:
            # If no new matrix is created, it's modifying in-place!
            return {"time_complexity": "O(V^3)", "space_complexity": "O(1)"}

    return None

