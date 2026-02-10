import random
from typing import List, Dict

# Mock AI Service - Simulates LLM responses for Hackathon demo stability

# --- Prompt Logic ---
# In a real system, these would be sent to an LLM API.
QUESTION_GEN_PROMPT_TEMPLATE = """
Generate 6 adaptive questions for a {level} level assessment in {domain}.
Focus on: logical_reasoning, problem_solving, critical_thinking, analytical_reasoning.
Ensure questions test reasoning, not memorization.
"""

ANSWER_EVAL_PROMPT_TEMPLATE = """
Evaluate the following answer for question: "{question}"
Answer: "{answer}"
Score based on logic and clarity. Ignore grammar.
"""

# --- Mock Data ---

MOCK_QUESTIONS = {
    "React": [
        {"text": "Explain how you would optimize a React application that renders a large lists of items. Focus on the 'why' behind your choice.", "skill": "problem_solving"},
        {"text": "A component is re-rendering unexpectedly. How do you safeguard against this, and what tools would you use to debug?", "skill": "critical_thinking"},
        {"text": "Design a state management structure for a shopping cart. Justify using Context vs Redux vs Local State.", "skill": "analytical_reasoning"},
        {"text": "If `useEffect` dependencies are omitted, what happens? Explain the lifecycle implication.", "skill": "logical_reasoning"},
        {"text": "How does the Virtual DOM diffing algorithm handle list re-ordering? What is the role of 'keys'?", "skill": "technical_depth"},
        {"text": "Describe a scenario where `useMemo` is harmful rather than helpful.", "skill": "optimization_logic"},
    ],
    "Python": [
        {"text": "Explain the difference between a generator and a list comprehension. When would you use one over the other for processing strict memory limits?", "skill": "problem_solving"},
        {"text": "Debug a memory leak in a long-running Python script. What is your process?", "skill": "critical_thinking"},
        {"text": "Design a decorator that retries a function 3 times on failure. Explain the flow.", "skill": "analytical_reasoning"},
        {"text": "Why is the Global Interpreter Lock (GIL) a bottleneck? How do you bypass it for CPU-bound tasks?", "skill": "logical_reasoning"},
        {"text": "Explain the concept of 'duck typing' with a practical example.", "skill": "technical_depth"},
        {"text": "How does Python garbage collection work? Explain reference counting vs cyclic GC.", "skill": "optimization_logic"},
    ],
    "General": [
        {"text": "You have a deadline in 2 hours and a critical bug. Walk me through your prioritization process.", "skill": "problem_solving"},
        {"text": "Explain a complex technical concept to a non-technical stakeholder.", "skill": "communication"},
        {"text": "Analyze a situation where you had to make a trade-off between code quality and speed.", "skill": "critical_thinking"},
        {"text": "How do you approach learning a new technology stack quickly?", "skill": "adaptability"},
        {"text": "Describe a time you disagreed with a team member's technical implementation. How did you resolve it?", "skill": "collaboration"},
        {"text": "What is your process for reviewing code? What do you look for first?", "skill": "analytical_reasoning"},
    ]
}

from backend.ollama_client import query_ollama
import json

from backend.crew_orchestrator import crew_orchestrator
import json

def generate_questions(domain: str, level: str, experience: int = 0, user_skills: List[str] = []) -> List[Dict]:
    """Generates questions using the Question Architect Agent."""
    
    # Construct a pseudo-profile for the agent
    profile_analysis = {
        "skills": user_skills,
        "experience_years": experience,
        "seniority_level": level
    }
    
    # Call the Crew
    questions = crew_orchestrator.design_assessment(profile_analysis, domain)
    
    # If Crew fails (returns empty), fallback to Mock
    if not questions:
        print("Crew generation failed, falling back to mock.")
        domain_key = domain if domain in MOCK_QUESTIONS else "General"
        qs = MOCK_QUESTIONS[domain_key]
        questions = []
        for i, q in enumerate(qs):
            questions.append({
                "id": i + 1,
                "text": q["text"],
                "skill_category": q["skill"],
                "question_type": "text",
                "difficulty": "Intermediate"
            })
    else:
        # Ensure IDs are set
        for i, q in enumerate(questions):
            q["id"] = i + 1
            if "question_type" not in q: q["question_type"] = "text"
            # Ensure difficulty is string
            if "difficulty" in q and not isinstance(q["difficulty"], str):
                 q["difficulty"] = str(q["difficulty"])
            # Ensure skill_category is string (Ollama sometimes returns list)
            if "skill_category" in q and isinstance(q["skill_category"], list):
                q["skill_category"] = ", ".join(q["skill_category"])
            
    return questions

def evaluate_submission(answers: List[Dict]) -> Dict:
    """Evaluates answers using the Grader Agent."""
    
    # Determine domain context from answers (simplified)
    # In prod, we'd pass the assessment ID and get the domain
    domain = "General" 
    
    evaluation = crew_orchestrator.grade_submission(answers, domain)
    
    # Fallback if evaluation fails
    if evaluation.get("overall_score") == 0:
        return {
            "overall_score": 75,
            "skill_scores": [
                {"skill": "Problem Solving", "percentage": 75, "feedback": "Good effort, but AI grading failed. This is a placeholder score."}
            ],
            "summary_feedback": "AI Grader was unavailable. Please try again later."
        }
        
    return evaluation

def level_description(score):
    if score > 90: return "Expert"
    if score > 80: return "Advanced"
    if score > 70: return "Intermediate"
    return "Foundational"

def extract_skills_from_text(text: str) -> Dict:
    """Simulates AI resume parsing."""
    # Simple keyword extraction for demo
    keywords = ["Python", "React", "FastAPI", "SQL", "Leadership", "Communication", "Java", "C++", "AWS"]
    found = [k for k in keywords if k.lower() in text.lower()]
    
    if not found:
        found = ["General Problem Solving", "Adaptability"]
        
    return {
        "skills": found,
        "suggested_level": "Intermediate", # logic based on keyword count usually
        "analysis": "Resume indicates strong technical foundation."
    }
