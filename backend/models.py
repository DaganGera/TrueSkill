from pydantic import BaseModel
from typing import List, Optional, Dict

# Auth
class LoginRequest(BaseModel):
    username: str
    password: str
    role: str  # "student" or "hr"

class LoginResponse(BaseModel):
    success: bool
    token: str
    username: str
    message: str

# Resume
class ResumeUpload(BaseModel):
    text: str

class ExtractedSkills(BaseModel):
    skills: List[str]
    suggested_level: str

# Assessment Generation
class AssessmentRequest(BaseModel):
    domain: str
    level: str

class Question(BaseModel):
    id: int
    text: str
    skill_category: str  # logical_reasoning, problem_solving, etc.

class Assessment(BaseModel):
    id: str
    questions: List[Question]

# Assessment Submission
class Answer(BaseModel):
    question_id: int
    text: str

class SubmissionRequest(BaseModel):
    assessment_id: str
    answers: List[Answer]

class SkillScore(BaseModel):
    skill: str
    percentage: int
    feedback: str

class AssessmentResult(BaseModel):
    overall_score: int
    skill_scores: List[SkillScore]
    summary_feedback: str

# Chart Data (for frontend convenience)
class ChartData(BaseModel):
    labels: List[str]
    datasets: List[Dict]
