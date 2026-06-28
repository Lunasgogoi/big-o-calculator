import json
import os
import traceback

from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from google import genai
from pydantic import BaseModel

from core import parser as code_parser
from core.analyzer import analyze_static_complexity


load_dotenv()
api_key = os.getenv("GEMINI_API_KEY")
client = genai.Client(api_key=api_key) if api_key else None

app = FastAPI(title="Big O Analyzer API")
MAX_CODE_LENGTH = 1500


def get_allowed_origins() -> list[str]:
    origins = os.getenv("ALLOWED_ORIGINS", "*")
    return [origin.strip() for origin in origins.split(",") if origin.strip()]


app.add_middleware(
    CORSMiddleware,
    allow_origins=get_allowed_origins(),
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)


class CodeSubmission(BaseModel):
    code: str
    language: str = "python"


class AIAnalysis(BaseModel):
    time_complexity: str
    space_complexity: str
    explanation: str


def build_static_payload(static_analysis):
    return {
        "analysis_steps": static_analysis.evidence,
        "confidence": round(static_analysis.confidence, 2),
        "confidence_label": static_analysis.confidence_label,
        "dominant_rule": static_analysis.dominant_rule,
        "matched_rules": static_analysis.matched_rules_for_api(),
    }


@app.post("/api/analyze")
async def analyze_code(submission: CodeSubmission):
    if not submission.code.strip():
        raise HTTPException(status_code=400, detail="No code provided")

    if len(submission.code) > MAX_CODE_LENGTH:
        raise HTTPException(status_code=400, detail=f"Code must be {MAX_CODE_LENGTH} characters or fewer")

    try:
        root_node = code_parser.parse_code(submission.code, submission.language)
        static_analysis = analyze_static_complexity(root_node, submission.code, submission.language)

        static_time = static_analysis.time_complexity
        static_space = static_analysis.space_complexity
        static_payload = build_static_payload(static_analysis)

        if not client:
            return {
                "status": "success",
                "time_complexity": static_time,
                "space_complexity": static_space,
                **static_payload,
                "ai_suggestion": "AI suggestions are disabled. Please add a GEMINI_API_KEY to your .env file.",
            }

        prompt = f"""
        You are an expert algorithm analyzer.
        Code to analyze:
        {submission.code}

        The static AST engine estimated -> Time: {static_time}, Space: {static_space}
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

        try:
            response = client.models.generate_content(
                model="gemini-2.5-flash",
                contents=prompt,
                config={
                    "response_mime_type": "application/json",
                    "response_schema": AIAnalysis,
                },
            )

            ai_data = json.loads(response.text)
            final_time = ai_data.get("time_complexity", static_time)
            final_space = ai_data.get("space_complexity", static_space)
            final_explanation = ai_data.get("explanation", "Analysis complete.")

        except Exception:
            final_time = static_time
            final_space = static_space
            final_explanation = (
                "AI explanation unavailable; static analysis shown.\n\n"
                "The static analyzer result is still returned with confidence metadata and matched-rule evidence."
            )

        return {
            "status": "success",
            "time_complexity": final_time,
            "space_complexity": final_space,
            **static_payload,
            "ai_suggestion": final_explanation,
        }

    except Exception as e:
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=f"Error analyzing code: {str(e)}")


@app.get("/")
async def root():
    return {"message": "Big O Analyzer Backend is running!"}
