import json
import os

from dotenv import load_dotenv
from google import genai
from pydantic import BaseModel

load_dotenv()

AI_DISABLED_MESSAGE = "AI suggestions are disabled. Please add a GEMINI_API_KEY to your .env file."
AI_FALLBACK_EXPLANATION = (
    "AI explanation unavailable; static analysis shown.\n\n"
    "The static analyzer result is still returned with confidence metadata and matched-rule evidence."
)
DEFAULT_MODEL = "gemini-2.5-flash-lite"

api_key = os.getenv("GEMINI_API_KEY")
client = genai.Client(api_key=api_key) if api_key else None


class AIAnalysis(BaseModel):
    time_complexity: str
    space_complexity: str
    explanation: str


def build_analysis_prompt(code: str, static_analysis) -> str:
    return f"""
    You are an expert algorithm analyzer.
    Code to analyze:
    {code}

    The static AST engine estimated -> Time: {static_analysis.time_complexity}, Space: {static_analysis.space_complexity}
    Static confidence: {static_analysis.confidence_label} ({static_analysis.confidence:.2f})
    Static rule used: {static_analysis.dominant_rule}
    Static evidence: {'; '.join(static_analysis.evidence)}

    Verify this estimate. If confidence is limited or the code is ambiguous, say so.
    If the estimate is likely wrong, correct it.

    CRITICAL RULES:
    1. AUXILIARY SPACE ONLY: For Space Complexity, calculate auxiliary space only.
       Ignore input storage such as an existing array, matrix, graph, or adjacency list.

    CRITICAL FORMATTING RULE FOR THE EXPLANATION:
    You MUST divide your 'explanation' string into exactly two sections separated by a double newline (\\n\\n).
    Format it exactly like this:

    Time Complexity: [Explain how the time complexity was derived]

    Space Complexity: [Explain how the auxiliary space complexity was derived]

    If you overrode the static engine's guess, mention why in the relevant section.
    """


def get_ai_suggestion(code: str, static_analysis) -> dict:
    if client is None:
        return {
            "time_complexity": static_analysis.time_complexity,
            "space_complexity": static_analysis.space_complexity,
            "explanation": AI_DISABLED_MESSAGE,
        }

    response = client.models.generate_content(
        model=os.getenv("GEMINI_MODEL", DEFAULT_MODEL),
        contents=build_analysis_prompt(code, static_analysis),
        config={
            "response_mime_type": "application/json",
            "response_schema": AIAnalysis,
        },
    )
    return json.loads(response.text)
