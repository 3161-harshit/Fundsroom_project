import React, { useState } from "react";
import { PRACTICAL_CODE_CHALLENGES } from "../data/driveData";
import { CodeChallenge } from "../types";
import {
  Code,
  Terminal,
  Play,
  CheckCircle2,
  XCircle,
  Eye,
  Sparkles,
  Zap,
  RotateCcw,
} from "lucide-react";
import { motion } from "motion/react";

export const CodingArena: React.FC = () => {
  const [selectedChallenge, setSelectedChallenge] = useState<CodeChallenge>(
    PRACTICAL_CODE_CHALLENGES[0]
  );
  const [userCode, setUserCode] = useState<string>(PRACTICAL_CODE_CHALLENGES[0].starterCode);
  const [showSolution, setShowSolution] = useState(false);
  const [evaluating, setEvaluating] = useState(false);
  const [evaluationResult, setEvaluationResult] = useState<{
    passed: boolean;
    score: number;
    summary: string;
    detailedAnalysis: string;
    improvedCode: string;
    tips: string[];
  } | null>(null);

  const handleSelectChallenge = (challenge: CodeChallenge) => {
    setSelectedChallenge(challenge);
    setUserCode(challenge.starterCode);
    setShowSolution(false);
    setEvaluationResult(null);
  };

  const handleResetCode = () => {
    setUserCode(selectedChallenge.starterCode);
    setEvaluationResult(null);
    setShowSolution(false);
  };

  const handleEvaluate = async () => {
    setEvaluating(true);
    setEvaluationResult(null);

    try {
      const res = await fetch("/api/gemini/evaluate-code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          challengeTitle: selectedChallenge.title,
          type: selectedChallenge.type,
          code: userCode,
          promptRequirement: selectedChallenge.requirementPrompt,
        }),
      });

      const data = await res.json();
      if (data) {
        setEvaluationResult(data);
      }
    } catch (err) {
      console.error("Evaluation error:", err);
    } finally {
      setEvaluating(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Info */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 border border-amber-200 flex items-center justify-center">
                <Code className="w-5 h-5" />
              </div>
              <h2 className="text-xl font-bold text-slate-900">Fullstack & SQL Code Arena</h2>
            </div>
            <p className="text-xs text-slate-500 font-medium">
              Solve hands-on React, Express REST API, and PostgreSQL query challenges designed for Fundsroom technical rounds.
            </p>
          </div>

          {/* Challenge Selector */}
          <div className="flex flex-wrap items-center gap-2">
            {PRACTICAL_CODE_CHALLENGES.map((challenge) => (
              <button
                key={challenge.id}
                onClick={() => handleSelectChallenge(challenge)}
                className={`text-xs px-3 py-1.5 rounded-lg border font-bold transition-all ${
                  selectedChallenge.id === challenge.id
                    ? "bg-slate-900 text-white border-slate-900 shadow-xs"
                    : "bg-slate-50 border-slate-200 text-slate-700 hover:border-slate-300"
                }`}
              >
                {challenge.title}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Grid: Code Editor & Instructions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Problem Description & Requirement */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-4 flex flex-col justify-between shadow-xs">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase bg-amber-50 text-amber-800 px-2.5 py-1 rounded border border-amber-200">
                {selectedChallenge.type.toUpperCase()} Challenge
              </span>
              <span
                className={`text-[10px] font-bold px-2 py-0.5 rounded border ${
                  selectedChallenge.difficulty === "Hard"
                    ? "bg-rose-50 text-rose-700 border-rose-200"
                    : "bg-emerald-50 text-emerald-700 border-emerald-200"
                }`}
              >
                {selectedChallenge.difficulty}
              </span>
            </div>

            <h3 className="text-lg font-bold text-slate-900">{selectedChallenge.title}</h3>
            <p className="text-xs text-slate-600 leading-relaxed font-medium">
              {selectedChallenge.description}
            </p>

            <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl space-y-2">
              <div className="text-xs font-bold text-amber-800 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-amber-600" /> Requirement Guidelines:
              </div>
              <p className="text-xs text-slate-800 leading-relaxed font-medium">
                {selectedChallenge.requirementPrompt}
              </p>
            </div>

            {/* Key Takeaways */}
            <div className="space-y-2">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Key Concepts Evaluated:
              </span>
              <ul className="space-y-1.5">
                {selectedChallenge.keyTakeaways.map((takeaway, idx) => (
                  <li key={idx} className="text-xs text-slate-700 flex items-start gap-2 font-medium">
                    <Zap className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                    <span>{takeaway}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
            <button
              onClick={() => setShowSolution(!showSolution)}
              className="text-xs text-amber-700 hover:underline flex items-center gap-1.5 font-bold"
            >
              <Eye className="w-4 h-4" />
              {showSolution ? "Hide Sample Solution" : "View Sample Solution"}
            </button>

            <button
              onClick={handleResetCode}
              className="text-xs text-slate-500 hover:text-slate-800 flex items-center gap-1 font-semibold"
            >
              <RotateCcw className="w-3.5 h-3.5" /> Reset Starter Code
            </button>
          </div>
        </div>

        {/* Code Input & Execution Box */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-4 shadow-xs">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2">
              <Terminal className="w-4 h-4 text-amber-600" />
              <span className="text-xs font-bold text-slate-900">Code Workspace</span>
            </div>
            <span className="text-[10px] text-slate-400 font-mono">TypeScript / SQL</span>
          </div>

          <textarea
            id="input-code-workspace"
            rows={14}
            value={userCode}
            onChange={(e) => setUserCode(e.target.value)}
            className="w-full bg-slate-900 border border-slate-800 rounded-xl p-4 text-xs font-mono text-amber-400 focus:outline-none focus:border-amber-500 transition-all leading-relaxed scrollbar-thin"
          />

          <button
            id="btn-evaluate-code"
            onClick={handleEvaluate}
            disabled={evaluating || !userCode.trim()}
            className={`w-full py-3 px-4 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all ${
              evaluating || !userCode.trim()
                ? "bg-slate-100 text-slate-400 cursor-not-allowed border border-slate-200"
                : "bg-slate-900 hover:bg-slate-800 text-white shadow-xs"
            }`}
          >
            {evaluating ? (
              <>
                <Sparkles className="w-4 h-4 animate-spin text-amber-400" />
                Evaluating Code & Syntax...
              </>
            ) : (
              <>
                <Play className="w-4 h-4 text-amber-400 fill-amber-400" />
                Run Code Analysis & Test Logic
              </>
            )}
          </button>
        </div>
      </div>

      {/* Solution Panel */}
      {showSolution && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="bg-white border border-slate-200 rounded-2xl p-6 space-y-3 shadow-xs"
        >
          <div className="text-xs font-bold text-slate-900 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            Standard Solution Reference ({selectedChallenge.title})
          </div>
          <pre className="bg-slate-900 p-4 rounded-xl text-xs font-mono text-emerald-400 overflow-x-auto leading-relaxed border border-slate-800">
            {selectedChallenge.solutionCode}
          </pre>
        </motion.div>
      )}

      {/* AI Evaluation Output */}
      {evaluationResult && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white border border-slate-200 rounded-2xl p-6 space-y-4 shadow-xs"
        >
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2">
              {evaluationResult.passed ? (
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
              ) : (
                <XCircle className="w-5 h-5 text-rose-600" />
              )}
              <h3 className="text-base font-bold text-slate-900">
                Code Evaluation Results
              </h3>
            </div>
            <div className="text-lg font-black bg-slate-100 border border-slate-200 text-slate-900 px-3 py-0.5 rounded-lg">
              Score: {evaluationResult.score} / 100
            </div>
          </div>

          <div className="text-xs text-slate-800 leading-relaxed font-medium bg-slate-50 p-4 rounded-xl border border-slate-200">
            {evaluationResult.summary}
          </div>

          <div className="text-xs text-slate-700 leading-relaxed space-y-1">
            <strong className="text-slate-900 block font-bold">Detailed Analysis:</strong>
            <p className="bg-slate-50 p-3 rounded-lg border border-slate-200 font-mono text-[11px]">
              {evaluationResult.detailedAnalysis}
            </p>
          </div>

          {evaluationResult.improvedCode && (
            <div className="space-y-1.5">
              <span className="text-xs font-bold text-slate-900 block">Suggested Refactored Code:</span>
              <pre className="bg-slate-900 p-4 rounded-xl text-xs font-mono text-amber-400 overflow-x-auto border border-slate-800 leading-relaxed">
                {evaluationResult.improvedCode}
              </pre>
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
};
