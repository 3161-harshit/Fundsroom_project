import React, { useState } from "react";
import { FUNDSROOM_DRIVE_DETAILS } from "../data/driveData";
import {
  CheckCircle,
  Clock,
  MapPin,
  Calendar,
  Building2,
  Code2,
  Server,
  Database,
  Cloud,
  Container,
  Layers,
  ArrowRight,
  ShieldCheck,
  Award,
  Sparkles,
} from "lucide-react";
import { motion } from "motion/react";

interface DriveOverviewProps {
  onStartInterview: () => void;
  onStartCoding: () => void;
  onOpenSuperset: () => void;
}

export const DriveOverview: React.FC<DriveOverviewProps> = ({
  onStartInterview,
  onStartCoding,
  onOpenSuperset,
}) => {
  // Interactive checklist state
  const [checklist, setChecklist] = useState({
    supersetApplied: true,
    resumeUpdated: true,
    reactNodeReviewed: false,
    postgresReviewed: false,
    awsBasicsReviewed: true,
    dockerConceptReviewed: true,
  });

  const toggleCheck = (key: keyof typeof checklist) => {
    setChecklist((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const totalChecked = Object.values(checklist).filter(Boolean).length;
  const progressPercent = Math.round((totalChecked / Object.keys(checklist).length) * 100);

  return (
    <div className="space-y-6">
      {/* Hero Header Card - Clean White Theme */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white border border-slate-200 rounded-2xl p-6 relative overflow-hidden shadow-xs"
      >
        <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-amber-50 text-amber-700 border border-amber-200 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              Recruitment Drive • KIIT Deemed to be University
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              {FUNDSROOM_DRIVE_DETAILS.companyName}
            </h2>

            <p className="text-slate-600 text-sm leading-relaxed font-medium">
              {FUNDSROOM_DRIVE_DETAILS.companyOverview}
            </p>

            <div className="flex flex-wrap items-center gap-4 text-xs text-slate-600 pt-1 font-medium">
              <span className="flex items-center gap-1.5 bg-slate-50 border border-slate-200 px-2.5 py-1 rounded-lg text-slate-800">
                <Building2 className="w-3.5 h-3.5 text-amber-600" />
                ERP / CRM & Cloud Platforms
              </span>
              <span className="flex items-center gap-1.5 bg-slate-50 border border-slate-200 px-2.5 py-1 rounded-lg text-slate-800">
                <Clock className="w-3.5 h-3.5 text-amber-600" />
                Duration: {FUNDSROOM_DRIVE_DETAILS.durationMonths} Months
              </span>
              <span className="flex items-center gap-1.5 bg-slate-50 border border-slate-200 px-2.5 py-1 rounded-lg text-slate-800">
                <MapPin className="w-3.5 h-3.5 text-amber-600" />
                {FUNDSROOM_DRIVE_DETAILS.jobLocation}
              </span>
            </div>
          </div>

          {/* Quick Action Box */}
          <div className="w-full lg:w-auto bg-slate-50 border border-slate-200 rounded-xl p-5 flex flex-col gap-3 min-w-[280px]">
            <div className="text-xs text-slate-500 font-semibold uppercase tracking-wider">Preparation Readiness</div>
            <div className="flex items-center justify-between">
              <span className="text-2xl font-extrabold text-amber-600">{progressPercent}%</span>
              <span className="text-xs text-slate-500 font-medium">{totalChecked}/6 Checklist Steps</span>
            </div>
            <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
              <div
                className="bg-amber-600 h-full transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              />
            </div>

            <div className="pt-2 flex flex-col gap-2">
              <button
                id="btn-overview-start-interview"
                onClick={onStartInterview}
                className="w-full bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold uppercase tracking-wider py-2.5 px-4 rounded-lg flex items-center justify-center gap-2 transition-all shadow-xs"
              >
                Launch AI Mock Interview
                <ArrowRight className="w-4 h-4 text-amber-400" />
              </button>
              <button
                id="btn-overview-start-coding"
                onClick={onStartCoding}
                className="w-full bg-white hover:bg-slate-100 text-slate-800 text-xs font-bold py-2 px-4 rounded-lg flex items-center justify-center gap-2 border border-slate-300 transition-all"
              >
                Practice Code & SQL Challenges
              </button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Grid: Package & Eligibility Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Stipend & CTC */}
        <div className="bg-white border border-slate-200 rounded-xl p-5 space-y-3 shadow-xs">
          <div className="flex items-center gap-2 text-amber-700 text-xs font-bold uppercase tracking-wider">
            <Award className="w-4 h-4 text-amber-600" />
            Compensation Package
          </div>
          <div className="space-y-1">
            <div className="text-xl font-bold text-slate-900">
              ₹10,000 <span className="text-xs font-normal text-slate-500">Fixed / mo</span>
            </div>
            <div className="text-xs text-amber-700 font-medium">
              + Up to ₹5,000 Variable (Performance-Based)
            </div>
          </div>
          <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
            <span className="text-slate-500">PPO Opportunity:</span>
            <span className="text-amber-800 font-bold bg-amber-50 border border-amber-200 px-2 py-0.5 rounded">
              ₹6.00 LPA CTC
            </span>
          </div>
        </div>

        {/* Eligibility & Batch */}
        <div className="bg-white border border-slate-200 rounded-xl p-5 space-y-3 shadow-xs">
          <div className="flex items-center gap-2 text-amber-700 text-xs font-bold uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4 text-amber-600" />
            Eligibility Criteria
          </div>
          <div className="text-sm font-bold text-slate-900 leading-snug">
            2026 Graduated B.Tech Students
          </div>
          <div className="text-xs text-slate-600">
            CSE / CS&SE / CS&CE / IT / ETC / E&CS
          </div>
          <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
            <span className="text-slate-500">Backlogs:</span>
            <span className="text-amber-800 font-bold bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
              No Backlog Allowed
            </span>
          </div>
        </div>

        {/* Key Dates & Mode */}
        <div className="bg-white border border-slate-200 rounded-xl p-5 space-y-3 shadow-xs">
          <div className="flex items-center gap-2 text-amber-700 text-xs font-bold uppercase tracking-wider">
            <Calendar className="w-4 h-4 text-amber-600" />
            Key Timeline & Process
          </div>
          <div className="space-y-1 text-xs">
            <div className="flex justify-between text-slate-800 font-medium">
              <span className="text-slate-500">Notice Date:</span>
              <span>{FUNDSROOM_DRIVE_DETAILS.driveDate}</span>
            </div>
            <div className="flex justify-between text-slate-800 font-medium">
              <span className="text-slate-500">Superset Deadline:</span>
              <span className="text-amber-700 font-bold">24th July 2026 (11:00 AM)</span>
            </div>
            <div className="flex justify-between text-slate-800 font-medium">
              <span className="text-slate-500">Joining Date:</span>
              <span className="text-emerald-700 font-bold">Immediate</span>
            </div>
          </div>
          <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
            <span className="text-slate-500">Process Mode:</span>
            <span className="text-amber-700 font-bold">{FUNDSROOM_DRIVE_DETAILS.processMode}</span>
          </div>
        </div>
      </div>

      {/* Tech Stack Requirements Breakdown */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-5 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 pb-4">
          <div>
            <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Code2 className="w-5 h-5 text-amber-600" />
              Fundsroom Infotech Required Stack Matrix
            </h3>
            <p className="text-xs text-slate-500 font-medium">
              Extracted directly from Job Description (No. KIIT-DU/T&P/26/608)
            </p>
          </div>
          <button
            onClick={onOpenSuperset}
            className="text-xs text-amber-600 hover:underline flex items-center gap-1 font-bold"
          >
            Review Superset Q&A Answers &rarr;
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Mandatory Skills */}
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-3">
            <div className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
              <Server className="w-4 h-4 text-amber-600" />
              Frontend & Backend Core
            </div>
            <ul className="space-y-1.5 text-xs text-slate-700 font-medium">
              <li className="flex items-center gap-2">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                React.js & TypeScript (ES6+)
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                Node.js & Express.js REST APIs
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                HTML5 & CSS3 Responsive UIs
              </li>
            </ul>
          </div>

          {/* Database & Tools */}
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-3">
            <div className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
              <Database className="w-4 h-4 text-amber-600" />
              Database & Testing Tools
            </div>
            <ul className="space-y-1.5 text-xs text-slate-700 font-medium">
              <li className="flex items-center gap-2">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                PostgreSQL Schema & Query Design
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                Git & GitHub Version Control
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                Postman API Endpoint Testing
              </li>
            </ul>
          </div>

          {/* Cloud & DevOps */}
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-3">
            <div className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
              <Cloud className="w-4 h-4 text-amber-600" />
              DevOps & AWS Cloud
            </div>
            <ul className="space-y-1.5 text-xs text-slate-700 font-medium">
              <li className="flex items-center gap-2">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                Docker Containerization
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                AWS EC2 Deployment & Basics
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                ERP / CRM Workflow Logic
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Interactive Preparation Checklist */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-4 shadow-xs">
        <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
          <Layers className="w-4 h-4 text-amber-600" />
          KIIT Candidate Action Checklist
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {[
            { id: "supersetApplied", label: "Applied on Superset Portal before deadline" },
            { id: "resumeUpdated", label: "Updated Resume with React, Node, and Postgres skills" },
            { id: "reactNodeReviewed", label: "Reviewed React hooks & Express route controllers" },
            { id: "postgresReviewed", label: "Practiced PostgreSQL JOINs & Student Login table queries" },
            { id: "awsBasicsReviewed", label: "Reviewed AWS EC2 & S3 deployment steps" },
            { id: "dockerConceptReviewed", label: "Understood Dockerfile & Docker Compose syntax" },
          ].map((item) => {
            const isChecked = checklist[item.id as keyof typeof checklist];
            return (
              <div
                key={item.id}
                onClick={() => toggleCheck(item.id as keyof typeof checklist)}
                className={`p-3.5 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                  isChecked
                    ? "bg-amber-50/60 border-amber-300 text-slate-900"
                    : "bg-slate-50 border-slate-200 text-slate-600 hover:border-slate-300"
                }`}
              >
                <span className="text-xs font-semibold">{item.label}</span>
                <CheckCircle
                  className={`w-4 h-4 ${isChecked ? "text-amber-600" : "text-slate-300"}`}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
