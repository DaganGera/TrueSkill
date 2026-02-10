import json
from typing import Dict, Any, List
from .ollama_client import query_ollama

# --- Agent Definitions ---

class Agent:
    def __init__(self, name: str, role: str, goal: str, backstory: str):
        self.name = name
        self.role = role
        self.goal = goal
        self.backstory = backstory

    def execute(self, task_description: str, context: str = "") -> str:
        """
        Executes a task using LLM (Ollama).
        """
        print(f"\n[{self.role}] Working on: {task_description[:50]}...")
        
        prompt = f"""
        You are {self.name}, a {self.role}.
        Goal: {self.goal}
        Backstory: {self.backstory}
        
        Task: {task_description}
        
        Context Data:
        {context}
        
        IMPORTANT: Output must be valid JSON only. No markdown formatting.
        """
        
        response = query_ollama(prompt, format="json")
        return response

# --- Orchestrator ---

class HiringCrew:
    def __init__(self):
        self.resume_analyst = Agent(
            name="Alex",
            role="Senior Tech Recruiter",
            goal="Extract key technical skills and experience levels from resumes.",
            backstory="expert in parsing varied resume formats and identifying true expertise."
        )
        
        self.question_architect = Agent(
            name="Q",
            role="Chief Architect",
            goal="Design challenging, scenario-based technical interview questions.",
            backstory="Evaluates deep understanding over memorization. Hates 'LeetCode' style questions."
        )
        
        self.grader = Agent(
            name="Judge",
            role="Technical Hiring Manager",
            goal="Evaluate candidate answers for depth, clarity, and correctness.",
            backstory="Strict but fair. Looks for nuances and practical application of knowledge."
        )

    def analyze_profile(self, resume_text: str, domain: str) -> Dict[str, Any]:
        """Step 1: Resume Analysis"""
        task = f"Analyze this candidate's text for the {domain} role. Extract 'skills' (list), 'experience_years' (int), and 'seniority_level' (Junior/Mid/Senior)."
        result = self.resume_analyst.execute(task, context=f"Resume/Profile: {resume_text}")
        try:
            return json.loads(result)
        except:
            return {"skills": [], "experience_years": 0, "seniority_level": "Mid"}

    def design_assessment(self, profile_analysis: Dict, domain: str, count: int = 5) -> List[Dict]:
        """Step 2: Question Generation"""
        context = json.dumps(profile_analysis)
        task = f"Generate {count} {domain} interview questions based on the candidate's profile. Return a JSON object with a key 'questions' containing a list of objects with 'text', 'skill_category', 'difficulty'."
        result = self.question_architect.execute(task, context=context)
        try:
            data = json.loads(result)
            return data.get("questions", [])
        except:
            return []

    def grade_submission(self, answers: List[Dict], domain: str) -> Dict[str, Any]:
        """Step 3: Grading"""
        print(f"\n[Judge] Grading {len(answers)} answers for {domain}...")
        context = json.dumps(answers)
        task = f"Evaluate these {domain} interview answers. Return JSON with 'overall_score' (int 0-100), 'summary_feedback' (str), and 'skill_scores' (list of {{skill, percentage, feedback}})."
        
        result_str = self.grader.execute(task, context=context)
        
        # Robust JSON extraction
        try:
            # Try direct parse
            return json.loads(result_str)
        except json.JSONDecodeError:
            print(f"[Judge] Validating JSON failed. Raw output: {result_str[:100]}...")
            # Try to find JSON object in text (sometimes LLMs add markdown)
            try:
                start = result_str.find('{')
                end = result_str.rfind('}') + 1
                if start != -1 and end != -1:
                    clean_json = result_str[start:end]
                    return json.loads(clean_json)
            except:
                pass
                
            print("[Judge] JSON repair failed. Returning fallback.")
            return {"overall_score": 0, "summary_feedback": "Error grading assessment. Please try again.", "skill_scores": []}

# Singleton instance
crew_orchestrator = HiringCrew()
