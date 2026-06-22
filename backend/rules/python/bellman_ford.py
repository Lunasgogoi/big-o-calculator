# backend/rules/python/bellman_ford.py

def analyze_bellman_ford(root_node, raw_code):
    """Detects the Bellman-Ford algorithm O(V * E)."""
    raw_lower = raw_code.lower()
    
    # Compress the code to remove spaces, making mathematical pattern matching flawless
    compressed = raw_lower.replace(" ", "")

    # Signature 1: The explicit algorithm name
    if 'bellman' in raw_lower:
        return {"time_complexity": "O(V * E)", "space_complexity": "O(V)"}

    # Signature 2: The Relaxation Math + The V-1 Loop
    # We look for dist[x] + w < dist[y]
    is_relaxing = ("dist[" in compressed or "distance[" in compressed) and ("+w" in compressed or "+weight" in compressed) and "<" in compressed
    
    # We look for the classic outer loop: for _ in range(V - 1)
    has_v_minus_1_loop = "range(v-1)" in compressed or "range(n-1)" in compressed

    if is_relaxing and has_v_minus_1_loop:
        return {"time_complexity": "O(V * E)", "space_complexity": "O(V)"}

    return None