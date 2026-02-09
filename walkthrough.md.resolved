# Inclusive Skill Evaluation Platform - Walkthrough

## Overview
This platform is a hackathon MVP designed to assess skills fairly using AI. It evaluates reasoning over memorization and includes accessibility features.

## Architecture
-   **Backend:** FastAPI (Python) - Handles logic, mock AI service, and API endpoints.
-   **Frontend:** Next.js (React) - Responsive UI, accessibility tools, and integrity guards.
-   **AI Logic:** Simulated prompt engineering for reliable hackathon demos.

## Folder Structure
```
.
├── backend/
│   ├── main.py
│   ├── models.py
│   ├── ai_service.py
│   └── routes/
├── frontend/
│   ├── app/
│   ├── components/
│   └── package.json
└── docs/
    ├── demo_script.md
    └── judge_pitch.md
```

## How to Run (Localhost)

### 1. Start Backend
```bash
cd backend
# Install dependencies (ensure python is installed)
pip install -r requirements.txt
# Run Server
uvicorn main:app --reload --port 8000
```

### 2. Start Frontend
```bash
cd frontend
# Install dependencies
npm install
# Run Dev Server
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

## Key Features to Demo
1.  **Student Login:** Use any username.
2.  **Assessment:** Select "React" -> "Intermediate".
3.  **Accessibility:** Toggle "Simplify UI" and click "Listen" on questions.
4.  **Integrity:** Try switching tabs to trigger the guard.
5.  **Results:** Submit to see the Radar Chart.
6.  **HR Dashboard:** Login as HR, paste a resume text, and see the skill extraction.

## Documentation
-   [Judge Pitch](docs/judge_pitch.md)
-   [Demo Script](docs/demo_script.md)
-   [Integrity Logic](docs/integrity_logic.md)
