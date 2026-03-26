# backend/main.py
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

# Import our custom parser and rule engine!
from core.parser import code_parser
from rules.base_loops import analyze_base_loops

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
    # 1. Check if the code is empty
    if not submission.code.strip():
        raise HTTPException(status_code=400, detail="No code provided")

    try:
        # 2. Parse the code into an AST
        root_node = code_parser.parse_code(submission.code, submission.language)
        
        # 3. Pass the AST to our rule engine (currently just checking loop depth)
        rule_results = analyze_base_loops(root_node)
        
        # 4. Construct the final response for the React frontend
        return {
            "status": "success",
            "time_complexity": rule_results["time_complexity"],
            "space_complexity": rule_results["space_complexity"],
            "analysis_steps": rule_results["analysis_steps"],
            # We will wire up the real AI next!
            "ai_suggestion": f"The rule engine calculated {rule_results['time_complexity']}. Next, we will ask the AI how to improve this!"
        }
        
    except Exception as e:
        # If something goes wrong during parsing, tell the frontend
        raise HTTPException(status_code=500, detail=f"Error analyzing code: {str(e)}")

@app.get("/")
async def root():
    return {"message": "Big O Analyzer Backend is running!"}