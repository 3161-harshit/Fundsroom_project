nuimport React, { useState } from "react";
import { Navbar } from "./components/Navbar";
import { TaskFlowApp } from "./components/TaskFlowApp";
import { TaskFlowArchitecture } from "./components/TaskFlowArchitecture";
import { DriveOverview } from "./components/DriveOverview";
import { MockInterview } from "./components/MockInterview";
import { CodingArena } from "./components/CodingArena";
import { SupersetOptimizer } from "./components/SupersetOptimizer";
import { TechCheatSheet } from "./components/TechCheatSheet";
import { ProjectShowcase } from "./components/ProjectShowcase";
import { FUNDSROOM_DRIVE_DETAILS } from "./data/driveData";
import { motion, AnimatePresence } from "motion/react";

export default function App() {
  const [activeTab, setActiveTab] = useState<string>("taskflow");

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans antialiased selection:bg-[#c5a059] selection:text-white flex flex-col">
      {/* Top Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        targetCompany={FUNDSROOM_DRIVE_DETAILS.companyName}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 py-6">
        <AnimatePresence mode="wait">
          {activeTab === "taskflow" && (
            <motion.div
              key="taskflow"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
            >
              <TaskFlowApp userName="Harshit Thakur" userRollNo="22051980" />
            </motion.div>
          )}

          {activeTab === "architecture" && (
            <motion.div
              key="architecture"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
            >
              <TaskFlowArchitecture />
            </motion.div>
          )}

          {activeTab === "overview" && (
            <motion.div
              key="overview"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
            >
              <DriveOverview
                onStartInterview={() => setActiveTab("interview")}
                onStartCoding={() => setActiveTab("coding")}
                onOpenSuperset={() => setActiveTab("superset")}
              />
            </motion.div>
          )}

          {activeTab === "interview" && (
            <motion.div
              key="interview"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
            >
              <MockInterview />
            </motion.div>
          )}

          {activeTab === "coding" && (
            <motion.div
              key="coding"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
            >
              <CodingArena />
            </motion.div>
          )}

          {activeTab === "superset" && (
            <motion.div
              key="superset"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
            >
              <SupersetOptimizer />
            </motion.div>
          )}

          {activeTab === "cheatsheet" && (
            <motion.div
              key="cheatsheet"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
            >
              <TechCheatSheet />
            </motion.div>
          )}

          {activeTab === "project" && (
            <motion.div
              key="project"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
            >
              <ProjectShowcase />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 text-xs text-slate-500 py-4 px-4 mt-8 shadow-sm">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="font-medium text-slate-700">
            KIIT Deemed to be University Placement Companion • {FUNDSROOM_DRIVE_DETAILS.companyName}
          </div>
          <div className="text-slate-500 font-mono">
            TaskFlow Fullstack Showcase • Notice No: {FUNDSROOM_DRIVE_DETAILS.driveNo}
          </div>
        </div>
      </footer>
    </div>
  );
}

