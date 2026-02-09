from fastapi import APIRouter
from ..models import AssessmentRequest, Assessment, SubmissionRequest, AssessmentResult
from ..ai_service import generate_questions, evaluate_submission
import uuid

router = APIRouter()

@router.post("/generate", response_model=Assessment)
async def create_assessment(request: AssessmentRequest):
    questions = generate_questions(request.domain, request.level)
    assessment_id = str(uuid.uuid4())
    # In a real app, save assessment_id -> questions mapping to DB to verify answers later
    return {
        "id": assessment_id, 
        "questions": questions
    }

@router.post("/submit", response_model=AssessmentResult)
async def submit_assessment(request: SubmissionRequest):
    # In a real app, retrieve question context using request.assessment_id
    evaluation = evaluate_submission(request.answers)
    return evaluation
