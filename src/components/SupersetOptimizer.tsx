import React, { useState } from "react";
import { SAMPLE_SUPERSET_QA } from "../data/driveData";
import {
  FileText,
  Copy,
  Check,
  Sparkles,
  Zap,
  MapPin,
  Send,
  RefreshCw,
  Lightbulb,
} from "lucide-react";
import { motion } from "motion/react";

export const SupersetOptimizer: React.FC = () => {
  const [candidateLocation, setCandidateLocation] = useState("Chhattisgarh");
  const [skillsText, setSkillsText] = useState(
    "React.js, Node.js, Express, JavaScript, TypeScript, PostgreSQL, REST APIs, Git, Basic AWS knowledge"
  );
  const [dockerText, setDockerText] = useState("Docker containerization & docker-compose");
  const [learningText, setLearningText] = useState(
    "Full Stack Web Development, React & Node.js, Database Design (PostgreSQL)"
  );

  const [customQuestion, setCustomQuestion] = useState(
    "Skills Required - Explain your experience with AWS and Fullstack development."
  );
  const [generating, setGenerating] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const [aiResult, setAiResult] = useState<{
    suggestedAnswer: string;
    shortVersion: string;
    keyKeywordsToHighlight: string[];
    interviewTip: string;
  } | null>({
    suggestedAnswer:
      "I have strong practical experience in building fullstack React and TypeScript frontends integrated with Node.js and Express REST APIs, backed by PostgreSQL database design. Along with backend development, I possess Basic AWS knowledge including launching EC2 compute instances, managing S3 buckets for media storage, and deploying environment configurations.",
    shortVersion:
      "Fullstack developer with hands-on React, Node.js/Express, and PostgreSQL skills. Possesses Basic AWS experience with EC2 and S3 for deployment and storage.",
    keyKeywordsToHighlight: [
      "React & TypeScript",
      "Node.js/Express REST APIs",
      "PostgreSQL",
      "Basic AWS (EC2, S3)",
    ],
    interviewTip:
      "In the technical interview, mention a specific project where you connected your React frontend to an Express REST API hosted on EC2 with PostgreSQL database storage.",
  });

  const handleGenerateAnswer = async (questionToUse?: string) => {
    const q = questionToUse || customQuestion;
    setGenerating(true);

    try {
      const res = await fetch("/api/gemini/superset-qa", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          questionPrompt: q,
          candidateProfile: {
            location: candidateLocation,
            skills: skillsText,
            docker: dockerText,
            learning: learningText,
          },
        }),
      });

      const data = await res.json();
      if (data && data.suggestedAnswer) {
        setAiResult(data);
      }
    } catch (err) {
      console.error("Superset QA generation error:", err);
    } finally {
      setGenerating(false);
    }
  };

  const handleCopy = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 border border-amber-200 flex items-center justify-center">
                <FileText className="w-5 h-5" />
              </div>
              <h2 className="text-xl font-bold text-slate-900">Superset Portal Application Answers</h2>
            </div>
            <p className="text-xs text-slate-500 font-medium">
              Copy-paste verified answers optimized for Fundsroom Infotech job portal requirements.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-amber-800 bg-amber-50 px-3 py-1 rounded-xl border border-amber-200">
              Deadline: 24th July 2026 (11:00 AM)
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Preset Superset Questions */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-4 shadow-xs">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-600" />
              Verified Answers for Fundsroom Drive Questions
            </h3>

            <div className="space-y-4">
              {SAMPLE_SUPERSET_QA.map((qa, index) => (
                <div
                  key={index}
                  className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-3 transition-all hover:border-slate-300"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="space-y-1">
                      <span className="text-[10px] font-bold uppercase tracking-wider bg-slate-200 text-slate-700 px-2 py-0.5 rounded">
                        Q{index + 1}: {qa.fieldLabel || qa.category}
                      </span>
                      <h4 className="text-xs font-bold text-slate-900">{qa.question}</h4>
                    </div>

                    <button
                      onClick={() => handleCopy(qa.suggestedAnswer || qa.sampleAnswer, index)}
                      className="bg-white hover:bg-slate-100 text-slate-800 border border-slate-200 px-2.5 py-1 rounded-lg text-xs font-bold flex items-center gap-1 shrink-0 transition-all shadow-2xs"
                    >
                      {copiedIndex === index ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-600" />
                          <span>Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5 text-amber-600" />
                          <span>Copy Answer</span>
                        </>
                      )}
                    </button>
                  </div>

                  {/* Answer Box */}
                  <div className="bg-white p-3 rounded-lg border border-slate-200 text-xs font-mono text-slate-800 leading-relaxed">
                    {qa.suggestedAnswer || qa.sampleAnswer}
                  </div>

                  <div className="flex flex-wrap items-center justify-between text-[10px] text-slate-500 pt-1 font-medium">
                    <span>Target Keyword: <strong className="text-amber-800">{qa.keyHighlight || qa.category}</strong></span>
                    <button
                      onClick={() => handleGenerateAnswer(qa.question)}
                      className="text-amber-700 hover:underline font-bold"
                    >
                      Re-generate Answer &rarr;
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: AI Answer Generator */}
        <div className="space-y-4">
          <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-4 shadow-xs">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
              <Zap className="w-4 h-4 text-amber-600" /> Custom Superset Answer Generator
            </h3>

            <div className="space-y-3 text-xs">
              <div>
                <label className="text-slate-700 font-semibold block mb-1">
                  Target Question / Prompt:
                </label>
                <textarea
                  rows={3}
                  value={customQuestion}
                  onChange={(e) => setCustomQuestion(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-slate-900 focus:outline-none focus:border-amber-500 font-medium"
                />
              </div>

              <div>
                <label className="text-slate-700 font-semibold block mb-1">Candidate Preferred Location:</label>
                <input
                  type="text"
                  value={candidateLocation}
                  onChange={(e) => setCandidateLocation(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 text-slate-900 focus:outline-none focus:border-amber-500 font-medium"
                />
              </div>

              <div>
                <label className="text-slate-700 font-semibold block mb-1">Skills Highlight:</label>
                <input
                  type="text"
                  value={skillsText}
                  onChange={(e) => setSkillsText(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 text-slate-900 focus:outline-none focus:border-amber-500 font-medium"
                />
              </div>

              <button
                id="btn-generate-superset"
                onClick={() => handleGenerateAnswer()}
                disabled={generating || !customQuestion.trim()}
                className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-2.5 px-4 rounded-xl text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-xs"
              >
                {generating ? (
                  <>
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    Generating Custom Answer...
                  </>
                ) : (
                  <>
                    <Send className="w-3.5 h-3.5 text-amber-400" />
                    Generate Answer
                  </>
                )}
              </button>
            </div>
          </div>

          {/* AI Result Display */}
          {aiResult && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white border border-slate-200 rounded-2xl p-5 space-y-3 shadow-xs"
            >
              <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                <span className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                  <Lightbulb className="w-4 h-4 text-amber-600" /> Suggested Answer Result
                </span>
                <button
                  onClick={() => handleCopy(aiResult.suggestedAnswer, 99)}
                  className="text-amber-700 hover:underline text-[11px] font-bold"
                >
                  {copiedIndex === 99 ? "Copied!" : "Copy Suggested"}
                </button>
              </div>

              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 text-xs text-slate-800 leading-relaxed font-mono">
                {aiResult.suggestedAnswer}
              </div>

              {aiResult.keyKeywordsToHighlight && (
                <div className="flex flex-wrap items-center gap-1 pt-1">
                  <span className="text-[10px] text-slate-500 font-semibold">Keywords:</span>
                  {aiResult.keyKeywordsToHighlight.map((kw, i) => (
                    <span
                      key={i}
                      className="text-[10px] bg-amber-50 text-amber-800 border border-amber-200 px-2 py-0.5 rounded font-bold"
                    >
                      {kw}
                    </span>
                  ))}
                </div>
              )}
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};
