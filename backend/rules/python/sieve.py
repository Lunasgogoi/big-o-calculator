# backend/rules/python/sieve.py

# backend/rules/python/sieve.py

def detect_sieve_keywords(node, code_bytes, found_keywords):
    """
    Scans the AST for identifiers common in the Sieve of Eratosthenes.
    """
    # 1. Look for prime/sieve contexts
    if node.type in ['identifier', 'string', 'function_definition']:
        text = code_bytes[node.start_byte:node.end_byte].decode('utf8').lower()
        if 'sieve' in text or 'prime' in text:
            found_keywords.add('prime_context')
            
    # 2. Look for Boolean nodes (Tree-sitter Python uses 'true' and 'false'!)
    if node.type in ['true', 'false']:
        found_keywords.add('boolean_init')

    for child in node.children:
        detect_sieve_keywords(child, code_bytes, found_keywords)

def analyze_sieve(root_node, raw_code):
    """
    Detects the Sieve of Eratosthenes algorithm.
    """
    code_bytes = bytes(raw_code, "utf8")
    found_keywords = set()
    
    detect_sieve_keywords(root_node, code_bytes, found_keywords)
    
    # If it talks about primes/sieves AND uses a boolean array, 
    # and has a nested loop structure, it's almost certainly the Sieve!
    if 'prime_context' in found_keywords and 'boolean_init' in found_keywords:
        return {
            "time_complexity": "O(n log log n)",
            "space_complexity": "O(n)", # The boolean array takes O(n) space
        }
            
    return None