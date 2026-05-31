from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from core import parser as code_parser
from rules.python.logarithmic import analyze_logarithmic as py_logarithmic
from rules.python.base_loops import analyze_base_loops
from rules.python.sorting_search import analyze_sorting_search
from rules.python.recursion import analyze_recursion 
from rules.python.space_complexity import analyze_space_complexity
from rules.python.sliding_window import analyze_sliding_window
from rules.python.dynamic_programming import analyze_dp
from rules.python.tabulation import analyze_tabulation
from rules.python.binary_trees import analyze_binary_tree
from rules.python.heap import analyze_heap
from rules.python.linked_list import analyze_linked_list
from rules.python.monotonic_stack import analyze_monotonic_stack
from rules.python.built_in_sort import analyze_sort_search

import rules.python.graph_traversal as py_graph

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

# 🚨 THE RANKING SYSTEM: Determines which Big O is the heaviest
COMPLEXITY_RANKS = {
    "O(1)": 1,
    "O(log n)": 2,
    "O(n)": 3,
    "O(V + E)": 3,
    "O(n log n)": 4,
    "O(n^2)": 5,
    "O(n^3)": 6,
    "O(2^n)": 7
}

def get_dominant_result(results: list):
    """Filters out None values and returns the rule result with the highest time complexity."""
    valid_results = [r for r in results if r is not None and r["time_complexity"] in COMPLEXITY_RANKS]
    
    if not valid_results:
        return {"time_complexity": "O(1)", "space_complexity": "O(1)"}
        
    # Sort the dictionary objects based on their time_complexity rank
    return max(valid_results, key=lambda x: COMPLEXITY_RANKS[x["time_complexity"]])

@app.post("/api/analyze")
async def analyze_code(submission: CodeSubmission):
    if not submission.code.strip():
        raise HTTPException(status_code=400, detail="No code provided")

    try:
        root_node = code_parser.parse_code(submission.code, submission.language)
        rule_results = None
        
        # Traffic Director
        if submission.language == "cpp":
            # Run C++ Pipeline (To be implemented)
            rule_results = {"time_complexity": "O(1)", "space_complexity": "O(1)"} 
        else:
            # 🚨 THE NEW PYTHON PIPELINE: Collect ALL results!
            found_results = []
            
            found_results.append(py_graph.analyze_graph_traversal(root_node, submission.code))
            found_results.append(analyze_sorting_search(root_node, submission.code))
            found_results.append(analyze_sort_search(root_node, submission.code))
            found_results.append(analyze_linked_list(root_node, submission.code))
            found_results.append(analyze_binary_tree(root_node, submission.code))
            found_results.append(analyze_dp(root_node, submission.code))
            found_results.append(analyze_tabulation(root_node, submission.code))
            found_results.append(analyze_recursion(root_node, submission.code))
            found_results.append(analyze_sliding_window(root_node, submission.code))
            found_results.append(analyze_monotonic_stack(root_node, submission.code))
            found_results.append(analyze_heap(root_node, submission.code))
            found_results.append(py_logarithmic(root_node, submission.code))
            found_results.append(analyze_base_loops(root_node)) # The fallback loop counter
            
            # Pick the heaviest complexity found in the entire file!
            rule_results = get_dominant_result(found_results)
            
        # Step 2: SPACE COMPLEXITY ENGINE
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
            "space_complexity": calculated_space,
            "ai_suggestion": ai_text
        }
        
    except Exception as e:
        import traceback 
        traceback.print_exc() 
        raise HTTPException(status_code=500, detail=f"Error analyzing code: {str(e)}")

@app.get("/")
async def root():
    return {"message": "Big O Analyzer Backend is running!"}