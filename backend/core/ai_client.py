# backend/core/ai_client.py
import os
import json
from google import genai
from pydantic import BaseModel
from dotenv import load_dotenv

# Load the secret variables from the .env file
load_dotenv()

api_key = os.getenv("GEMINI_API_KEY")

# Initialize the modern GenAI client
client = genai.Client(api_key=api_key) if api_key else None

# 1. Define the exact JSON structure we want from Gemini
class AIAnalysis(BaseModel):
    time_complexity: str
    space_complexity: str
    explanation: str

# 2. Change the return type to a dictionary
def get_ai_suggestion(code: str, time_complexity: str, space_complexity: str) -> dict:
    """
    Sends the code and our calculated complexities to Gemini to generate a human-friendly explanation.
    """
    if not client:
        return {
            "time_complexity": time_complexity,
            "space_complexity": space_complexity,
            "explanation": "AI suggestions are disabled. Please add a GEMINI_API_KEY to your .env file."
        }

    # 3. Simplify the prompt since structured outputs handle the formatting
    prompt = f"""You are an expert technical interviewer and algorithmic tutor.
                A user has submitted the following code.
                
                Our static analysis engine calculated these boundaries:
                - Time Complexity: {time_complexity}
                - Space Complexity: {space_complexity}
                
                YOUR MISSION:
                1. VALIDATE: If these complexities are correct, explain WHY in 2 to 3 concise sentences.
                2. THE OVERRIDE RULE: If the engine's calculation is incorrect, you must OVERRIDE the engine. Provide the correct Time and Space complexity, and gently explain what the engine missed.
                
                Code snippet:
                {code}
            """
    
    try:
        # 4. Use Structured Outputs to guarantee a JSON response matching our Pydantic model
        response = client.models.generate_content(
            model='gemini-2.5-flash',
            contents=prompt,
            config={
                'response_mime_type': 'application/json',
                'response_schema': AIAnalysis,
            }
        )
        
        # 5. Parse the JSON string into a Python dictionary and return it
        return json.loads(response.text)
        
    except Exception as e:
        print(f"AI API Error: {e}")
        return {
            "time_complexity": time_complexity,
            "space_complexity": space_complexity,
            "explanation": "Our AI tutor is currently taking a quick coffee break. Try again in a moment!"
        }