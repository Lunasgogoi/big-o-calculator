def analyze_sieve(root_node, raw_code):
    """Detects Sieve of Eratosthenes style prime marking in C++."""
    lowered = raw_code.lower()
    compact = lowered.replace(" ", "")

    has_prime_storage = any(signal in lowered for signal in ("is_prime", "prime", "sieve"))
    has_boolean_vector = "vector<bool>" in compact or "vector<int>" in compact or "vector<char>" in compact
    has_sqrt_bound = "*i<=n" in compact or "i*i<=n" in compact or "sqrt(" in compact
    has_multiple_marking = "j+=i" in compact or "j=j+i" in compact

    if has_prime_storage and has_boolean_vector and has_sqrt_bound and has_multiple_marking:
        return {
            "time_complexity": "O(n log log n)",
            "space_complexity": "O(n)",
            "evidence": ["Detected sieve-style prime table and multiple-marking loop."],
        }

    return None
