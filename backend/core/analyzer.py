from collections.abc import Callable
from typing import Optional

import rules.cpp.graph_traversal as cpp_graph
import rules.python.graph_traversal as py_graph
from core.models import COMPLEXITY_RANKS, RuleMatch, StaticAnalysisResult, rule_match_from_legacy
from rules.cpp.backtracking import analyze_backtracking as analyze_cpp_backtracking
from rules.cpp.base_loops import analyze_base_loops as analyze_cpp_base_loops
from rules.cpp.bellman_ford import analyze_bellman_ford as analyze_cpp_bellman_ford
from rules.cpp.bit_manipulation import analyze_bit_manipulation as analyze_cpp_bit_manipulation
from rules.cpp.binary_trees import analyze_binary_tree as analyze_cpp_binary_tree
from rules.cpp.built_in_iterators import analyze_built_in_iterators as analyze_cpp_built_in_iterators
from rules.cpp.built_in_sort import analyze_sort_search as analyze_cpp_sort_search
from rules.cpp.dsu import analyze_dsu as analyze_cpp_dsu
from rules.cpp.dynamic_programming import analyze_dp as analyze_cpp_dp
from rules.cpp.floyd_warshall import analyze_floyd_warshall as analyze_cpp_floyd_warshall
from rules.cpp.heap import analyze_heap as analyze_cpp_heap
from rules.cpp.logarithmic import analyze_logarithmic as analyze_cpp_logarithmic
from rules.cpp.matrix import analyze_matrix as analyze_cpp_matrix
from rules.cpp.monotonic_stack import analyze_monotonic_stack as analyze_cpp_monotonic_stack
from rules.cpp.recursion import analyze_recursion as analyze_cpp_recursion
from rules.cpp.sieve import analyze_sieve as analyze_cpp_sieve
from rules.cpp.sliding_window import analyze_sliding_window as analyze_cpp_sliding_window
from rules.cpp.sorting_search import analyze_sorting_search as analyze_cpp_sorting_search
from rules.cpp.space_complexity import analyze_space_complexity as analyze_cpp_space_complexity
from rules.cpp.tabulation import analyze_tabulation as analyze_cpp_tabulation
from rules.python.advanced_graphs import analyze_advanced_graphs
from rules.python.backtracking import analyze_backtracking
from rules.python.base_loops import analyze_base_loops
from rules.python.bellman_ford import analyze_bellman_ford
from rules.python.bit_manipulation import analyze_bit_manipulation
from rules.python.binary_trees import analyze_binary_tree
from rules.python.built_in_iterators import analyze_built_in_iterators
from rules.python.built_in_sort import analyze_sort_search
from rules.python.dsu import analyze_dsu
from rules.python.dynamic_programming import analyze_dp
from rules.python.floyd_warshall import analyze_floyd_warshall
from rules.python.heap import analyze_heap
from rules.python.linked_list import analyze_linked_list
from rules.python.logarithmic import analyze_logarithmic as py_logarithmic
from rules.python.math_loops import analyze_math_loops
from rules.python.matrix import analyze_matrix
from rules.python.monotonic_stack import analyze_monotonic_stack
from rules.python.morris_traversal import analyze_morris_traversal
from rules.python.recursion import analyze_recursion
from rules.python.sieve import analyze_sieve
from rules.python.sliding_window import analyze_sliding_window
from rules.python.sorting_search import analyze_sorting_search
from rules.python.space_complexity import analyze_space_complexity
from rules.python.tabulation import analyze_tabulation


RuleFunction = Callable[[object, str], Optional[dict]]


PYTHON_RULES: list[tuple[str, RuleFunction, float, list[str]]] = [
    ("floyd_warshall", analyze_floyd_warshall, 0.94, ["Detected Floyd-Warshall all-pairs shortest-path signals."]),
    ("bellman_ford", analyze_bellman_ford, 0.92, ["Detected Bellman-Ford edge-relaxation signals."]),
    ("advanced_graphs", analyze_advanced_graphs, 0.92, ["Detected advanced graph algorithm signals."]),
    ("dsu", analyze_dsu, 0.92, ["Detected disjoint-set / union-find signals."]),
    ("graph_traversal", py_graph.analyze_graph_traversal, 0.9, ["Detected graph traversal signals."]),
    ("morris_traversal", analyze_morris_traversal, 0.92, ["Detected Morris traversal pointer-threading signals."]),
    ("sorting_search", analyze_sorting_search, 0.94, ["Detected binary-search style halving control flow."]),
    ("built_in_sort", analyze_sort_search, 0.86, ["Detected built-in sorting call."]),
    ("linked_list", analyze_linked_list, 0.86, ["Detected linked-list pointer traversal signals."]),
    ("binary_tree", analyze_binary_tree, 0.86, ["Detected binary tree traversal/search signals."]),
    ("dynamic_programming", analyze_dp, 0.9, ["Detected memoization / dynamic-programming signals."]),
    ("tabulation", analyze_tabulation, 0.86, ["Detected tabulation / preallocated DP storage."]),
    ("backtracking", analyze_backtracking, 0.86, ["Detected recursive backtracking signals."]),
    ("recursion", analyze_recursion, 0.78, ["Detected recursive call structure."]),
    ("sliding_window", analyze_sliding_window, 0.92, ["Detected amortized sliding-window pointer movement."]),
    ("monotonic_stack", analyze_monotonic_stack, 0.92, ["Detected amortized monotonic-stack push/pop structure."]),
    ("matrix", analyze_matrix, 0.84, ["Detected matrix traversal / allocation signals."]),
    ("heap", analyze_heap, 0.84, ["Detected heap operation signals."]),
    ("bit_manipulation", analyze_bit_manipulation, 0.84, ["Detected bit-manipulation loop signals."]),
    ("logarithmic", py_logarithmic, 0.9, ["Detected halving / logarithmic progress."]),
    ("built_in_iterators", analyze_built_in_iterators, 0.78, ["Detected hidden iteration in built-in iterator helpers."]),
    ("sieve", analyze_sieve, 0.92, ["Detected sieve-style marking loop."]),
    ("math_loops", analyze_math_loops, 0.86, ["Detected math-bounded loop progression."]),
]


CPP_RULES: list[tuple[str, RuleFunction, float, list[str]]] = [
    ("floyd_warshall", analyze_cpp_floyd_warshall, 0.9, ["Detected C++ Floyd-Warshall all-pairs shortest-path signals."]),
    ("bellman_ford", analyze_cpp_bellman_ford, 0.88, ["Detected C++ Bellman-Ford edge-relaxation signals."]),
    ("dsu", analyze_cpp_dsu, 0.88, ["Detected C++ disjoint-set / union-find signals."]),
    ("sieve", analyze_cpp_sieve, 0.9, ["Detected C++ sieve-style marking loop."]),
    ("graph_traversal", cpp_graph.analyze_graph_traversal, 0.86, ["Detected C++ graph traversal signals."]),
    ("binary_tree", analyze_cpp_binary_tree, 0.86, ["Detected C++ binary tree traversal/search signals."]),
    ("sorting_search", analyze_cpp_sorting_search, 0.9, ["Detected C++ binary-search style halving control flow or STL binary search."]),
    ("built_in_sort", analyze_cpp_sort_search, 0.86, ["Detected C++ STL sorting call."]),
    ("tabulation", analyze_cpp_tabulation, 0.84, ["Detected C++ bottom-up dynamic-programming table fill."]),
    ("dynamic_programming", analyze_cpp_dp, 0.78, ["Detected C++ dynamic-programming storage or memoization signals."]),
    ("backtracking", analyze_cpp_backtracking, 0.84, ["Detected C++ recursive backtracking signals."]),
    ("sliding_window", analyze_cpp_sliding_window, 0.86, ["Detected C++ amortized sliding-window pointer movement."]),
    ("monotonic_stack", analyze_cpp_monotonic_stack, 0.86, ["Detected C++ monotonic-stack push/pop structure."]),
    ("matrix", analyze_cpp_matrix, 0.8, ["Detected C++ matrix traversal / allocation signals."]),
    ("heap", analyze_cpp_heap, 0.82, ["Detected C++ heap / priority-queue operation signals."]),
    ("bit_manipulation", analyze_cpp_bit_manipulation, 0.82, ["Detected C++ bit-manipulation loop signals."]),
    ("logarithmic", analyze_cpp_logarithmic, 0.84, ["Detected C++ logarithmic loop progression."]),
    ("built_in_iterators", analyze_cpp_built_in_iterators, 0.76, ["Detected C++ hidden iteration in STL algorithm helper."]),
    ("recursion", analyze_cpp_recursion, 0.74, ["Detected C++ recursive call structure."]),
]


ADVANCED_COMPLEXITIES = {
    "O(V + E)",
    "O(E log V)",
    "O(E log E)",
    "O(E * alpha(V))",
    "O(V * E)",
    "O(V^3)",
    "O(n log log n)",
}

SUB_LINEAR_COMPLEXITIES = {"O(log n)", "O(log N)", "O((log n)^2)", "O(sqrt(n))", "O(sqrt(N))"}
AMORTIZED_LINEAR_COMPLEXITIES = {"O(n)", "O(N)"}
QUADRATIC_COMPLEXITIES = {"O(n^2)", "O(N^2)"}


def analyze_static_complexity(root_node: object, raw_code: str, language: str) -> StaticAnalysisResult:
    language_key = language.lower()
    if language_key in {"cpp", "c++"}:
        matches = _collect_cpp_matches(root_node, raw_code)
        dominant = _get_dominant_match(matches)
        calculated_space = analyze_cpp_space_complexity(root_node, raw_code, dominant.space_complexity)

        return StaticAnalysisResult(
            time_complexity=dominant.time_complexity,
            space_complexity=calculated_space,
            dominant_rule=dominant.rule_name,
            confidence=dominant.confidence,
            evidence=dominant.evidence,
            matches=matches,
        )

    matches = _collect_python_matches(root_node, raw_code)
    dominant = _get_dominant_match(matches)
    calculated_space = analyze_space_complexity(root_node, raw_code, dominant.space_complexity)

    return StaticAnalysisResult(
        time_complexity=dominant.time_complexity,
        space_complexity=calculated_space,
        dominant_rule=dominant.rule_name,
        confidence=dominant.confidence,
        evidence=dominant.evidence,
        matches=matches,
    )


def _collect_python_matches(root_node: object, raw_code: str) -> list[RuleMatch]:
    smart_matches = _run_smart_rules(root_node, raw_code)
    base_match = rule_match_from_legacy(
        "base_loops",
        analyze_base_loops(root_node),
        confidence=0.55,
        evidence=["Estimated complexity from maximum loop nesting depth."],
        is_base_rule=True,
    )

    matches = list(smart_matches)
    if any(match.rule_name == "dynamic_programming" for match in matches):
        matches = [match for match in matches if match.rule_name not in {"recursion", "backtracking"}]

    if base_match and _should_include_base_loop(base_match, smart_matches):
        matches.append(base_match)

    if any(match.time_complexity == "O(n log log n)" for match in matches):
        matches = [match for match in matches if match.time_complexity not in QUADRATIC_COMPLEXITIES]

    return matches


def _collect_cpp_matches(root_node: object, raw_code: str) -> list[RuleMatch]:
    smart_matches = _run_rules(CPP_RULES, root_node, raw_code)
    base_match = rule_match_from_legacy(
        "base_loops",
        analyze_cpp_base_loops(root_node),
        confidence=0.55,
        evidence=["Estimated C++ complexity from maximum loop nesting depth."],
        is_base_rule=True,
    )

    matches = list(smart_matches)
    if base_match and _should_include_base_loop(base_match, smart_matches):
        matches.append(base_match)

    return matches


def _run_smart_rules(root_node: object, raw_code: str) -> list[RuleMatch]:
    return _run_rules(PYTHON_RULES, root_node, raw_code)


def _run_rules(
    rules: list[tuple[str, RuleFunction, float, list[str]]],
    root_node: object,
    raw_code: str,
) -> list[RuleMatch]:
    matches: list[RuleMatch] = []
    for rule_name, rule_fn, confidence, evidence in rules:
        match = rule_match_from_legacy(
            rule_name,
            rule_fn(root_node, raw_code),
            confidence=confidence,
            evidence=evidence,
        )
        if match:
            matches.append(match)
    return matches


def _should_include_base_loop(base_match: RuleMatch, smart_matches: list[RuleMatch]) -> bool:
    if not smart_matches:
        return True

    smart_complexities = {match.time_complexity for match in smart_matches}
    if smart_complexities & ADVANCED_COMPLEXITIES:
        return False

    if smart_complexities & SUB_LINEAR_COMPLEXITIES and base_match.time_complexity in {"O(n)", "O(N)"}:
        return False

    if "O((log n)^2)" in smart_complexities and base_match.time_complexity in QUADRATIC_COMPLEXITIES:
        return False

    if smart_complexities & AMORTIZED_LINEAR_COMPLEXITIES and base_match.time_complexity in QUADRATIC_COMPLEXITIES:
        return False

    return True


def _get_dominant_match(matches: list[RuleMatch]) -> RuleMatch:
    valid_matches = [match for match in matches if match.time_complexity in COMPLEXITY_RANKS]
    if not valid_matches:
        return RuleMatch(
            rule_name="constant_fallback",
            time_complexity="O(1)",
            space_complexity="O(1)",
            confidence=0.4,
            evidence=["No recognized complexity-producing structures were detected."],
        )

    return max(
        valid_matches,
        key=lambda match: (COMPLEXITY_RANKS[match.time_complexity], match.confidence),
    )
