# Task List: Inclusive Skill Evaluation Platform (Hackathon MVP)

- [ ] **Initialization**
    - [x] Create project directory structure (`backend`, `frontend`, `docs`) <!-- id: 0 -->
    - [x] Create `README.md` with High-Level Architecture and Data Flow <!-- id: 1 -->

- [ ] **Backend (FastAPI)**
    - [x] `requirements.txt` <!-- id: 2 -->
    - [x] `main.py` (App entry, CORS, key routes) <!-- id: 3 -->
    - [x] `models.py` (Pydantic models for Student, HR, Assessment) <!-- id: 4 -->
    - [x] `ai_service.py` (Prompt engineering logic & mock response generation) <!-- id: 5 -->
    - [x] `routes/auth.py` (Simple mock auth) <!-- id: 6 -->
    - [x] `routes/assessment.py` (Question generation & submission) <!-- id: 7 -->
    - [x] `routes/hr.py` (Resume parsing mock & analytics) <!-- id: 8 -->

- [x] **AI Logic & Prompts**
    - [x] Define Question Generation Prompt <!-- id: 9 -->
    - [x] Define Answer Evaluation Prompt <!-- id: 10 -->
    - [x] Define Scoring/Aggregation Logic <!-- id: 11 -->
    - [x] Document Example Input/Output JSON in `docs/ai_examples.md` <!-- id: 12 -->

- [ ] **Frontend (Next.js)**
    - [ ] *Note: We will create key files to be placed in a standard Next.js app structure.*
    - [x] `package.json` (dependencies) <!-- id: 13 -->
    - [x] `app/layout.tsx` (Root layout) <!-- id: 14 -->
    - [x] `app/page.tsx` (Landing/Login) <!-- id: 15 -->
    - [x] `app/dashboard/page.tsx` (Student Dashboard) <!-- id: 16 -->
    - [x] `app/assessment/page.tsx` (Assessment Interface with Accessibility Controls) <!-- id: 17 -->
    - [x] `app/report/page.tsx` (Results with Radar Chart) <!-- id: 18 -->
    - [x] `app/hr/page.tsx` (HR Dashboard) <!-- id: 19 -->
    - [x] `components/IntegrityGuard.tsx` (Anti-cheat logic) <!-- id: 20 -->

- [x] **Documentation & Scripts**
    - [x] `docs/integrity_logic.md` (Explanation of JS logic) <!-- id: 21 -->
    - [x] `docs/demo_script.md` (Step-by-step click path) <!-- id: 22 -->
    - [x] `docs/judge_pitch.md` (60-90s pitch) <!-- id: 23 -->
    - [x] `docs/limitations_roadmap.md` (Future scope) <!-- id: 24 -->

- [x] **Final Review**
    - [x] Verify all requirements from prompt are met <!-- id: 25 -->
