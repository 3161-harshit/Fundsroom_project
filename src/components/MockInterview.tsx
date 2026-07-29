import React, { useState } from "react";
import {
  Bot,
  Sparkles,
  Send,
  RefreshCw,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Award,
  ChevronRight,
  Zap,
} from "lucide-react";
import { InterviewQuestionResponse, InterviewEvaluationResponse } from "../types";
import { motion } from "motion/react";

export const MockInterview: React.FC = () => {
  const [selectedTopic, setSelectedTopic] = useState("React & TypeScript");
  const [loadingQuestion, setLoadingQuestion] = useState(false);
  const [evaluatingAnswer, setEvaluatingAnswer] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState<InterviewQuestionResponse | null>({
    question:
      "How do you handle global state and optimize re-renders in a React application when dealing with large lists or frequent updates?",
    difficulty: "Medium",
    category: "React & TypeScript",
    hint: "Think about React Context limitations, custom hooks, useMemo/useCallback, or external state managers like Zustand or Redux.",
    keyConcepts: ["useMemo", "useCallback", "React Context", "State Colocation"],
  });

  const [userAnswer, setUserAnswer] = useState("");
  const [showHint, setShowHint] = useState(false);
  const [evaluation, setEvaluation] = useState<InterviewEvaluationResponse | null>(null);

  // History log
  const [interviewHistory, setInterviewHistory] = useState<
    Array<{ question: string; rating: number; category: string }>
  >([]);

  const topics = [
    "React & TypeScript",
    "Node.js & Express REST APIs",
    "PostgreSQL & Database Design",
    "AWS & Cloud Infrastructure",
    "Docker & DevOps Workflow",
    "Fullstack Architecture & Security",
  ];

  const handleFetchQuestion = async () => {
    setLoadingQuestion(true);
    setEvaluation(null);
    setUserAnswer("");
    setShowHint(false);

    try {
      const res = await fetch("/api/gemini/interview", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "get_question",
          topic: selectedTopic,
        }),
      });

      const data = await res.json();
      if (data && data.question) {
        setCurrentQuestion(data);
      }
    } catch (err) {
      console.error("Error fetching question:", err);
    } finally {
      setLoadingQuestion(false);
    }
  };

  const handleSubmitAnswer = async () => {
    if (!userAnswer.trim() || !currentQuestion) return;
    setEvaluatingAnswer(true);

    try {
      const res = await fetch("/api/gemini/interview", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "evaluate_answer",
          question: currentQuestion.question,
          userAnswer,
          topic: selectedTopic,
        }),
      });

      const data = await res.json();
      if (data && data.rating !== undefined) {
        setEvaluation(data);
        setInterviewHistory((prev) => [
          {
            question: currentQuestion.question,
            rating: data.rating,
            category: selectedTopic,
          },
          ...prev,
        ]);
      }
    } catch (err) {
      console.error("Error evaluating answer:", err);
    } finally {
      setEvaluatingAnswer(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 bg-amber-50 text-amber-800 border border-amber-200 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
              <Bot className="w-3.5 h-3.5 text-amber-600" />
              AI Technical Mock Interviewer
            </div>
            <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
              Fundsroom Interview Simulator
            </h2>
            <p className="text-xs text-slate-500 font-medium max-w-xl">
              Practice real interview questions covering React, Express, PostgreSQL, Docker, and AWS tailored for Fundsroom Infotech.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-500 font-semibold">Total Sessions:</span>
            <span className="bg-slate-100 text-slate-900 border border-slate-200 font-bold px-3 py-1 rounded-xl text-xs">
              {interviewHistory.length} Completed
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Left Column: Topic Picker */}
        <div className="space-y-4">
          <div className="bg-white border border-slate-200 rounded-2xl p-5 space-y-3 shadow-xs">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-amber-600" /> Select Topic
            </h3>
            <div className="space-y-1.5">
              {topics.map((t) => (
                <button
                  key={t}
                  onClick={() => setSelectedTopic(t)}
                  className={`w-full text-left px-3 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-between ${
                    selectedTopic === t
                      ? "bg-slate-900 text-white shadow-xs"
                      : "bg-slate-50 text-slate-700 hover:bg-slate-100 border border-slate-200"
                  }`}
                >
                  <span>{t}</span>
                  <ChevronRight className="w-3.5 h-3.5 opacity-60" />
                </button>
              ))}
            </div>

            <button
              id="btn-fetch-question"
              onClick={handleFetchQuestion}
              disabled={loadingQuestion}
              className="w-full mt-2 bg-amber-600 hover:bg-amber-700 text-white font-bold py-2.5 px-4 rounded-xl text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-xs"
            >
              {loadingQuestion ? (
                <>
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" /> Generating...
                </>
              ) : (
                <>
                  <Sparkles className="w-3.5 h-3.5" /> Next Question
                </>
              )}
            </button>
          </div>

          {/* History */}
          {interviewHistory.length > 0 && (
            <div className="bg-white border border-slate-200 rounded-2xl p-5 space-y-3 shadow-xs">
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                Session History
              </h3>
              <div className="space-y-2 max-h-60 overflow-y-auto">
                {interviewHistory.map((h, i) => (
                  <div key={i} className="p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-[11px] space-y-1">
                    <p className="font-semibold text-slate-800 line-clamp-1">{h.question}</p>
                    <div className="flex justify-between items-center text-[10px]">
                      <span className="text-slate-500 font-medium">{h.category}</span>
                      <span className="font-extrabold text-amber-700">{h.rating}/10</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right 3 Columns: Active Question & Answer Box */}
        <div className="lg:col-span-3 space-y-4">
          <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-5 shadow-xs">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <span className="text-xs font-bold bg-amber-50 text-amber-800 border border-amber-200 px-2.5 py-0.5 rounded-md">
                Topic: {currentQuestion?.category || selectedTopic}
              </span>
              <span
                className={`text-xs font-bold px-2 py-0.5 rounded ${
                  currentQuestion?.difficulty === "Hard"
                    ? "bg-rose-50 text-rose-700 border border-rose-200"
                    : "bg-emerald-50 text-emerald-700 border border-emerald-200"
                }`}
              >
                {currentQuestion?.difficulty || "Medium"} Difficulty
              </span>
            </div>

            <div className="space-y-3">
              <h3 className="text-base font-bold text-slate-900 leading-snug">
                {currentQuestion?.question}
              </h3>

              {currentQuestion?.keyConcepts && (
                <div className="flex flex-wrap items-center gap-1.5 pt-1">
                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mr-1">Key Concepts:</span>
                  {currentQuestion.keyConcepts.map((concept, idx) => (
                    <span
                      key={idx}
                      className="text-[10px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded border border-slate-200 font-semibold"
                    >
                      {concept}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Hint Trigger */}
            {currentQuestion?.hint && (
              <div>
                <button
                  onClick={() => setShowHint(!showHint)}
                  className="text-xs text-amber-700 hover:underline flex items-center gap-1 font-bold"
                >
                  <HelpCircle className="w-3.5 h-3.5" />
                  {showHint ? "Hide Hint" : "Need a Hint?"}
                </button>
                {showHint && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="mt-2 text-xs bg-amber-50 border border-amber-200 text-amber-900 p-3 rounded-lg font-medium"
                  >
                    💡 <strong className="text-amber-800">Interviewer Hint:</strong> {currentQuestion.hint}
                  </motion.div>
                )}
              </div>
            )}

            {/* Candidate Answer Input */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-700 flex items-center justify-between">
                <span>Your Response / Answer:</span>
                <span className="text-[10px] text-slate-500 font-normal">
                  Write a structured response (or bullet points)
                </span>
              </label>
              <textarea
                id="input-user-answer"
                rows={5}
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                placeholder="Explain your approach, technical concepts, syntax, or architectural trade-offs here..."
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3.5 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-amber-500 transition-all font-mono font-medium"
              />
            </div>

            <button
              id="btn-submit-answer"
              onClick={handleSubmitAnswer}
              disabled={evaluatingAnswer || !userAnswer.trim()}
              className={`w-full py-3 px-4 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all ${
                evaluatingAnswer || !userAnswer.trim()
                  ? "bg-slate-100 text-slate-400 cursor-not-allowed border border-slate-200"
                  : "bg-slate-900 hover:bg-slate-800 text-white shadow-xs"
              }`}
            >
              {evaluatingAnswer ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  Evaluating Answer with Gemini AI...
                </>
              ) : (
                <>
                  <Send className="w-4 h-4 text-amber-400" />
                  Submit Answer for AI Evaluation
                </>
              )}
            </button>
          </div>

          {/* AI Evaluation Results */}
          {evaluation && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white border border-slate-200 rounded-2xl p-6 space-y-4 shadow-xs"
            >
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2">
                  <Award className="w-5 h-5 text-amber-600" />
                  <h3 className="text-base font-bold text-slate-900">Interviewer Feedback & Score</h3>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-500 font-semibold">Rating:</span>
                  <span
                    className={`text-lg font-black px-3 py-0.5 rounded-lg border ${
                      evaluation.rating >= 8
                        ? "bg-emerald-50 text-emerald-800 border-emerald-200"
                        : evaluation.rating >= 5
                        ? "bg-amber-50 text-amber-800 border-amber-200"
                        : "bg-rose-50 text-rose-800 border-rose-200"
                    }`}
                  >
                    {evaluation.rating} / 10
                  </span>
                </div>
              </div>

              {/* Feedback Summary */}
              <div className="text-xs text-slate-800 leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-200 font-medium">
                <strong className="text-amber-800">Feedback:</strong> {evaluation.feedback}
              </div>

              {/* Strengths & Improvements */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                {evaluation.strengths && evaluation.strengths.length > 0 && (
                  <div className="bg-slate-50 border border-slate-200 p-3.5 rounded-xl space-y-1.5">
                    <span className="font-bold text-emerald-700 flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Strengths
                    </span>
                    <ul className="list-disc list-inside text-slate-700 space-y-1 font-medium">
                      {evaluation.strengths.map((str, idx) => (
                        <li key={idx}>{str}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {evaluation.improvements && evaluation.improvements.length > 0 && (
                  <div className="bg-slate-50 border border-slate-200 p-3.5 rounded-xl space-y-1.5">
                    <span className="font-bold text-amber-800 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" /> Areas to Improve
                    </span>
                    <ul className="list-disc list-inside text-slate-700 space-y-1 font-medium">
                      {evaluation.improvements.map((imp, idx) => (
                        <li key={idx}>{imp}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Sample Model Answer */}
              {evaluation.sampleAnswer && (
                <div className="space-y-1.5 pt-2 border-t border-slate-100">
                  <span className="text-xs font-bold text-slate-900 block">Model Answer / Standard Response:</span>
                  <div className="text-xs text-slate-700 bg-amber-50/50 p-3.5 rounded-xl border border-amber-200 font-mono leading-relaxed">
                    {evaluation.sampleAnswer}
                  </div>
                </div>
              )}
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};
