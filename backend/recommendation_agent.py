from typing import List, Dict, Any
from ollama_client import query_ollama
import json

def generate_recommendations(skills: List[str]) -> List[str]:
    """
    Generates supportive, skill-focused improvement suggestions based on the provided skills.

    Args:
        skills (List[str]): A list of skills (e.g., ["Python", "React"]).

    Returns:
        List[str]: A list of 2-4 improvement suggestions.
    """
    if not skills:
        return ["Please provide skills to get personalized recommendations."]

    skills_str = ", ".join(skills)
    
    prompt = f"""
    You are a supportive Career Coach Agent. Your task is to provide 2-4 improvement suggestions based on the user's current skills.
    
    Current Skills: {skills_str}
    
    CRITICAL INSTRUCTIONS:
    1. Tone: Supportive, encouraging, and professional.
    2. Focus: Strictly on technical skill improvement and career growth related to the input skills.
    3. Bias Guard: Do NOT make assumptions about the user's background, gender, age, or disability status.
    4. Output: STRICT JSON format - a list of strings.
    
    Output Format (STRICT JSON):
    ["Suggestion 1", "Suggestion 2", "Suggestion 3"]
    """

    response = query_ollama(prompt, format="json")
    
    if response:
        try:
            # Ollama with format="json" might return an object wrapper or just the list. 
            # We strictly asked for a list, but let's handle potential object wrapping if the model deviates.
            data = json.loads(response)
            
            if isinstance(data, list):
                return data
            elif isinstance(data, dict):
                # Sometimes models wrap in {"recommendations": [...]} despite instructions
                for key, value in data.items():
                    if isinstance(value, list):
                        return value
                return ["Could not extract recommendations from response."]
            else:
                return ["Unexpected response format."]

        except json.JSONDecodeError:
            print(f"Error: Failed to decode JSON from Ollama response: {response}")
            return ["Error generating recommendations."]
    else:
        return ["Error connecting to AI service."]

if __name__ == "__main__":
    # Test Case
    user_skills = ["Python", "React"]
    
    print(f"Generating recommendations for skills: {user_skills}...")
    recommendations = generate_recommendations(user_skills)
    
    print("\n--- Recommendations ---")
    print(json.dumps(recommendations, indent=2))
    
    print("\n--- Verification ---")
    if isinstance(recommendations, list) and len(recommendations) > 0:
        print("PASS: Returned a list of suggestions.")
    else:
        print("FAIL: Did not return a list.")
