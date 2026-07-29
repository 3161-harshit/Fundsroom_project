import React, { useState } from "react";
import {
  Presentation,
  Sparkles,
  Zap,
  CheckCircle2,
  Copy,
  Check,
  RefreshCw,
  Send,
  Database,
  HelpCircle,
} from "lucide-react";
import { motion } from "motion/react";

export const ProjectShowcase: React.FC = () => {
  const [projectTitle, setProjectTitle] = useState("TaskFlow – Team Task Management System");
  const [techStack, setTechStack] = useState(
    "React.js, Node.js, Express.js, PostgreSQL, REST APIs, Docker, JWT"
  );
  const [projectDescription, setProjectDescription] = useState(
    "A fullstack task management system for software engineering teams. Features user sign up & login with JWT, project creation, task management with priority levels, PostgreSQL relational schema with composite indexes, and Docker containerization."
  );

  const [generating, setGenerating] = useState(false);
  const [copiedSection, setCopiedSection] = useState<string | null>(null);

  const [pitchData, setPitchData] = useState<{
    elevatorPitch: string;
    architecturalHighlights: string[];
    databaseHighlights: string[];
    challengesAndSolutions: string[];
    expectedInterviewerQuestions: Array<{ q: string; a: string }>;
  } | null>({
    elevatorPitch:
      "For my internship project, I built TaskFlow — a complete team task management system using React, Express, PostgreSQL, and Docker. The app enables software teams to create projects, add and edit tasks with priority levels, and track task completion. I architected secure JWT authentication, structured normalized PostgreSQL tables for users, projects, and tasks with B-tree indexes, and packaged the entire stack into Docker containers for easy single-command setup.",
    architecturalHighlights: [
      "Separated React frontend (Vite) and Express backend API into a decoupled REST architecture.",
      "Implemented JWT authentication with bcrypt password encryption for secure user access.",
      "Configured multi-container Docker Compose setup for instant, consistent execution across environments.",
    ],
    databaseHighlights: [
      "Designed normalized PostgreSQL tables (users, projects, tasks) with cascading foreign keys.",
      "Created composite indexes on (status, priority) and foreign keys (project_id) to optimize JOIN latency.",
    ],
    challengesAndSolutions: [
      "Ensuring real-time progress tracking across projects; solved by optimizing SQL JOIN queries and maintaining consistent local state synchronization in React.",
    ],
    expectedInterviewerQuestions: [
      {
        q: "How does the request flow work from React to PostgreSQL in TaskFlow?",
        a: "The user interacts with the React frontend. React sends HTTP REST requests to the Express backend. Express authenticates the JWT token via middleware, executes SQL queries on PostgreSQL, and returns JSON responses back to update the React UI.",
      },
      {
        q: "Why did you containerize TaskFlow with Docker?",
        a: "Docker guarantees environment consistency between development and production. By defining docker-compose.yml, anyone can start the React UI, Express API, and PostgreSQL database with a single 'docker-compose up' command without installing dependencies manually.",
      },
    ],
  });

  const handleGeneratePitch = async () => {
    setGenerating(true);

    try {
      const res = await fetch("/api/gemini/project-pitch", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          projectTitle,
          techStack,
          projectDescription,
        }),
      });

      const data = await res.json();
      if (data && data.elevatorPitch) {
        setPitchData(data);
      }
    } catch (err) {
      console.error("Project pitch generation error:", err);
    } finally {
      setGenerating(false);
    }
  };

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSection(key);
    setTimeout(() => setCopiedSection(null), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 border border-amber-200 flex items-center justify-center">
                <Presentation className="w-5 h-5" />
              </div>
              <h2 className="text-xl font-bold text-slate-900">Project Interview Pitch Generator</h2>
            </div>
            <p className="text-xs text-slate-500 font-medium">
              Prepare 60-second interview pitches, architectural Talking Points, and PostgreSQL Q&A answers.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Project Form Input */}
        <div className="space-y-4">
          <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-4 shadow-xs">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
              <Zap className="w-4 h-4 text-amber-600" /> Project Details
            </h3>

            <div className="space-y-3 text-xs">
              <div>
                <label className="text-slate-700 font-semibold block mb-1">Project Title:</label>
                <input
                  type="text"
                  value={projectTitle}
                  onChange={(e) => setProjectTitle(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-slate-900 focus:outline-none focus:border-amber-500 font-medium"
                />
              </div>

              <div>
                <label className="text-slate-700 font-semibold block mb-1">Tech Stack Used:</label>
                <input
                  type="text"
                  value={techStack}
                  onChange={(e) => setTechStack(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-slate-900 focus:outline-none focus:border-amber-500 font-medium"
                />
              </div>

              <div>
                <label className="text-slate-700 font-semibold block mb-1">Key Features & Scope:</label>
                <textarea
                  rows={4}
                  value={projectDescription}
                  onChange={(e) => setProjectDescription(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-slate-900 focus:outline-none focus:border-amber-500 font-medium"
                />
              </div>

              <button
                id="btn-generate-pitch"
                onClick={handleGeneratePitch}
                disabled={generating || !projectTitle.trim()}
                className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-2.5 px-4 rounded-xl text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-xs"
              >
                {generating ? (
                  <>
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    Generating Pitch...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                    Generate Pitch & Talking Points
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Right 2 Columns: Pitch Results & Q&A */}
        <div className="lg:col-span-2 space-y-4">
          {pitchData && (
            <>
              {/* Elevator Pitch Card */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white border border-slate-200 rounded-2xl p-6 space-y-3 shadow-xs"
              >
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                    <Presentation className="w-4 h-4 text-amber-600" />
                    60-Second Interview Elevator Pitch
                  </h3>
                  <button
                    onClick={() => handleCopy(pitchData.elevatorPitch, "pitch")}
                    className="bg-slate-50 hover:bg-slate-100 text-slate-800 border border-slate-200 px-2.5 py-1 rounded-lg text-xs font-bold flex items-center gap-1 shadow-2xs"
                  >
                    {copiedSection === "pitch" ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600" /> Copied
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 text-amber-600" /> Copy
                      </>
                    )}
                  </button>
                </div>

                <p className="text-xs text-slate-800 leading-relaxed font-mono bg-slate-50 p-4 rounded-xl border border-slate-200">
                  "{pitchData.elevatorPitch}"
                </p>
              </motion.div>

              {/* Technical Highlights */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white border border-slate-200 rounded-2xl p-5 space-y-2.5 shadow-xs">
                  <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Architecture Highlights
                  </h4>
                  <ul className="space-y-1.5 text-xs text-slate-700 font-medium">
                    {pitchData.architecturalHighlights.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0 mt-1.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-white border border-slate-200 rounded-2xl p-5 space-y-2.5 shadow-xs">
                  <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                    <Database className="w-4 h-4 text-amber-600" /> Database & Indexing Highlights
                  </h4>
                  <ul className="space-y-1.5 text-xs text-slate-700 font-medium">
                    {pitchData.databaseHighlights.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0 mt-1.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Expected Questions */}
              {pitchData.expectedInterviewerQuestions && (
                <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-4 shadow-xs">
                  <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                    <HelpCircle className="w-4 h-4 text-amber-600" />
                    Likely Interview Questions & Answers
                  </h3>

                  <div className="space-y-3">
                    {pitchData.expectedInterviewerQuestions.map((qa, idx) => (
                      <div key={idx} className="bg-slate-50 border border-slate-200 p-4 rounded-xl space-y-2">
                        <h4 className="text-xs font-bold text-slate-900">Q: {qa.q}</h4>
                        <p className="text-xs text-slate-700 font-medium leading-relaxed bg-white p-3 rounded-lg border border-slate-200 font-mono">
                          {qa.a}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};
