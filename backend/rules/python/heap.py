# backend/rules/heap.py

def detect_heap_operations(node, code_bytes):
    """
    Looks for standard Python heapq operations.
    """
    if node.type in ['call', 'attribute']:
        text = code_bytes[node.start_byte:node.end_byte].decode('utf8').lower()
        if 'heappush' in text or 'heappop' in text or 'heapreplace' in text or 'heappushpop' in text:
            return True
            
    for child in node.children:
        if detect_heap_operations(child, code_bytes):
            return True
            
    return False


def detects_bounded_k_heap(raw_code):
    normalized = raw_code.lower().replace(" ", "")
    has_heap_push = "heappush(" in normalized
    has_heap_trim = "heappop(" in normalized or "heapreplace(" in normalized or "heappushpop(" in normalized
    has_k_bound = "len(heap)>k" in normalized or "len(pq)>k" in normalized or "len(h)>k" in normalized
    return has_heap_push and has_heap_trim and has_k_bound


def has_loops(node):
    """Simple helper to confirm if the code iterates."""
    if node.type in ['for_statement', 'while_statement']:
        return True
    for child in node.children:
        if has_loops(child):
            return True
    return False

def analyze_heap(root_node, raw_code):
    """
    Checks if the code utilizes Priority Queues/Heaps.
    Returns O(n log n) if in a loop, O(log n) otherwise.
    """
    code_bytes = bytes(raw_code, "utf8")
    
    # Do we have heap operations?
    if detect_heap_operations(root_node, code_bytes):
        if has_loops(root_node) and detects_bounded_k_heap(raw_code):
            return {
                "time_complexity": "O(n log k)",
                "space_complexity": "O(k)",
                "evidence": ["Detected heapq push/trim operations inside a loop bounded by k."],
            }

        # Are we pushing/popping inside a loop? (e.g., adding N elements to a heap)
        if has_loops(root_node):
            return {
                "time_complexity": "O(n log n)",
                "space_complexity": "O(n)", # Heaps require an array of size N
                "evidence": ["Detected heapq operation inside a loop, so each of n items pays heap logarithmic cost."],
            }
        # Otherwise, just a single operation or heapify
        else:
            return {
                "time_complexity": "O(log n)",
                "space_complexity": "O(1)", 
                "evidence": ["Detected a single heapq operation with logarithmic heap adjustment."],
            }
            
    return None
