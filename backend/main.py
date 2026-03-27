# backend/main.py
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from core.parser import code_parser
from rules.base_loops import analyze_base_loops
from rules.sorting_search import analyze_sorting_search
from rules.recursion import analyze_recursion 
from rules.space_complexity import analyze_space_complexity

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
        
        # Step 1: TIME COMPLEXITY ENGINE
        rule_results = analyze_sorting_search(root_node, submission.code)
        
        if rule_results is None:
            rule_results = analyze_recursion(root_node, submission.code)
            
        if rule_results is None:
            rule_results = analyze_base_loops(root_node)
            
        # Step 2: SPACE COMPLEXITY ENGINE
        # Run our new space analyzer to double-check memory usage
        calculated_space = analyze_space_complexity(
            root_node, 
            submission.code, 
            rule_results["space_complexity"]
        )
        
        # Step 3: THE AI BRAIN
        ai_text = get_ai_suggestion(
            code=submission.code,
            time_complexity=rule_results["time_complexity"],
            space_complexity=calculated_space
        )
        
        return {
            "status": "success",
            "time_complexity": rule_results["time_complexity"],
            "space_complexity": calculated_space, # Use the new calculated space!
            "analysis_steps": rule_results["analysis_steps"] + [f"Analyzed AST for memory allocation: Space complexity is {calculated_space}."],
            "ai_suggestion": ai_text
        }
        
    except Exception as e:
        import traceback # <--- Add this import right here
        traceback.print_exc() # <--- This forces the terminal to print the full red error!
        raise HTTPException(status_code=500, detail=f"Error analyzing code: {str(e)}")
    

@app.get("/")
async def root():
    return {"message": "Big O Analyzer Backend is running!"}