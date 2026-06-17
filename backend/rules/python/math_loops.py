# backend/rules/python/math_loops.py
import re

def detect_math_complexities(node, code_bytes):
    """
    Hunts for O(sqrt(n)) and O(log n) math-based loops.
    """
    if node.type in ['while_statement', 'for_statement']:
        # Extract the exact text of the loop condition/header
        loop_text = code_bytes[node.start_byte:node.end_byte].decode('utf8').replace(" ", "")
        
        # 1. Check for O(sqrt(n)) signatures
        # e.g., i*i<=n, math.sqrt(n), n**0.5
        if "**0.5" in loop_text or "math.sqrt" in loop_text or re.search(r'\w+\*\w+<=', loop_text):
            return "O(sqrt(n))"
            
        # 2. Check for O(log n) signatures
        # e.g., n = n // 2 (Binary Search math), n = n // 10 (Digit extraction)
        if "//2" in loop_text or "/2" in loop_text or ">>1" in loop_text or "//10" in loop_text:
            return "O(log n)"

    for child in node.children:
        result = detect_math_complexities(child, code_bytes)
        if result: 
            return result
            
    return None

def analyze_math_loops(root_node, raw_code):
    """
    Detects mathematical algorithmic boundaries.
    """
    code_bytes = bytes(raw_code, "utf8")
    
    complexity = detect_math_complexities(root_node, code_bytes)
    
    if complexity:
        return {
            "time_complexity": complexity,
            "space_complexity": "O(1)", # Math loops rarely allocate new arrays
        }
            
    return None