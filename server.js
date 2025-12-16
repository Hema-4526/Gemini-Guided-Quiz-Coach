import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import crypto from "crypto";
import { GoogleGenerativeAI } from "@google/generative-ai";

dotenv.config();

const app = express();
const PORT = 3000;

// ---------- Middleware ----------
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

// ---------- Gemini Setup ----------
if (!process.env.GEMINI_API_KEY) {
  console.error("❌ GEMINI_API_KEY missing in .env file");
  process.exit(1);
}

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({
  model: "gemini-2.5-flash",
});

// ---------- Simple In-Memory Cache ----------
const questionCache = {};

// ---------- Helper: Safe JSON Extract ----------
function extractJSON(text) {
  const start = text.indexOf("{");
  const end = text.lastIndexOf("}") + 1;

  if (start === -1 || end === -1) {
    throw new Error("No valid JSON found in Gemini response");
  }

  return JSON.parse(text.substring(start, end));
}

// ---------- Route: Generate Questions ----------
app.post("/generate-questions", async (req, res) => {
  try {
    const { text } = req.body;

    if (!text || text.trim().length < 50) {
      return res.status(400).json({
        error: "Please provide at least 50 characters of study material.",
      });
    }

    // Hash text for caching
    const hash = crypto.createHash("sha256").update(text).digest("hex");

    if (questionCache[hash]) {
      console.log("📦 Returning cached questions");
      return res.json(questionCache[hash]);
    }

    const prompt = `
You are a teaching assistant.

Read the study material below and generate EXACTLY 5 challenging questions
that test conceptual understanding, application, and analysis.

Respond ONLY with valid JSON in this exact schema:

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

Study Material:
"""${text}"""
`;

    const result = await model.generateContent(prompt);
    const responseText = result.response.text();

    const json = extractJSON(responseText);

    questionCache[hash] = json;

    res.json(json);
  } catch (error) {
    console.error("❌ Gemini Question Generation Error:", error.message);
    res.status(500).json({
      error: "Failed to generate questions using Gemini.",
    });
  }
});

// ---------- Route: Evaluate Answer ----------
app.post("/evaluate-answer", async (req, res) => {
  try {
    const { question, answer, contextText } = req.body;

    if (!question || !answer || !contextText) {
      return res.status(400).json({
        error: "Missing question, answer, or context text.",
      });
    }

    const prompt = `
You are an expert tutor.

Given the study material, question, and student's answer,
evaluate the answer honestly and provide constructive feedback.

Respond ONLY with valid JSON in this exact schema:

{
  "score": 0,
  "outOf": 10,
  "strengths": ["string"],
  "areasToImprove": ["string"],
  "nextStepSuggestion": "string"
}

Study Material:
"""${contextText}"""

Question:
"""${question}"""

Student Answer:
"""${answer}"""
`;

    const result = await model.generateContent(prompt);
    const responseText = result.response.text();

    const json = extractJSON(responseText);

    res.json(json);
  } catch (error) {
    console.error("❌ Gemini Evaluation Error:", error.message);
    res.status(500).json({
      error: "Failed to evaluate answer using Gemini.",
    });
  }
});

// ---------- Start Server ----------
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
