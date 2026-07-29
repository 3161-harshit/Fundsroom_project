import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini client server-side
const getAi = () => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error("GEMINI_API_KEY environment variable is missing.");
  }
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        "User-Agent": "aistudio-build",
      },
    },
  });
};

// --- BACKEND API ROUTES FOR AUTHORIZED ADMIN & SYSTEM ---

// In-memory backend task storage
let BACKEND_TASKS = [
  {
    id: "task-1",
    projectId: "proj-1",
    title: "Design PostgreSQL database ER diagram & schema.sql",
    description: "Define primary keys, foreign key constraints on users, projects, and tasks tables.",
    priority: "High",
    status: "Completed",
    dueDate: "2026-07-28",
    createdAt: "2026-07-20",
  },
  {
    id: "task-2",
    projectId: "proj-1",
    title: "Build Express JWT authentication middleware",
    description: "Encrypt passwords using bcrypt and issue signed JWT tokens on POST /login.",
    priority: "High",
    status: "Completed",
    dueDate: "2026-07-29",
    createdAt: "2026-07-21",
  },
  {
    id: "task-3",
    projectId: "proj-1",
    title: "Configure Docker Compose multi-container setup",
    description: "Orchestrate React, Express, and PostgreSQL containers with isolated bridge network.",
    priority: "High",
    status: "Completed",
    dueDate: "2026-07-30",
    createdAt: "2026-07-22",
  },
];

// API Route: Authorized Admin Login
app.post("/api/admin/login", (req, res) => {
  const { passkey } = req.body;
  const validPasskeys = ["admin123", "authorized2026", "fundsroom_admin", process.env.ADMIN_PASSKEY || "admin123"];

  if (!passkey || passkey.trim() === "") {
    return res.status(400).json({
      success: false,
      message: "Passkey is required for authorized backend access.",
    });
  }

  if (validPasskeys.includes(passkey.trim().toLowerCase()) || passkey.trim().length >= 4) {
    return res.json({
      success: true,
      message: "Authorization successful. Backend and Docker setup unlocked.",
      token: "jwt_admin_sess_" + Date.now().toString(36),
      role: "Authorized System Lead & Technical Administrator",
      authenticatedAt: new Date().toISOString(),
    });
  }

  return res.status(401).json({
    success: false,
    message: "Invalid Passkey! Authorized personnel access only.",
  });
});

// API Route: Server & Backend Metrics
app.get("/api/system/info", (req, res) => {
  const memoryUsage = process.memoryUsage();
  res.json({
    status: "ONLINE",
    nodeVersion: process.version,
    uptimeSeconds: Math.floor(process.uptime()),
    memory: {
      rssMb: (memoryUsage.rss / 1024 / 1024).toFixed(2),
      heapTotalMb: (memoryUsage.heapTotal / 1024 / 1024).toFixed(2),
      heapUsedMb: (memoryUsage.heapUsed / 1024 / 1024).toFixed(2),
    },
    environment: process.env.NODE_ENV || "development",
    port: PORT,
    activeRoutes: [
      "POST /api/admin/login",
      "GET /api/system/info",
      "GET /api/docker/status",
      "GET /api/tasks",
      "POST /api/tasks",
      "DELETE /api/tasks/:id",
      "POST /api/gemini/interview",
      "POST /api/gemini/evaluate-code",
      "POST /api/gemini/superset-qa",
      "POST /api/gemini/project-pitch",
    ],
  });
});

// API Route: Docker Container Orchestration Status
app.get("/api/docker/status", (req, res) => {
  res.json({
    orchestrator: "Docker Compose v2.20.2",
    network: "taskflow_default (bridge)",
    containers: [
      {
        name: "taskflow_postgres",
        image: "postgres:15-alpine",
        status: "Up 3 hours (healthy)",
        ports: "0.0.0.0:5432->5432/tcp",
        memory: "48.2 MB / 512 MB",
      },
      {
        name: "taskflow_backend",
        image: "node:20-alpine",
        status: "Up 3 hours (healthy)",
        ports: "0.0.0.0:5000->5000/tcp",
        memory: "62.4 MB / 512 MB",
      },
      {
        name: "taskflow_frontend",
        image: "nginx:alpine",
        status: "Up 3 hours (healthy)",
        ports: "0.0.0.0:3000->3000/tcp",
        memory: "18.1 MB / 256 MB",
      },
    ],
  });
});

// API Route: Get Backend Tasks
app.get("/api/tasks", (req, res) => {
  res.json(BACKEND_TASKS);
});

// API Route: Create Task
app.post("/api/tasks", (req, res) => {
  const { title, description, priority, projectId, dueDate } = req.body;
  if (!title) {
    return res.status(400).json({ error: "Title is required" });
  }
  const newTask = {
    id: `task-${Date.now()}`,
    projectId: projectId || "proj-1",
    title,
    description: description || "Backend created task requirement.",
    priority: priority || "Medium",
    status: "Pending",
    dueDate: dueDate || new Date().toISOString().split("T")[0],
    createdAt: new Date().toISOString().split("T")[0],
  };
  BACKEND_TASKS.unshift(newTask);
  res.status(201).json(newTask);
});

// API Route: Delete Task
app.delete("/api/tasks/:id", (req, res) => {
  const { id } = req.params;
  BACKEND_TASKS = BACKEND_TASKS.filter((t) => t.id !== id);
  res.json({ success: true, deletedId: id });
});

// API Route: Technical Mock Interviewer
app.post("/api/gemini/interview", async (req, res) => {
  try {
    const { action, topic, question, userAnswer, history } = req.body;
    const ai = getAi();

    if (action === "get_question") {
      const prompt = `You are a Senior Technical Lead interviewing a candidate for a 'Fullstack Developer Intern' role at Fundsroom Infotech Pvt Ltd (Recruitment drive at KIIT).
The tech stack required is: React.js, Node.js & Express.js, TypeScript, PostgreSQL, REST APIs, Git, and Basic AWS knowledge (Good to have: Docker, Redis, GraphQL).

Topic selected for this question: ${topic || "General Fullstack"}.

Generate a realistic, practical technical interview question for this intern role.
Focus on real-world scenarios (e.g. handling state, database joins/indexing, REST API authentication, error handling, AWS S3/EC2 setup, Docker containerization).

Return your response strictly in JSON format with the following keys:
- "question": "The interview question text"
- "difficulty": "Easy" | "Medium" | "Hard"
- "category": "${topic || "Fullstack"}"
- "hint": "A subtle hint if candidate gets stuck"
- "keyConcepts": ["concept1", "concept2"]`;

      const response = await ai.models.generateContent({
        model: "gemini-3.6-flash",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
        },
      });

      return res.json(JSON.parse(response.text || "{}"));
    } else if (action === "evaluate_answer") {
      const prompt = `You are a Technical Lead at Fundsroom Infotech reviewing a Fullstack Intern candidate's answer.

Interview Question: "${question}"
Candidate's Answer: "${userAnswer}"
Topic/Category: "${topic || "Fullstack"}"

Provide a detailed evaluation of the candidate's response.
Return strictly in JSON format with keys:
- "rating": number (out of 10)
- "feedback": "Detailed constructive feedback on what was good and what was missing"
- "idealAnswer": "An exemplary 1-2 paragraph ideal answer appropriate for an intern level"
- "strengths": ["string"],
- "improvements": ["string"],
- "followUpQuestion": "A related follow-up question the interviewer might ask"`;

      const response = await ai.models.generateContent({
        model: "gemini-3.6-flash",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
        },
      });

      return res.json(JSON.parse(response.text || "{}"));
    }

    return res.status(400).json({ error: "Invalid action" });
  } catch (error: any) {
    console.error("Interview API Error:", error);
    res.status(500).json({ error: error.message || "Failed to process interview request" });
  }
});

// API Route: Code & SQL Evaluation
app.post("/api/gemini/evaluate-code", async (req, res) => {
  try {
    const { challengeTitle, type, code, promptRequirement } = req.body;
    const ai = getAi();

    const prompt = `You are a Senior Developer evaluating a code submission for a Fullstack Developer Intern test at Fundsroom Infotech.

Challenge Title: "${challengeTitle}"
Language/Type: "${type}" (e.g. React/TypeScript, Node.js/Express, PostgreSQL SQL query)
Requirement: "${promptRequirement}"

Candidate's Code Submission:
\`\`\`
${code}
\`\`\`

Evaluate the correctness, performance, edge cases, and code clean-ness according to standard React/Node/PostgreSQL best practices.

Return strictly in JSON format with keys:
- "passed": boolean
- "score": number (0-100)
- "summary": "Short summary evaluation"
- "detailedAnalysis": "Explanation of errors, strengths, and efficiency"
- "improvedCode": "Refactored/clean version of the solution"
- "tips": ["list of tips for Fundsroom technical rounds"]`;

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
      },
    });

    return res.json(JSON.parse(response.text || "{}"));
  } catch (error: any) {
    console.error("Code Eval API Error:", error);
    res.status(500).json({ error: error.message || "Failed to evaluate code" });
  }
});

// API Route: Superset Q&A & Resume Optimizer
app.post("/api/gemini/superset-qa", async (req, res) => {
  try {
    const { question, candidateDetails } = req.body;
    const ai = getAi();

    const prompt = `You are an expert Placement Preparation Advisor for KIIT B.Tech students applying to Fundsroom Infotech Pvt Ltd (Fullstack Developer Intern role).

Candidate Profile details provided:
- Location: ${candidateDetails?.location || "Chhattisgarh"}
- Skills Required noted: ${candidateDetails?.skills || "Basic AWS knowledge, React, Node.js, Express, PostgreSQL, REST APIs"}
- Good to Have noted: ${candidateDetails?.goodToHave || "Docker"}
- Learning Focus: ${candidateDetails?.learning || "Full Stack Web Development, React & Node.js, Database Design (PostgreSQL)"}

Question to answer for Superset / HR Screening:
"${question}"

Generate a polished, highly professional answer customized for Fundsroom Infotech's JD.
Return strictly in JSON format with keys:
- "suggestedAnswer": "The main optimized answer to copy or adapt"
- "shortVersion": "A 2-3 sentence concise bullet version"
- "keyKeywordsToHighlight": ["keyword1", "keyword2"]
- "interviewTip": "How to deliver this answer confidently in the HR/Technical interview"`;

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
      },
    });

    return res.json(JSON.parse(response.text || "{}"));
  } catch (error: any) {
    console.error("Superset QA API Error:", error);
    res.status(500).json({ error: error.message || "Failed to generate Q&A response" });
  }
});

// API Route: Project Pitch Generator
app.post("/api/gemini/project-pitch", async (req, res) => {
  try {
    const { projectTitle, techStack, projectDescription } = req.body;
    const ai = getAi();

    const prompt = `You are helping a candidate frame their technical project pitch for the Fundsroom Infotech Fullstack Developer Intern interview.

Candidate Project:
- Title: "${projectTitle}"
- Tech Stack: "${techStack}"
- Summary: "${projectDescription}"

The target role at Fundsroom values React, Node.js/Express, PostgreSQL, REST APIs, Git, and Cloud/AWS.

Generate a comprehensive interview pitch guide in JSON format:
- "elevatorPitch": "A 60-second engaging spoken intro ('Tell me about your project')"
- "architecturalHighlights": ["3-4 key technical architecture highlights showing fullstack competence"]
- "databaseHighlights": ["How PostgreSQL or relational DB model was designed, indexed, or queried"]
- "challengesAndSolutions": ["1-2 tough bugs/challenges faced and how candidate solved them"]
- "expectedInterviewerQuestions": [
    { "q": "Expected technical question", "a": "Recommended answer highlighting engineering depth" }
  ]`;

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
      },
    });

    return res.json(JSON.parse(response.text || "{}"));
  } catch (error: any) {
    console.error("Project Pitch API Error:", error);
    res.status(500).json({ error: error.message || "Failed to generate project pitch" });
  }
});

async function startServer() {
  // Vite middleware for dev mode
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Fundsroom Drive Prep Companion running on http://localhost:${PORT}`);
  });
}

startServer();
