from pydantic import BaseModel, EmailStr
from typing import List, Optional, Dict, Union

# Auth Models
class UserBase(BaseModel):
    email: EmailStr
    role: str = "student" # student, hr
    full_name: Optional[str] = None

class UserCreate(UserBase):
    password: str
    domain: Optional[str] = None
    experience: Optional[int] = 0
    skills: List[str] = []
    accessibility_needs: List[str] = []

class UserInDB(UserBase):
    hashed_password: str

class User(UserBase):
    full_name: Optional[str] = None
    domain: Optional[str] = None
    experience: Optional[int] = 0
    skills: List[str] = []
    accessibility_needs: List[str] = [] # "blind", "neurodivergent", etc.

class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    email: Union[str, None] = None
    role: Union[str, None] = None

class LoginRequest(BaseModel):
    email: str
    password: str

class LoginResponse(BaseModel):
    access_token: str
    token_type: str
    user: User

# Resume
class ResumeUpload(BaseModel):
    text: str

class ExtractedSkills(BaseModel):
    skills: List[str]
    suggested_level: str

class ProfileUpdate(BaseModel):
    full_name: str
    domain: str
    experience: int
    skills: List[str]
    accessibility_needs: List[str] = []

# Assessment Generation
class AssessmentRequest(BaseModel):
    domain: str
    level: str
    experience: int = 0
    skills: List[str] = []

class Question(BaseModel):
    id: int
    text: str
    skill_category: Union[str, List[str]]  # logical_reasoning, problem_solving, etc.
    question_type: str
    difficulty: str

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
