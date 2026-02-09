from typing import List, Dict, Any
from ollama_client import query_ollama
import json

def generate_domain_questions(domain: str, level: str, accessibility_rules: Dict[str, Any] = None) -> List[Dict[str, Any]]:
    """
    Generates domain-specific, reasoning-based questions tailored to the candidate's level and accessibility needs.

    Args:
        domain (str): The subject domain (e.g., "Python", "React").
        level (str): The difficulty level (e.g., "beginner", "intermediate", "expert").
        accessibility_rules (Dict[str, Any]): Accessibility configuration (from Accessibility Guard).

    Returns:
        List[Dict[str, Any]]: A list of 6 questions.
    """
    if not accessibility_rules:
        accessibility_rules = {}

    # Extract accessibility adaptations
    eval_rules = accessibility_rules.get("evaluation_rules", {})
    question_style = accessibility_rules.get("preferred_question_style", "text")
    time_pressure = eval_rules.get("time_pressure", "normal")
    
    # Construct prompt with specific constraints
    prompt = f"""
    You are an Expert Technical Interviewer. Your task is to generate 6 reasoning-based assessment questions.
    
    Target Domain: {domain}
    Difficulty Level: {level}
    
    Accessibility Context:
    - Preferred Style: {question_style} (If 'visual', describe a scenario or code snippet clearly. If 'scenario', use real-world examples.)
    - Time Pressure: {time_pressure} (If 'none', ensure questions are not speed-dependent.)
    
    CRITICAL RULES:
    1. NO memorization or syntax trivia (e.g., "What is the syntax for X?").
    2. Focus on LOGIC, REASONING, and CONCEPTUAL UNDERSTANDING.
    3. NO trick questions.
    4. One concept per question.
    5. Output strictly a JSON list of 6 objects.
    
    Output Format (STRICT JSON):
    [
      {{
        "id": 1,
        "question_text": "Example question text...",
        "question_type": "logic",
        "difficulty": "{level}"
      }}
    ]
    """

    response = query_ollama(prompt, format="json")
    questions = []
    if response:
        # Clean up markdown code blocks if present
        cleaned_response = response.strip()
        if "```json" in cleaned_response:
            cleaned_response = cleaned_response.split("```json")[1].split("```")[0].strip()
        elif "```" in cleaned_response:
            cleaned_response = cleaned_response.split("```")[1].split("```")[0].strip()

        try:
            data = json.loads(cleaned_response)
            if isinstance(data, list):
                questions = data[:6]
            elif isinstance(data, dict):
                for key, value in data.items():
                    if isinstance(value, list) and len(value) > 0:
                        questions = value[:6]
                        break
        except json.JSONDecodeError:
            print(f"Error: Failed to decode JSON from Ollama response: {cleaned_response[:100]}...")
            
    if questions:
        return questions
    
    # Fallback for demo stability if LLM fails
    print("WARNING: Using fallback questions due to generation failure.")
    return [
        {"id": i, "question_text": f"Fallback {domain} question {i}", "question_type": "conceptual", "difficulty": level}
        for i in range(1, 7)
    ]

if __name__ == "__main__":
    # Test Cases
    test_cases = [
        {
            "domain": "Python",
            "level": "beginner",
            "accessibility": {"preferred_question_style": "text", "evaluation_rules": {"time_pressure": "normal"}}
        },
        {
            "domain": "React",
            "level": "intermediate",
            "accessibility": {"preferred_question_style": "scenario", "evaluation_rules": {"time_pressure": "none"}}
        }
    ]
    
    for case in test_cases:
        print(f"\n--- Generating for {case['domain']} ({case['level']}) ---")
        questions = generate_domain_questions(case['domain'], case['level'], case['accessibility'])
        print(json.dumps(questions, indent=2))
        
        # Verification
        if len(questions) == 6:
            print("PASS: Generated 6 questions.")
        else:
            print(f"FAIL: Generated {len(questions)} questions.")

