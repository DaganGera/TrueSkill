from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .routes import auth, assessment, hr

app = FastAPI(title="Inclusive Skill Assessment API")

# CORS for Frontend access
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # For hackathon demo, allow all
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include Routes
app.include_router(auth.router, prefix="/auth", tags=["Auth"])
app.include_router(assessment.router, prefix="/assessment", tags=["Assessment"])
app.include_router(hr.router, prefix="/hr", tags=["HR"])

@app.get("/")
async def root():
    return {"message": "Inclusive AI Skill Assessment API is running"}
