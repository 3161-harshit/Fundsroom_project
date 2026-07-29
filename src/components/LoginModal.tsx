import React, { useState } from "react";
import { User, Key, Mail, Hash, Building2, CheckCircle2, ShieldCheck, X } from "lucide-react";
import { motion } from "motion/react";

export interface CandidateUser {
  name: string;
  rollNo: string;
  email: string;
  branch: string;
  batch: string;
  targetCompany: string;
  isLoggedIn: boolean;
}

interface LoginModalProps {
  user: CandidateUser;
  isOpen: boolean;
  onClose: () => void;
  onLogin: (updatedUser: CandidateUser) => void;
  onLogout: () => void;
}

export const LoginModal: React.FC<LoginModalProps> = ({
  user,
  isOpen,
  onClose,
  onLogin,
  onLogout,
}) => {
  const [formData, setFormData] = useState({
    name: user.name || "Harshit Thakur",
    rollNo: user.rollNo || "22051980",
    email: user.email || "22051980@kiit.ac.in",
    branch: user.branch || "Computer Science & Engineering",
    batch: user.batch || "2026 Batch",
    password: "••••••••",
    targetCompany: user.targetCompany || "Fundsroom Infotech Private Limited",
  });

  const [activeMode, setActiveMode] = useState<"login" | "profile">(
    user.isLoggedIn ? "profile" : "login"
  );

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin({
      name: formData.name,
      rollNo: formData.rollNo,
      email: formData.email,
      branch: formData.branch,
      batch: formData.batch,
      targetCompany: formData.targetCompany,
      isLoggedIn: true,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-white border border-slate-200 w-full max-w-md rounded-2xl p-6 relative text-slate-900 shadow-2xl space-y-5"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 p-1 rounded-lg bg-slate-100 border border-slate-200 transition-all"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Header Title */}
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 border border-amber-200 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900">
                {user.isLoggedIn ? "Candidate Profile & Auth" : "Student Portal Authentication"}
              </h3>
              <p className="text-[10px] text-amber-600 font-mono font-semibold">
                PostgreSQL table: student_users & student_login_history
              </p>
            </div>
          </div>
          <p className="text-xs text-slate-500 font-medium">
            {user.isLoggedIn
              ? "View authenticated student session and target placement company."
              : "Login with KIIT Student Credentials. All login history is saved in PostgreSQL."}
          </p>
        </div>

        {/* Quick Demo Pre-fill Button */}
        {!user.isLoggedIn && (
          <div className="bg-slate-50 border border-slate-200 p-2.5 rounded-xl flex items-center justify-between text-xs">
            <span className="text-slate-600 text-[11px] font-medium">Quick Login Demo:</span>
            <button
              type="button"
              onClick={() => {
                setFormData({
                  name: "Harshit Thakur",
                  rollNo: "22051980",
                  email: "22051980@kiit.ac.in",
                  branch: "Computer Science & Engineering",
                  batch: "2026 Batch",
                  password: "password123",
                  targetCompany: "Fundsroom Infotech Private Limited",
                });
              }}
              className="bg-amber-100 text-amber-800 hover:bg-amber-200 border border-amber-300 px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all"
            >
              Fill Harshit Thakur (22051980)
            </button>
          </div>
        )}

        {/* Status Badge */}
        <div className="bg-slate-50 border border-slate-200 p-3 rounded-xl flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <span
              className={`w-2 h-2 rounded-full ${
                user.isLoggedIn ? "bg-emerald-500 animate-pulse" : "bg-amber-500"
              }`}
            />
            <span className="text-slate-600 font-medium">
              Status: <strong className="text-slate-900">{user.isLoggedIn ? "Authenticated Candidate" : "Guest Mode"}</strong>
            </span>
          </div>
          {user.isLoggedIn && (
            <span className="text-[10px] bg-amber-50 text-amber-700 px-2 py-0.5 rounded border border-amber-200 font-bold uppercase">
              SQL Audit Active
            </span>
          )}
        </div>

        {/* Login / Profile Form */}
        <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
          <div>
            <label className="text-slate-700 font-semibold block mb-1 flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-amber-600" /> Student Full Name
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="e.g. Harshit Thakur"
              className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-slate-900 focus:outline-none focus:border-amber-500 font-medium"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-slate-700 font-semibold block mb-1 flex items-center gap-1.5">
                <Hash className="w-3.5 h-3.5 text-amber-600" /> KIIT Roll Number
              </label>
              <input
                type="text"
                required
                value={formData.rollNo}
                onChange={(e) => setFormData({ ...formData, rollNo: e.target.value })}
                placeholder="22051980"
                className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-slate-900 focus:outline-none focus:border-amber-500 font-mono"
              />
            </div>
            <div>
              <label className="text-slate-700 font-semibold block mb-1 flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-amber-600" /> KIIT Email
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="22051980@kiit.ac.in"
                className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-slate-900 focus:outline-none focus:border-amber-500 font-medium"
              />
            </div>
          </div>

          <div>
            <label className="text-slate-700 font-semibold block mb-1 flex items-center gap-1.5">
              <Building2 className="w-3.5 h-3.5 text-amber-600" /> Target Company Placement Drive
            </label>
            <select
              value={formData.targetCompany}
              onChange={(e) => setFormData({ ...formData, targetCompany: e.target.value })}
              className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-slate-900 focus:outline-none focus:border-amber-500 font-semibold"
            >
              <option value="Fundsroom Infotech Private Limited">Fundsroom Infotech Private Limited (Fullstack)</option>
              <option value="Google India">Google India (Software Engineer Intern)</option>
              <option value="Amazon Web Services (AWS)">Amazon Web Services (AWS SDE)</option>
              <option value="TCS Digital & Ninja">TCS Digital / Ninja (Prime Developer)</option>
              <option value="HighRadius">HighRadius (Product Engineer)</option>
              <option value="Custom Tech Role">Custom Tech Company Drive</option>
            </select>
          </div>

          {!user.isLoggedIn && (
            <div>
              <label className="text-slate-700 font-semibold block mb-1 flex items-center gap-1.5">
                <Key className="w-3.5 h-3.5 text-amber-600" /> Portal Password
              </label>
              <input
                type="password"
                required
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-slate-900 focus:outline-none focus:border-amber-500"
              />
            </div>
          )}

          {/* Action Buttons */}
          <div className="pt-2 flex items-center gap-3">
            <button
              type="submit"
              className="flex-1 bg-slate-900 hover:bg-slate-800 text-white font-bold py-2.5 px-4 rounded-xl text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-sm"
            >
              <CheckCircle2 className="w-4 h-4 text-amber-400" />
              {user.isLoggedIn ? "Save Profile & Target Company" : "Log In to Candidate Portal"}
            </button>

            {user.isLoggedIn && (
              <button
                type="button"
                onClick={() => {
                  onLogout();
                  onClose();
                }}
                className="bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 font-bold py-2.5 px-3 rounded-xl text-xs transition-all"
              >
                Log Out
              </button>
            )}
          </div>
        </form>
      </motion.div>
    </div>
  );
};
