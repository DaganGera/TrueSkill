from fastapi import APIRouter
try:
    from backend.models import ResumeUpload, ExtractedSkills
    from backend.ai_service import extract_skills_from_text
except ImportError:
    from models import ResumeUpload, ExtractedSkills
    from ai_service import extract_skills_from_text

router = APIRouter()

@router.post("/parse_resume", response_model=ExtractedSkills)
async def parse_resume(request: ResumeUpload):
    result = extract_skills_from_text(request.text)
    return {
        "skills": result["skills"],
        "suggested_level": result["suggested_level"]
    }
