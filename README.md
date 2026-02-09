# Inclusive Skill Evaluation Platform (Hackathon MVP)

## 1. High-Level Architecture

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
              | - Question Gen      |
              | - Answer Eval       |
              | - Skill Extraction  |
              +---------------------+
                        |
              +---------------------+
              |   In-Memory DB      |
              | (Fast & Simple)     |
              +---------------------+
```

## 2. Data Flow
1.  **Student Login** -> Authenticates (Mock) -> Receives Token.
2.  **Assessment Start** -> Request Questions (Domain/Level) -> AI Generates 6 Qs -> Returns JSON.
3.  **Assessment Submit** -> Sends Answers -> AI Evaluates -> Returns Scores & Feedback.
4.  **HR Login** -> Authenticates (Mock).
5.  **Resume Upload** -> Sends Text -> AI Extracts Skills -> Returns Skill List.
6.  **Reporting** -> Frontend visualizes scores (Radar Chart).

## 3. Tech Stack
-   **Frontend**: Next.js 14, standard CSS/Components.
-   **Backend**: FastAPI, Pydantic.
-   **AI**: Prompt Engineering logic (simulated for hackathon/offline demo).
-   **Storage**: In-memory dictionaries (reset on restart).
