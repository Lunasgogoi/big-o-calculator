# backend/main.py
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from core.parser import code_parser
from rules.base_loops import analyze_base_loops
from rules.sorting_search import analyze_sorting_search

# 1. Import our new AI client!
from core.ai_client import get_ai_suggestion

app = FastAPI(title="Big O Analyzer API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class CodeSubmission(BaseModel):
    code: str
    language: str = "python" 

@app.post("/api/analyze")
async def analyze_code(submission: CodeSubmission):
    if not submission.code.strip():
        raise HTTPException(status_code=400, detail="No code provided")

    try:
        root_node = code_parser.parse_code(submission.code, submission.language)
        
        # Step 2: Run the static rule engine (Smartest rules first!)
        
        # Try to detect complex algorithms first
        rule_results = analyze_sorting_search(root_node, submission.code)
        
        # If it wasn't a complex algorithm, fall back to basic loop counting
        if rule_results is None:
            rule_results = analyze_base_loops(root_node)
            
        
        # Step 3: Call Gemini AI to get a smart suggestion!
        ai_text = get_ai_suggestion(
            code=submission.code,
            time_complexity=rule_results["time_complexity"],
            space_complexity=rule_results["space_complexity"]
        )
        
        return {
            "status": "success",
            "time_complexity": rule_results["time_complexity"],
            "space_complexity": rule_results["space_complexity"],
            "analysis_steps": rule_results["analysis_steps"],
            "ai_suggestion": ai_text
        }
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error analyzing code: {str(e)}")

@app.get("/")
async def root():
    return {"message": "Big O Analyzer Backend is running!"}