import os
import json
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from google import genai
from dotenv import load_dotenv

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
from rules.python.matrix import analyze_matrix
from rules.python.built_in_iterators import analyze_built_in_iterators
from rules.python.math_loops import analyze_math_loops
from rules.python.advanced_graphs import analyze_advanced_graphs
from rules.python.dsu import analyze_dsu
from rules.python.sieve import analyze_sieve
from rules.python.backtracking import analyze_backtracking
import rules.python.graph_traversal as py_graph
from rules.python.morris_traversal import analyze_morris_traversal

# (Make sure to import your new graph rules here if they are in separate files!)
# from rules.python.bellman_ford import analyze_bellman_ford
# from rules.python.floyd_warshall import analyze_floyd_warshall

# Initialize the modern GenAI client
load_dotenv()
api_key = os.getenv("GEMINI_API_KEY")
client = genai.Client(api_key=api_key) if api_key else None

app = FastAPI(title="Big O Analyzer API")

origins = [
    "http://localhost:5173", # For your local testing
    "http://localhost:3000",
    "https://big-o-calculator-bwc3zu6ap-lunas-gogoi-s-projects.vercel.app", # Your current Vercel build
    # NOTE: If Vercel gives you a shorter, cleaner URL later (like big-o-calculator.vercel.app), add it here too!
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,   # 🚨 Use the explicit list instead of ["*"]
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)

class CodeSubmission(BaseModel):
    code: str
    language: str = "python" 

# 🚨 Structured Outputs Schema
class AIAnalysis(BaseModel):
    time_complexity: str
    space_complexity: str
    explanation: str

# Mathematically Corrected Ranking
COMPLEXITY_RANKS = {
    "O(1)": 1,
    "O(log n)": 2,
    "O(log N)": 2,
    "O(sqrt(n))": 3,
    "O(sqrt(N))": 3,
    "O(n)": 4,
    "O(N)": 4,       
    "O(V + E)": 4,
    "O(E * α(V))": 4,
    "O(n log log n)": 4.5,
    "O(n log n)": 5,
    "O(N log N)": 5,
    "O(n^2)": 6,
    "O(N^2)": 6,
    "O(N * M)": 6,
    "O(E log V)": 6.5, 
    "O(E log E)": 6.5, 
    "O(n^3)": 7,
    "O(N^3)": 7,
    "O(V^3)": 7,
    "O(2^n)": 8,
    "O(n!)": 9,      
    "O(N!)": 9
}

def get_dominant_result(results: list):
    """Filters out None values and returns the rule result with the highest time complexity."""
    valid_results = [r for r in results if r is not None and r["time_complexity"] in COMPLEXITY_RANKS]
    
    if not valid_results:
        return {"time_complexity": "O(1)", "space_complexity": "O(1)"}
        
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
            # Collect ALL results
            found_results = []
            
            found_results.append(analyze_advanced_graphs(root_node, submission.code))
            found_results.append(analyze_dsu(root_node, submission.code))
            found_results.append(py_graph.analyze_graph_traversal(root_node, submission.code))
            found_results.append(analyze_morris_traversal(root_node, submission.code))
            found_results.append(analyze_sorting_search(root_node, submission.code))
            found_results.append(analyze_sort_search(root_node, submission.code))
            found_results.append(analyze_linked_list(root_node, submission.code))
            found_results.append(analyze_binary_tree(root_node, submission.code))
            found_results.append(analyze_dp(root_node, submission.code))
            found_results.append(analyze_tabulation(root_node, submission.code))
            found_results.append(analyze_backtracking(root_node, submission.code))
            found_results.append(analyze_recursion(root_node, submission.code))
            found_results.append(analyze_sliding_window(root_node, submission.code))
            found_results.append(analyze_monotonic_stack(root_node, submission.code))
            found_results.append(analyze_matrix(root_node, submission.code))
            found_results.append(analyze_heap(root_node, submission.code))
            found_results.append(py_logarithmic(root_node, submission.code))
            found_results.append(analyze_built_in_iterators(root_node, submission.code))
            found_results.append(analyze_sieve(root_node, submission.code))
            found_results.append(analyze_math_loops(root_node, submission.code))
            
            # Uncomment if you have these functions imported:
            # found_results.append(analyze_bellman_ford(root_node, submission.code))
            # found_results.append(analyze_floyd_warshall(root_node, submission.code))
            
            found_results.append(analyze_base_loops(root_node)) # The fallback loop counter
            
            print(f"DEBUG - FOUND RESULTS: {found_results}")
            
            has_sieve = any(r and r["time_complexity"] == "O(n log log n)" for r in found_results)
            if has_sieve:
                found_results = [r for r in found_results if r and r["time_complexity"] not in ["O(n^2)", "O(N^2)"]]
            
            # Pick the heaviest complexity found in the entire file!
            rule_results = get_dominant_result(found_results)
            
        # Step 2: SPACE COMPLEXITY ENGINE
        calculated_space = analyze_space_complexity(
            root_node, 
            submission.code, 
            rule_results["space_complexity"]
        )
        
        # Step 3: THE AI BRAIN (Structured JSON Output System)
        static_time = rule_results["time_complexity"]
        static_space = calculated_space

        if not client:
            return {
                "status": "success",
                "time_complexity": static_time,
                "space_complexity": static_space,
                "ai_suggestion": "AI suggestions are disabled. Please add a GEMINI_API_KEY to your .env file."
            }

        prompt = f"""
        You are an expert algorithm analyzer. 
        Code to analyze:
        {submission.code}

        The static AST engine guessed -> Time: {static_time}, Space: {static_space}

        Verify if this is correct. If it is wrong (like in O(log n) tree pruning, graph algorithms, etc.), correct it.
        Explain how the complexity was derived. If you overrode the static engine, briefly explain why.
        """

        try:
            # 🚨 Force pure JSON using response_mime_type and response_schema
            response = client.models.generate_content(
                model='gemini-2.5-flash',
                contents=prompt,
                config={
                    'response_mime_type': 'application/json',
                    'response_schema': AIAnalysis,
                }
            )

            # Because we forced 'application/json', there are NO markdown backticks to strip!
            ai_data = json.loads(response.text)

            # Safely extract the AI's final answers
            final_time = ai_data.get("time_complexity", static_time)
            final_space = ai_data.get("space_complexity", static_space)
            final_explanation = ai_data.get("explanation", "Analysis complete.")

        except Exception as e:
            print(f"AI JSON Parse Error: {e}")
            final_time = static_time
            final_space = static_space
            final_explanation = "The AI encountered an error formatting the response. Try again."

        return {
            "status": "success",
            "time_complexity": final_time,
            "space_complexity": final_space,
            "ai_suggestion": final_explanation
        }
        
    except Exception as e:
        import traceback 
        traceback.print_exc() 
        raise HTTPException(status_code=500, detail=f"Error analyzing code: {str(e)}")

@app.get("/")
async def root():
    return {"message": "Big O Analyzer Backend is running!"}