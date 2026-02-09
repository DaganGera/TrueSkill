from fastapi import APIRouter, HTTPException, status, Depends
from backend.models import UserCreate, User, Token, LoginRequest, LoginResponse
from backend.auth.security import get_password_hash, verify_password
from backend.auth.jwt_handler import create_access_token
from backend.db import users_db
from backend.dependencies import get_current_active_user
from datetime import timedelta

router = APIRouter()

@router.post("/register", response_model=User)
async def register(user: UserCreate):
    if user.email in users_db:
        raise HTTPException(status_code=400, detail="Email already registered")
    
    hashed_password = get_password_hash(user.password)
    user_data = user.dict()
    user_data.pop("password")
    user_data["hashed_password"] = hashed_password
    
    users_db[user.email] = user_data
    return user_data

@router.post("/login", response_model=LoginResponse)
async def login(form_data: LoginRequest):
    user_dict = users_db.get(form_data.email)
    if not user_dict:
        raise HTTPException(status_code=400, detail="Incorrect email or password")
    
    if not verify_password(form_data.password, user_dict["hashed_password"]):
        raise HTTPException(status_code=400, detail="Incorrect email or password")
    
    access_token_expires = timedelta(minutes=30)
    access_token = create_access_token(
        data={"sub": user_dict["email"], "role": user_dict["role"]},
        expires_delta=access_token_expires
    )
    
    # Construct user object (excluding hashed_password safely via Pydantic response_model)
    user = User(**user_dict)
    
    return {
        "access_token": access_token, 
        "token_type": "bearer",
        "user": user
    }

@router.get("/me", response_model=User)
async def read_users_me(current_user: User = Depends(get_current_active_user)):
    return current_user
