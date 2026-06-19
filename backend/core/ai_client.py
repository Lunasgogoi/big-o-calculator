# backend/core/ai_client.py
import os
from google import genai
from dotenv import load_dotenv

# Load the secret variables from the .env file
load_dotenv()

api_key = os.getenv("GEMINI_API_KEY")

# Initialize the modern GenAI client
client = genai.Client(api_key=api_key) if api_key else None

def get_ai_suggestion(code: str, time_complexity: str, space_complexity: str) -> str:
    """
    Sends the code and our calculated complexities to Gemini to generate a human-friendly explanation.
    """
    if not client:
        return "AI suggestions are disabled. Please add a GEMINI_API_KEY to your .env file."

    # This is the "Prompt Engineering" part!
    prompt = f"""You are an expert technical interviewer and algorithmic tutor.
                A user has submitted the following code.
                
                Our static analysis engine calculated these boundaries:
                - Time Complexity: {time_complexity}
                - Space Complexity: {space_complexity}
                
                YOUR MISSION:
                1. VALIDATE: If these complexities are correct, explain WHY in 2 to 3 concise sentences based on loops, recursion, or memory. Name the algorithm (e.g., Dijkstra, Monotonic Stack) if applicable.
                2. THE OVERRIDE RULE: If the engine's calculation is blatantly incorrect (e.g., the user wrote a Graph algorithm but used weird variable names like 'bacon' instead of 'adj', causing the engine to guess O(n^2)), you must OVERRIDE the engine. State the correct Time and Space complexity, and gently explain that using non-standard naming conventions tricked the static analyzer.
                3. STRICT FORMATTING: Keep your explanation technical, educational, and strictly avoid all markdown formatting in your response.

                Code snippet:
                {code}
            """
    
    try:
        # The new v2 SDK syntax for generating content!
        response = client.models.generate_content(
            model='gemini-2.5-flash',
            contents=prompt,
        )
        return response.text.strip() if response and response.text else "No response from AI tutor."
    except Exception as e:
        print(f"AI API Error: {e}")
        return "Our AI tutor is currently taking a quick coffee break. Try again in a moment!"