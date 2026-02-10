from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
try:
    from backend.models import AssessmentRequest, Assessment as PydanticAssessment, SubmissionRequest
    from backend.models_db import Assessment as DBAssessment, Submission as DBSubmission, User as DBUser
    from backend.dependencies import get_current_user, get_db
    from backend.ai_service import generate_questions, evaluate_submission
except ImportError:
    from models import AssessmentRequest, Assessment as PydanticAssessment, SubmissionRequest
    from models_db import Assessment as DBAssessment, Submission as DBSubmission, User as DBUser
    from dependencies import get_current_user, get_db
    from ai_service import generate_questions, evaluate_submission
import uuid
import datetime

router = APIRouter()

@router.post("/generate", response_model=PydanticAssessment)
async def create_assessment(
    request: AssessmentRequest, 
    user: DBUser = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    questions = generate_questions(request.domain, request.level, request.experience, request.skills)
    assessment_id = str(uuid.uuid4())
    
    # Save to DB
    new_assessment = DBAssessment(
        id=assessment_id,
        user_id=user.id,
        questions=questions,
        created_at=datetime.datetime.now().isoformat()
    )
    db.add(new_assessment)
    db.commit()
    
    return {
        "id": assessment_id, 
        "questions": questions
    }

@router.post("/submit")
async def submit_assessment(
    request: SubmissionRequest, 
    user: DBUser = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    # Convert Pydantic models to dicts for JSON serialization
    answers_list = [a.dict() for a in request.answers]
    
    evaluation = evaluate_submission(answers_list)
    
    # Save submission to DB
    submission = DBSubmission(
        assessment_id=request.assessment_id,
        user_id=user.id,
        answers=answers_list,
        result=evaluation
    )
    db.add(submission)
    db.commit()
    
    return evaluation
