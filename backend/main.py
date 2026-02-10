from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
try:
    from .routes import auth, assessment, hr
except ImportError:
    try:
        from backend.routes import auth, assessment, hr
    except ImportError:
        from routes import auth, assessment, hr

app = FastAPI(title="Inclusive Skill Assessment API")

# Ensure DB tables exist on startup
@app.on_event("startup")
def on_startup():
    try:
        from .database import engine, Base
        from . import models_db
        Base.metadata.create_all(bind=engine)
    except ImportError:
        from database import engine, Base
        import models_db
        Base.metadata.create_all(bind=engine)

# CORS for Frontend access
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "https://trueskilldagangera-7rkgg1pnq-marcben-james-samuel-ss-projects.vercel.app",
        "https://trueskill-frontend.vercel.app",
        "*"
    ],
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
