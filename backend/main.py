import os
import traceback

from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from core import ai_client
from core import parser as code_parser
from core.analyzer import analyze_static_complexity


load_dotenv()

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

        try:
            ai_data = ai_client.get_ai_suggestion(submission.code, static_analysis)
            final_time = ai_data.get("time_complexity", static_time)
            final_space = ai_data.get("space_complexity", static_space)
            final_explanation = ai_data.get("explanation", "Analysis complete.")

        except Exception:
            final_time = static_time
            final_space = static_space
            final_explanation = ai_client.AI_FALLBACK_EXPLANATION

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
