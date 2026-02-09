# Implementation Plan - Inclusive Skill Evaluation Platform (Hackathon MVP)

## Goal Description
Build a coherent, hackathon-ready 'Inclusive Skill Evaluation Platform' that uses AI to assess candidates fairly, focusing on reasoning over memorization and providing specific features for accessibility (neurodiversity, visual impairment).

## Proposed Changes

### Structure
The project will be split into two main directories: `backend` (FastAPI) and `frontend` (Next.js), plus a `docs` folder for the pitch and scripts.

### Backend (FastAPI)
- **Framework**: FastAPI for speed and easy JSON handling.
- **Database**: In-memory (Python `dict`) or SQLite for valid hackathon persistence without overhead.
- **AI Service**: Since we cannot make real API calls to OpenAI/Gemini in this environment easily without keys, we will implement the *logic* and *prompts* in `ai_service.py` and provide a "mock mode" toggle or functional prompt strings that the user can plug their key into.
- **Endpoints**:
    - `POST /login`: Mock auth.
    - `POST /assessment/generate`: Generates 6 questions based on domain/level.
    - `POST /assessment/submit`: Evaluates answers, returns scores.
    - `POST /hr/parse_resume`: Extracts skills from text.

### Frontend (Next.js)
- **Framework**: Next.js 14+ (App Router).
- **Styling**: Tailwind CSS (assumed per user workflow, or plain CSS if strictly requested, but Tailwind is standard for hackathon velocity). *Correction: User rules say "Avoid using TailwindCSS unless the USER explicitly requests it". I will use Vanilla CSS / Modules to stay strict, or standard inline styles for simplicity.*
- **State Management**: React `useState` / `Context`.
- **Accessibility**:
    - **TTS**: `window.speechSynthesis`.
    - **Cognitive Load**: Toggle to hide decorative elements, simplified font.
- **Charts**: `chart.js` or `recharts` for the Radar chart.

### AI Assessment Engine
- **Prompts**: structured JSON output prompts relative to "Bloom's Taxonomy" or similar logic tasks.
- **Scoring**: Weighted average of the 5 key skills.

### Integrity
- `useEffect` listeners for `blur` (tab switch) and `copy`/`paste` events.

## Verification Plan
### Automated Tests
- None (Hackathon MVP).

### Manual Verification
- **Run Backend**: `uvicorn main:app --reload`
- **Run Frontend**: `npm run dev`
- **Test Flow**:
    1. Login as Student -> Select "React", "Beginner".
    2. Verify 6 questions appear.
    3. Toggle "Text-to-Speech" -> Verify audio.
    4. Submit answers -> Verify Radar Chart appears.
    5. Login as HR -> Upload resume text -> Verify skills extracted.

