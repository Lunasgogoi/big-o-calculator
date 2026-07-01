from dataclasses import dataclass, field
from typing import Optional


COMPLEXITY_RANKS = {
    "O(1)": 1,
    "O(log n)": 2,
    "O(log N)": 2,
    "O((log n)^2)": 2.5,
    "O(sqrt(n))": 3,
    "O(sqrt(N))": 3,
    "O(n)": 4,
    "O(N)": 4,
    "O(V + E)": 4,
    "O(E * alpha(V))": 4,
    "O(n log log n)": 4.5,
    "O(n log k)": 4.7,
    "O(n log n)": 5,
    "O(N log N)": 5,
    "O(n^2)": 6,
    "O(N^2)": 6,
    "O(N * M)": 6,
    "O(V * E)": 6.5,
    "O(E log V)": 6.5,
    "O(E log E)": 6.5,
    "O(n^3)": 7,
    "O(N^3)": 7,
    "O(V^3)": 7,
    "O(2^n)": 8,
    "O(n!)": 9,
    "O(N!)": 9,
}


@dataclass(frozen=True)
class RuleMatch:
    rule_name: str
    time_complexity: str
    space_complexity: str
    confidence: float
    evidence: list[str] = field(default_factory=list)
    is_base_rule: bool = False

    @property
    def confidence_label(self) -> str:
        return get_confidence_label(self.confidence)

    def to_api_dict(self) -> dict:
        return {
            "rule_name": self.rule_name,
            "time_complexity": self.time_complexity,
            "space_complexity": self.space_complexity,
            "confidence": round(self.confidence, 2),
            "confidence_label": self.confidence_label,
            "evidence": self.evidence,
        }


@dataclass(frozen=True)
class StaticAnalysisResult:
    time_complexity: str
    space_complexity: str
    dominant_rule: str
    confidence: float
    evidence: list[str]
    matches: list[RuleMatch]

    @property
    def confidence_label(self) -> str:
        return get_confidence_label(self.confidence)

    def matched_rules_for_api(self) -> list[dict]:
        return [match.to_api_dict() for match in self.matches]


def get_confidence_label(confidence: float) -> str:
    if confidence >= 0.85:
        return "high"
    if confidence >= 0.6:
        return "medium"
    return "low"


def rule_match_from_legacy(
    rule_name: str,
    result: Optional[dict],
    confidence: float,
    evidence: Optional[list[str]] = None,
    is_base_rule: bool = False,
) -> Optional[RuleMatch]:
    if not result:
        return None

    time_complexity = result.get("time_complexity")
    space_complexity = result.get("space_complexity")
    if not time_complexity or not space_complexity:
        return None

    rule_evidence = result.get("evidence")
    if isinstance(rule_evidence, str):
        normalized_evidence = [rule_evidence]
    elif isinstance(rule_evidence, list) and all(isinstance(item, str) for item in rule_evidence):
        normalized_evidence = rule_evidence
    else:
        normalized_evidence = evidence

    return RuleMatch(
        rule_name=rule_name,
        time_complexity=time_complexity,
        space_complexity=space_complexity,
        confidence=confidence,
        evidence=normalized_evidence or [f"{rule_name} matched {time_complexity} time and {space_complexity} space."],
        is_base_rule=is_base_rule,
    )
