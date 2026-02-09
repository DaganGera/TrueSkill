import json
from typing import Dict, Any, List
from ollama_client import query_ollama
from resume_analyzer import analyze_resume
from accessibility_guard import get_accessibility_rules
from recommendation_agent import generate_recommendations
from privacy import anonymize_candidate

# Mock Agent Wrapper
class Agent:
    def __init__(self, name: str, role: str, goal: str, tool=None):
        self.name = name
        self.role = role
        self.goal = goal
        self.tool = tool

    def execute(self, context: Dict[str, Any] = None) -> Dict[str, Any]:
        """
        Executes the agent's logic.
        """
        print(f"\n[{self.role}] Starting task: {self.goal}")
        
        # If agent has a specific tool, use it
        if self.tool:
            return self.tool(context)
        
        # Otherwise, use LLM (e.g., Assessment Planner)
        prompt = self.construct_prompt(context)
        response = query_ollama(prompt, format="json")
        try:
            return json.loads(response) if response else {}
        except:
            return {}

    def construct_prompt(self, context: Dict[str, Any]) -> str:
        # Generic prompt construction for LLM-based agents without tools
        return f"""
        You are a {self.role}. Your goal is: {self.goal}.
        
        Context Data:
        {json.dumps(context, indent=2)}
        
        Output strictly in JSON format.
        """

# Tools Wrappers
def run_resume_analyzer(context: Dict[str, Any]) -> Dict[str, Any]:
    text = context.get("resume_text", "")
    return analyze_resume(text)

def run_accessibility_guard(context: Dict[str, Any]) -> Dict[str, Any]:
    user_mode = context.get("user_mode", "general")
    return get_accessibility_rules(user_mode)

def run_recommendation_agent(context: Dict[str, Any]) -> Dict[str, Any]:
    # Extract skills from previous context (Resume Analysis)
    skills = context.get("resume_analysis", {}).get("skills", [])
    return {"recommendations": generate_recommendations(skills)}

def run_assessment_planner(context: Dict[str, Any]) -> Dict[str, Any]:
    # LLM-based planning
    resume_data = context.get("resume_analysis", {})
    accessibility_data = context.get("accessibility_rules", {})
    
    prompt = f"""
    You are an Assessment Planner Agent. Plan a technical assessment based on the candidate's profile and accessibility needs.
    
    Candidate Profile:
    - Skills: {resume_data.get('skills', [])}
    - Experience: {resume_data.get('experience_level', 'unknown')}
    
    Accessibility Needs:
    {json.dumps(accessibility_data, indent=2)}
    
    Task:
    Create a high-level assessment plan.
    
    Output Format (STRICT JSON):
    {{
        "assessment_plan": {{
            "duration_minutes": int,
            "modules": ["Module 1", "Module 2"],
            "difficulty": "Low | Medium | High",
            "format_notes": "Specific notes on how to present questions"
        }}
    }}
    """
    response = query_ollama(prompt, format="json")
    try:
        return json.loads(response) if response else {}
    except:
        return {"error": "Failed to generate assessment plan"}

# Crew Orchestrator
class HiringCrew:
    def kickoff(self, inputs: Dict[str, Any]) -> Dict[str, Any]:
        results = {}
        
        # 1. Resume Analyzer
        print(f"\n--- Step 1: Resume Analyzer ---")
        resume_agent = Agent("ResumeAnalyzer", "Resume Analyzer", "Extract skills and experience", tool=run_resume_analyzer)
        results["resume_analysis"] = resume_agent.execute({"resume_text": inputs["resume_text"]})
        print(json.dumps(results["resume_analysis"], indent=2))
        
        # 2. Accessibility Guard
        print(f"\n--- Step 2: Accessibility & Bias Guard ---")
        acc_agent = Agent("AccessGuard", "Accessibility Officer", "Determine interaction rules", tool=run_accessibility_guard)
        results["accessibility_rules"] = acc_agent.execute({"user_mode": inputs["user_mode"]})
        print(json.dumps(results["accessibility_rules"], indent=2))

        # 3. Assessment Planner
        print(f"\n--- Step 3: Assessment Planner ---")
        planner_agent = Agent("Planner", "Assessment Lead", "Plan the assessment structure", tool=run_assessment_planner)
        results["assessment_plan"] = planner_agent.execute(results) # Pass previous results as context
        print(json.dumps(results["assessment_plan"], indent=2))
        
        # 4. Recommendation Agent
        print(f"\n--- Step 4: Recommendation Agent ---")
        rec_agent = Agent("Coach", "Career Coach", "Suggest improvements", tool=run_recommendation_agent)
        results["recommendations"] = rec_agent.execute(results) # Pass previous results (specifically resume_analysis inside)
        print(json.dumps(results["recommendations"], indent=2))

        # Final Report Aggregation
        final_report = {
            "candidate_id": anonymize_candidate(inputs["candidate_email"]),
            "timestamp": "2026-02-09T22:25:00", # Mock timestamp or use real
            "report": results
        }
        return final_report

if __name__ == "__main__":
    # Example Input
    inputs = {
        "candidate_email": "jane.doe@example.com",
        "resume_text": "Jane Doe. Senior Python Developer with 8 years experience in building APIs and ML models. Proficiency in Python, SQL, and Docker.",
        "user_mode": "neurodivergent"
    }
    
    crew = HiringCrew()
    final_output = crew.kickoff(inputs)
    
    print("\n==================================")
    print("       FINAL HR REPORT (JSON)     ")
    print("==================================")
    print(json.dumps(final_output, indent=2))
