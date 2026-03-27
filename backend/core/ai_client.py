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
    prompt = f"""
    You are an expert, encouraging computer science tutor. 
    A student submitted the following code:
    
    ```
    {code}
    ```
    
    Our static analysis engine calculated its time complexity as {time_complexity} and space complexity as {space_complexity}.
    
    In 2 to 3 short sentences, explain WHY it has this complexity, and suggest ONE way to optimize it (if an optimization exists). Keep it beginner-friendly, concise, and do not use markdown formatting in your response.
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