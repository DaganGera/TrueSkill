from fastapi import APIRouter, HTTPException
from ..models import LoginRequest, LoginResponse
import uuid

router = APIRouter()

@router.post("/login", response_model=LoginResponse)
async def login(request: LoginRequest):
    # Mock Auth Logic
    # In a real app, check DB and hash passwords
    
    if request.username:
        token = str(uuid.uuid4())
        return {
            "success": True, 
            "token": token, 
            "username": request.username,
            "message": f"Welcome back, {request.role}!"
        }
    
    raise HTTPException(status_code=401, detail="Invalid credentials")
