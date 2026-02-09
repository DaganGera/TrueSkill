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

def generate_questions(domain: str, level: str) -> List[Dict]:
    """Simulates AI question generation."""
    # In production: Call OpenAI/Gemini API with QUESTION_GEN_PROMPT_TEMPLATE
    domain_key = domain if domain in MOCK_QUESTIONS else "General"
    questions = MOCK_QUESTIONS[domain_key]
    
    # Add IDs
    result = []
    for i, q in enumerate(questions):
        result.append({
            "id": i + 1,
            "text": q["text"],
            "skill_category": q["skill"],
            "question_type": "text",
            "difficulty": "Intermediate"
        })
    return result

def evaluate_submission(answers: List[Dict]) -> Dict:
    """Simulates AI answer evaluation."""
    # In production: Call LLM for each answer with ANSWER_EVAL_PROMPT_TEMPLATE
    
    # Mock efficient scoring logic
    skill_scores = {}
    total_score = 0
    
    # Randomized but plausible scores for demo
    base_score = random.randint(70, 95)
    
    skills = ["logical_reasoning", "problem_solving", "critical_thinking", "analytical_reasoning", "communication"]
    
    result_scores = []
    
    for skill in skills:
        score = min(100, max(60, base_score + random.randint(-10, 10)))
        feedback_options = [
            "Strong logical flow.",
            "Good reasoning, but could be specific.",
            "Excellent understanding of edge cases.",
            "Clear and concise explanation.",
            "Demonstrates deep conceptual knowledge."
        ]
        result_scores.append({
            "skill": skill,
            "percentage": score,
            "feedback": random.choice(feedback_options)
        })
        total_score += score

    overall = int(total_score / len(skills))
    
    return {
        "overall_score": overall,
        "skill_scores": result_scores,
        "summary_feedback": f"Candidate demonstrates {level_description(overall)} proficiency in {skills[0]} and {skills[1]}. Recommended for next round."
    }

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
