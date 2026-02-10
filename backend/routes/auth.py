from fastapi import APIRouter, HTTPException, status, Depends
from sqlalchemy.orm import Session
try:
    from backend.models import UserCreate, User as PydanticUser, Token, LoginRequest, LoginResponse, ProfileUpdate
    from backend.models_db import User as DBUser
    from backend.auth.security import get_password_hash, verify_password
    from backend.auth.jwt_handler import create_access_token
    from backend.dependencies import get_current_active_user, get_db
except ImportError:
    from models import UserCreate, User as PydanticUser, Token, LoginRequest, LoginResponse, ProfileUpdate
    from models_db import User as DBUser
    from auth.security import get_password_hash, verify_password
    from auth.jwt_handler import create_access_token
    from dependencies import get_current_active_user, get_db
from datetime import timedelta

router = APIRouter()

@router.post("/register", response_model=PydanticUser)
async def register(user: UserCreate, db: Session = Depends(get_db)):
    db_user = db.query(DBUser).filter(DBUser.email == user.email).first()
    if db_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    
    hashed_password = get_password_hash(user.password)
    new_user = DBUser(
        email=user.email,
        hashed_password=hashed_password,
        role=user.role,
        full_name=user.full_name,
        domain=user.domain,
        experience=user.experience,
        skills=user.skills,
        accessibility_needs=user.accessibility_needs
    )
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    
    return PydanticUser(
        email=new_user.email,
        role=new_user.role,
        full_name=new_user.full_name,
        domain=new_user.domain,
        experience=new_user.experience,
        skills=new_user.skills,
        accessibility_needs=new_user.accessibility_needs
    )

@router.post("/login", response_model=LoginResponse)
async def login(form_data: LoginRequest, db: Session = Depends(get_db)):
    user = db.query(DBUser).filter(DBUser.email == form_data.email).first()
    if not user or not verify_password(form_data.password, user.hashed_password):
        raise HTTPException(status_code=400, detail="Incorrect email or password")
    
    access_token_expires = timedelta(minutes=30)
    access_token = create_access_token(
        data={"sub": user.email, "role": user.role},
        expires_delta=access_token_expires
    )
    
    return {
        "access_token": access_token, 
        "token_type": "bearer",
        "user": PydanticUser(
            email=user.email,
            role=user.role,
            full_name=user.full_name,
            domain=user.domain,
            experience=user.experience,
            skills=user.skills,
            accessibility_needs=user.accessibility_needs
        )
    }

@router.get("/me", response_model=PydanticUser)
async def read_users_me(current_user: DBUser = Depends(get_current_active_user)):
    # Convert DB model to Pydantic model
    return PydanticUser(
        email=current_user.email,
        role=current_user.role,
        full_name=current_user.full_name,
        domain=current_user.domain,
        experience=current_user.experience,
        skills=current_user.skills,
        accessibility_needs=current_user.accessibility_needs
    )

@router.put("/profile/update", response_model=PydanticUser)
async def update_profile(
    profile_data: ProfileUpdate, 
    current_user: DBUser = Depends(get_current_active_user),
    db: Session = Depends(get_db)
):
    current_user.full_name = profile_data.full_name
    current_user.domain = profile_data.domain
    current_user.experience = profile_data.experience
    current_user.skills = profile_data.skills
    current_user.accessibility_needs = profile_data.accessibility_needs
    
    db.commit()
    db.refresh(current_user)
    
    return PydanticUser(
        email=current_user.email,
        role=current_user.role,
        full_name=current_user.full_name,
        domain=current_user.domain,
        experience=current_user.experience,
        skills=current_user.skills,
        accessibility_needs=current_user.accessibility_needs
    )
