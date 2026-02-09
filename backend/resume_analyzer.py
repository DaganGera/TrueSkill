from typing import Dict, Any
from ollama_client import query_ollama
import json

def analyze_resume(resume_text: str) -> Dict[str, Any]:
    """
    Analyzes a resume to extract skills and experience level, ignoring PII.

    Args:
        resume_text (str): The text content of the resume.

    Returns:
        Dict[str, Any]: A dictionary containing 'skills' (list) and 'experience_level' (str).
    """
    if not resume_text:
        return {"skills": [], "experience_level": "unknown"}

    prompt = f"""
    You are a Resume Analyzer Agent. Your task is to extract skills and determine the experience level from the provided resume text.
    
    CRITICAL INSTRUCTIONS:
    1. IGNORE all Personally Identifiable Information (PII) such as name, gender, age, college, location, email, phone number, etc.
    2. Extract a list of technical and professional skills.
    3. Determine the experience level based on the content (beginner | intermediate | expert).
    4. Output MUST be strictly valid JSON.
    
    Input Resume:
    {resume_text}
    
    Output Format (STRICT JSON):
    {{
      "skills": ["skill1", "skill2", ...],
      "experience_level": "beginner | intermediate | expert"
    }}
    """

    response = query_ollama(prompt, format="json")
    
    if response:
        try:
            return json.loads(response)
        except json.JSONDecodeError:
            print(f"Error: Failed to decode JSON from Ollama response: {response}")
            return {"skills": [], "experience_level": "unknown"}
    else:
        return {"skills": [], "experience_level": "unknown"}

if __name__ == "__main__":
    # Example Input (Test Case)
    example_resume = """
    John Doe
    New York, NY
    john.doe@email.com
    
    Summary:
    Software Engineer with 5 years of experience in Python, Django, and React. 
    Built scalable web applications for fintech.
    
    Education:
    B.S. Computer Science, University of Examples (2018)
    """
    
    print("Analyzing Resume...")
    result = analyze_resume(example_resume)
    
    print("\n--- Result ---")
    print(json.dumps(result, indent=2))
    
    print("\n--- Direct Verification ---")
    if "John Doe" not in json.dumps(result):
        print("PASS: Name ignored in output.")
    else:
        print("FAIL: Name found in output.")
