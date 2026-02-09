# Inclusive Skill Evaluation Platform (Hackathon MVP)

**An Adaptive, Accessibility-First AI Assessment System.**

## 1. Problem & Solution
**The Problem:** Traditional coding tests are biased. They focus on syntax memorization, filtering out neurodiverse candidates and those from non-traditional backgrounds.
**Our Solution:** A platform that evaluates *reasoning* and *potential*, not just code.
-   **Adaptive:** Questions adjust to the candidate's level.
-   **Accessible:** Built-in Text-to-Speech, simplified UI modes, and high-contrast support.
-   **Holistic:** AI analysis of communication, critical thinking, and problem-solving.

---

## 2. Quick Start

### Prerequisites
-   Node.js 18+
-   Python 3.10+
-   Git

### Installation
1.  **Clone the repository:**
    ```bash
    git clone <repo-url>
    cd inclusive-skill-assessment
    ```

2.  **Backend Setup:**
    ```bash
    cd backend
    pip install -r requirements.txt
    python -m uvicorn main:app --host 127.0.0.1 --port 8000 --reload
    ```

3.  **Frontend Setup:**
    ```bash
    cd frontend
    npm install
    npm run dev
    ```
    Visit `http://localhost:3000`

---

## 3. Key Features
-   **AI-Powered Questioning:** Generates scenario-based questions (e.g., "Why use a specialized algorithm here?") rather than "Reverse this binary tree".
-   **Integrity Guard:** Lightweight, privacy-respecting anti-cheat (detects tab switching/copy-paste) without intrusive surveillance.
-   **Resume Parsing:** HR can upload resumes to auto-generate relevant assessments.
-   **Skill Radar:** Visualizes candidate strengths across 5 dimensions (Logic, Code, Communication, etc.).

---

## 4. Architecture
```ascii
[ Student / Candidate ]       [ HR / Recruiter ]
        |                             |
   (Web Interface)               (Web Interface)
        |                             |
+-------------------------------------------------+
|                 Next.js Frontend                |
|  (Auth, Dashboard, Assessment, Reports, Admin)  |
+-------------------------------------------------+
        |                             |
   (REST API)                    (REST API)
        |                             |
+-------------------------------------------------+
|                 FastAPI Backend                 |
|      (Auth, Assessment Logic, Resume Parsing)   |
+-----------------------+-------------------------+
                        |
              +---------------------+
              | AI Logic (Simulated)|
              +---------------------+
                        |
              +---------------------+
              |   In-Memory DB      |
              +---------------------+
```

---

## 5. Usage Guide

### Student Journey
1.  **Register/Login:** Create an account (Role: Student).
2.  **Dashboard:** Select a domain (e.g., React, Python) and difficulty.
3.  **Assessment:** Answer AI-generated questions. Use the "Accessibility" toggle for Focus Mode.
4.  **Report:** View your detailed skill breakdown and AI feedback.

### Recruiter Journey
1.  **Login:** Use an HR account (Role: HR).
2.  **Resume Upload:** Paste resume text to extract skills.
3.  **Candidate View:** See a leaderboard of candidates ranked by potential, not just score.

---

## 6. AI Logic & Integrity

### AI Examples
**Question Generation:**
Input: `{"domain": "React", "level": "Intermediate"}`
Output: Scenario-based question testing *critical thinking*.

**Answer Evaluation:**
Input: Candidate answer text.
Output: Score (0-100) + Constructive Feedback + Skill Impact.

### Integrity Mechanisms
-   **Visibility Detection:** Warns user if they switch tabs.
-   **Clipboard Blocking:** Prevents copying questions or pasting answers.

---

## 7. Troubleshooting

**Common Issues:**
-   **"Failed to Fetch"**: Ensure Backend is running on port 8000. Check if you are using `127.0.0.1` vs `localhost`.
-   **Login Loop**: Clear browser cookies/storage. We use `SameSite=Lax` for local dev.
-   **Missing Styles**: Run `npm run dev` in frontend to regenerate Tailwind CSS.

---

## 8. Roadmap & Limitations (Hackathon MVP)
-   **Mock AI:** AI responses are currently deterministic/mocked for demo stability and speed.
-   **Persistence:** Data resets when the backend restarts (In-Memory DB).
-   **Future:** Real LLM integration (GPT-4/Gemini), WebRTC Proctoring, Code Execution Sandbox.
