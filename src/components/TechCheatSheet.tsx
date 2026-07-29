import React, { useState } from "react";
import { CHEAT_SHEET_CARDS } from "../data/driveData";
import { CheatSheetCard } from "../types";
import {
  Zap,
  Search,
  Code2,
  Copy,
  Check,
  Lightbulb,
  Server,
  Database,
  Cloud,
  Container,
  Layers,
} from "lucide-react";
import { motion } from "motion/react";

export const TechCheatSheet: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const categories = [
    "All",
    "React",
    "Node & Express",
    "PostgreSQL",
    "AWS & Cloud",
    "Docker & DevOps",
  ];

  const filteredCards = CHEAT_SHEET_CARDS.filter((card) => {
    const matchesCategory =
      selectedCategory === "All" || card.category === selectedCategory;
    const matchesSearch =
      card.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      card.keyPoints.some((kp) => kp.toLowerCase().includes(searchQuery.toLowerCase())) ||
      card.interviewTip.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleCopyCode = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "React":
        return Code2;
      case "Node & Express":
        return Server;
      case "PostgreSQL":
        return Database;
      case "AWS & Cloud":
        return Cloud;
      case "Docker & DevOps":
        return Container;
      default:
        return Layers;
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 border border-amber-200 flex items-center justify-center">
                <Zap className="w-5 h-5" />
              </div>
              <h2 className="text-xl font-bold text-slate-900">Technical Cheat Sheet & Interview Cards</h2>
            </div>
            <p className="text-xs text-slate-500 font-medium">
              Rapid recall notes and code snippets for React, Express, PostgreSQL, Docker, and AWS.
            </p>
          </div>

          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search concepts or code..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-amber-500 font-medium"
            />
          </div>
        </div>

        {/* Categories Bar */}
        <div className="flex flex-wrap items-center gap-2 pt-5 mt-5 border-t border-slate-100">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`text-xs px-3.5 py-1.5 rounded-xl border font-bold transition-all ${
                selectedCategory === cat
                  ? "bg-slate-900 text-white border-slate-900 shadow-xs"
                  : "bg-slate-50 border-slate-200 text-slate-700 hover:border-slate-300"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredCards.map((card) => {
          const IconComp = getCategoryIcon(card.category);
          return (
            <motion.div
              key={card.id}
              layout
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white border border-slate-200 rounded-2xl p-5 space-y-4 flex flex-col justify-between shadow-xs hover:border-slate-300 transition-all"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider bg-amber-50 text-amber-800 px-2.5 py-1 rounded border border-amber-200 flex items-center gap-1">
                    <IconComp className="w-3 h-3 text-amber-600" />
                    {card.category}
                  </span>
                  <span className="text-[10px] text-slate-400 font-mono font-medium">#{card.id}</span>
                </div>

                <h3 className="text-base font-bold text-slate-900 leading-snug">{card.title}</h3>

                {/* Key Points Bullet List */}
                <ul className="space-y-1.5 text-xs text-slate-700 font-medium">
                  {card.keyPoints.map((point, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0 mt-1.5" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>

                {/* Code Snippet Box */}
                {(card.codeSnippet || card.codeExample) && (
                  <div className="relative group mt-2">
                    <button
                      onClick={() => handleCopyCode((card.codeSnippet || card.codeExample)!, card.id)}
                      className="absolute top-2 right-2 bg-slate-800 text-slate-200 hover:text-white text-[10px] font-mono px-2 py-1 rounded flex items-center gap-1 opacity-80 group-hover:opacity-100 transition-all border border-slate-700"
                    >
                      {copiedId === card.id ? (
                        <>
                          <Check className="w-3 h-3 text-emerald-400" /> Copied
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3 text-amber-400" /> Copy
                        </>
                      )}
                    </button>
                    <pre className="bg-slate-900 border border-slate-800 rounded-xl p-3.5 text-[11px] font-mono text-amber-400 overflow-x-auto leading-relaxed">
                      {card.codeSnippet || card.codeExample}
                    </pre>
                  </div>
                )}
              </div>

              {/* Interview Tip Banner */}
              <div className="pt-3 border-t border-slate-100 text-xs bg-slate-50 p-3 rounded-xl border border-slate-200 text-slate-800 font-medium leading-relaxed">
                <span className="text-amber-800 font-bold block mb-0.5 flex items-center gap-1">
                  <Lightbulb className="w-3.5 h-3.5 text-amber-600" /> Interviewer Pro-Tip:
                </span>
                {card.interviewTip}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};
