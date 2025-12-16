# Gemini-Guided-Quiz-Coach

## Description
Dynamic Learning Summary Tool using Google Gemini API. Generates 5 questions from notes and evaluates student answers with structured feedback.

## Tech Stack
- Node.js + Express
- Simple frontend (HTML/JS)
- Gemini API (gemini-2.5-flash)

## Setup
1. Clone repo: `git clone https://github.com/Hema-4526/Gemini-Guided-Quiz-Coach.git`
2. `npm install`
3. Create `.env` with:
GEMINI_API_KEY=your_actual_api_key_here
4. `npm start`
5. Open browser: `http://localhost:3000`

## Gemini Integration
- `/generate-questions` → Generates 5 questions from notes (JSON schema enforced)
- `/evaluate-answer` → Evaluates answer and returns score, strengths, areas to improve, next step (JSON schema)
- Uses **gemini-2.5-flash** for free-tier optimization
- In-memory caching to reduce repeated API calls
