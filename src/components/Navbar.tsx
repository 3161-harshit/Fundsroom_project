import React from "react";
import { FUNDSROOM_DRIVE_DETAILS } from "../data/driveData";
import { CandidateUser } from "./LoginModal";
import {
  Briefcase,
  Bot,
  Code,
  FileText,
  Zap,
  Presentation,
  CheckCircle2,
  Calendar,
  Award,
  DollarSign,
  UserCheck,
  LogIn,
  CheckSquare,
  Server,
} from "lucide-react";

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  targetCompany?: string;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  targetCompany = FUNDSROOM_DRIVE_DETAILS.companyName,
}) => {
  const tabs = [
    { id: "taskflow", label: "TaskFlow Live App", icon: CheckSquare },
    { id: "architecture", label: "Backend & Docker Setup (Protected)", icon: Server },
    { id: "overview", label: "Drive Overview", icon: Briefcase },
    { id: "interview", label: "Technical Mock Interview", icon: Bot },
    { id: "coding", label: "Coding & SQL Arena", icon: Code },
    { id: "superset", label: "Superset Q&A", icon: FileText },
    { id: "cheatsheet", label: "Tech Revision", icon: Zap },
    { id: "project", label: "Project Pitcher", icon: Presentation },
  ];

  return (
    <header className="bg-white border-b border-slate-200 text-slate-900 sticky top-0 z-50 backdrop-blur-md bg-opacity-95 shadow-xs">
      {/* Top Banner Notice */}
      <div className="bg-slate-900 border-b border-slate-800 px-4 py-2 text-xs md:text-sm font-medium text-slate-200">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="bg-amber-500/20 text-amber-300 border border-amber-500/30 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider">
              KIIT Placement Drive
            </span>
            <span>
              <strong className="text-white">{targetCompany}</strong> — {FUNDSROOM_DRIVE_DETAILS.role}
            </span>
          </div>
          <div className="flex items-center gap-3 text-[11px] md:text-xs">
            <span className="flex items-center gap-1 text-slate-300">
              <DollarSign className="w-3.5 h-3.5 text-amber-400" />
              Stipend: ₹10k Fixed + ₹5k Var
            </span>
            <span className="flex items-center gap-1 hidden sm:inline-flex text-slate-300">
              <Award className="w-3.5 h-3.5 text-amber-400" />
              PPO: ₹6.00 LPA CTC
            </span>
            <span className="bg-amber-500 text-slate-950 px-2 py-0.5 rounded font-bold flex items-center gap-1 text-[11px]">
              <Calendar className="w-3 h-3" />
              Drive Notice: {FUNDSROOM_DRIVE_DETAILS.driveDate}
            </span>
          </div>
        </div>
      </div>

      {/* Main Header Bar */}
      <div className="max-w-7xl mx-auto px-4 py-3 flex flex-col lg:flex-row lg:items-center justify-between gap-3">
        <div className="flex items-center justify-between w-full lg:w-auto">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-slate-900 text-amber-400 flex items-center justify-center font-bold text-xl shadow-sm border border-slate-800">
              F
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg font-bold text-slate-900 tracking-tight">
                  Fundsroom <span className="font-extrabold text-amber-600">Drive Companion</span>
                </h1>
                <span className="text-[10px] bg-slate-100 text-slate-700 border border-slate-300 px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">
                  KIIT 2026 Batch
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium">
                Training & Placement Prep Portal • Notice No: {FUNDSROOM_DRIVE_DETAILS.driveNo}
              </p>
            </div>
          </div>

          {/* System Badge */}
          <div className="hidden lg:flex items-center gap-2 bg-slate-100 border border-slate-200 px-3 py-1.5 rounded-xl text-xs font-semibold text-slate-700">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Express Backend & REST API Active</span>
          </div>
        </div>

        {/* Tab Buttons */}
        <div className="flex items-center justify-between gap-2 overflow-x-auto">
          <nav className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  id={`tab-btn-${tab.id}`}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                    isActive
                      ? "bg-slate-900 text-white shadow-sm border border-slate-900"
                      : "text-slate-600 hover:text-slate-900 hover:bg-slate-100 border border-slate-200"
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? "text-amber-400" : "text-slate-500"}`} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </nav>
        </div>
      </div>
    </header>
  );
};

