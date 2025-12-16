# Gemini-Guided-Quiz-Coach

## 🚀 Overview
**Gemini-Guided-Quiz-Coach** is a Dynamic Learning Summary Tool powered by the **Google Gemini API**.  
It transforms long study notes into **challenging questions** and provides **personalized, tutor-like feedback** on student answers.

This project was built for **The Gemini Blitz Hackathon** and aligns with  
**Theme 2: Reasoning and Personalized Experience**.

---

## 🎯 Problem Statement
Students often study from lengthy lecture notes or textbooks but struggle to identify:
- What questions to practice
- Whether their understanding is correct
- How to improve without a human tutor

Traditional quizzes focus on recall rather than **conceptual understanding, application, and analysis**.

---

## 💡 Solution
Gemini-Guided-Quiz-Coach solves this by:
1. Analyzing pasted study material
2. Generating **5 deep, concept-driven questions**
3. Evaluating student answers using context-aware reasoning
4. Providing structured feedback with:
   - Score
   - Strengths
   - Areas to improve
   - Next-step learning suggestions

---

## 🧠 Key Features
- 📘 Paste study notes and auto-generate questions
- 📝 Answer any question interactively
- 📊 Get AI-powered evaluation and feedback
- 🧠 Context-aware reasoning using Gemini
- ⚡ Free-tier optimized with minimal API calls

---

## 🛠️ Tech Stack
- **Backend:** Node.js, Express
- **Frontend:** HTML, CSS, JavaScript
- **AI Model:** Google Gemini API (`gemini-2.5-flash`)
- **Caching:** In-memory caching to reduce API usage

---

## 🧩 Architecture
Frontend (HTML/JS)
↓
Express Backend (Node.js)
↓
Google Gemini API (gemini-2.5-flash)

yaml
Copy code

---

## 🔗 Gemini API Integration

### 1️⃣ Generate Questions Endpoint
**POST** `/generate-questions`

**Purpose:**  
Generates 5 challenging questions from study material.

**JSON Output Schema:**
```json
{
  "questions": [
    {
      "id": 1,
      "question": "string",
      "difficulty": "easy | medium | hard",
      "skill": "concept_understanding | application | analysis"
    }
  ]
}
2️⃣ Evaluate Answer Endpoint
POST /evaluate-answer

Purpose:
Evaluates a student’s answer using full contextual understanding.

JSON Output Schema:

json
Copy code
{
  "score": 0,
  "outOf": 10,
  "strengths": ["string"],
  "areasToImprove": ["string"],
  "nextStepSuggestion": "string"
}
🧪 Prompt Engineering Strategy
Strict system instructions to return only valid JSON

Context passed includes:

Full study material

Selected question

Student’s answer

Robust JSON extraction ensures reliability even with verbose LLM responses

⚡ Free-Tier Optimization
Uses gemini-2.5-flash for higher request limits

Only 2 Gemini API calls per learning session

In-memory caching avoids repeated calls for the same content

🧑‍💻 Setup Instructions
1️⃣ Clone the Repository
bash
Copy code
git clone https://github.com/Hema-4526/Gemini-Guided-Quiz-Coach.git
cd Gemini-Guided-Quiz-Coach
2️⃣ Install Dependencies
bash
Copy code
npm install
3️⃣ Create Environment File
Create a .env file in the root directory:

ini
Copy code
GEMINI_API_KEY=your_actual_api_key_here
⚠️ Do not commit .env to GitHub.

4️⃣ Start the Application
bash
Copy code
node server.js
5️⃣ Open in Browser
arduino
Copy code
http://localhost:3000
🎓 Use Case Example
Paste lecture notes on recursion

Generate 5 conceptual questions

Answer one question

Receive detailed feedback with improvement suggestions

📈 Future Enhancements
Multi-question evaluation per session

Learning progress tracking

Topic-wise recommendations

User authentication and dashboards

🏁 Conclusion
Gemini-Guided-Quiz-Coach demonstrates how Gemini’s reasoning and context management can power personalized education tools with minimal API usage.
It transforms passive reading into active, feedback-driven learning.
