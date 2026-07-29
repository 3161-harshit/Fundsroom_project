import React, { useState, useEffect } from "react";
import { TaskProject, TaskItem } from "../types";
import {
  FolderPlus,
  Plus,
  CheckCircle2,
  Clock,
  AlertCircle,
  Search,
  Trash2,
  Layers,
  ChevronRight,
  Calendar,
  X,
  Check,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

const INITIAL_PROJECTS: TaskProject[] = [
  {
    id: "proj-1",
    userId: "usr-101",
    projectName: "TaskFlow Core Platform",
    description: "Main React + Express task management dashboard and REST APIs.",
    createdAt: "2026-07-20",
  },
  {
    id: "proj-2",
    userId: "usr-101",
    projectName: "ERP System Integration",
    description: "PostgreSQL schema & data pipeline for Fundsroom client accounts.",
    createdAt: "2026-07-21",
  },
  {
    id: "proj-3",
    userId: "usr-102",
    projectName: "CRM Client Portal",
    description: "Fullstack user authentication, JWT sessions, and lead tracking.",
    createdAt: "2026-07-22",
  },
  {
    id: "proj-4",
    userId: "usr-103",
    projectName: "Docker & AWS DevOps",
    description: "Docker Compose setup, EC2 deployment, and Nginx reverse proxy.",
    createdAt: "2026-07-23",
  },
  {
    id: "proj-5",
    userId: "usr-101",
    projectName: "Mobile Companion API",
    description: "Express endpoint optimization and JSON pagination.",
    createdAt: "2026-07-24",
  },
];

const INITIAL_TASKS: TaskItem[] = [
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
    title: "Develop React dashboard with metric cards & search",
    description: "Create responsive UI using Vite, Tailwind CSS, and Lucide icons.",
    priority: "High",
    status: "Completed",
    dueDate: "2026-07-30",
    createdAt: "2026-07-22",
  },
  {
    id: "task-4",
    projectId: "proj-2",
    title: "Implement REST CRUD endpoints for /projects and /tasks",
    description: "Create Node.js controllers for GET, POST, PUT, and DELETE routes.",
    priority: "Medium",
    status: "Completed",
    dueDate: "2026-08-01",
    createdAt: "2026-07-23",
  },
  {
    id: "task-5",
    projectId: "proj-3",
    title: "Configure Docker Compose for React, Node, and Postgres",
    description: "Write Dockerfiles and multi-container orchestrations with environment variables.",
    priority: "High",
    status: "In Progress",
    dueDate: "2026-08-02",
    createdAt: "2026-07-24",
  },
  {
    id: "task-6",
    projectId: "proj-4",
    title: "Write Postman API test collection and GitHub README.md",
    description: "Document all endpoints, environment setup, and docker-compose up instructions.",
    priority: "Medium",
    status: "In Progress",
    dueDate: "2026-08-03",
    createdAt: "2026-07-25",
  },
  {
    id: "task-7",
    projectId: "proj-5",
    title: "Deploy Node backend to AWS EC2 with PM2 and Nginx",
    description: "Setup SSL certificate, domain mapping, and CORS configuration.",
    priority: "Low",
    status: "Pending",
    dueDate: "2026-08-05",
    createdAt: "2026-07-26",
  },
  {
    id: "task-8",
    projectId: "proj-1",
    title: "Prepare 60-second interview elevator pitch for TaskFlow",
    description: "Practice explaining fullstack request flow: React -> Express -> Postgres -> Docker.",
    priority: "High",
    status: "Pending",
    dueDate: "2026-08-06",
    createdAt: "2026-07-27",
  },
];

interface TaskFlowAppProps {
  userName?: string;
  userRollNo?: string;
}

export const TaskFlowApp: React.FC<TaskFlowAppProps> = ({
  userName = "Harshit Thakur",
  userRollNo = "22051980",
}) => {
  const [projects, setProjects] = useState<TaskProject[]>(() => {
    try {
      const saved = localStorage.getItem("tf_projects");
      return saved ? JSON.parse(saved) : INITIAL_PROJECTS;
    } catch {
      return INITIAL_PROJECTS;
    }
  });

  const [tasks, setTasks] = useState<TaskItem[]>(() => {
    try {
      const saved = localStorage.getItem("tf_tasks");
      return saved ? JSON.parse(saved) : INITIAL_TASKS;
    } catch {
      return INITIAL_TASKS;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem("tf_projects", JSON.stringify(projects));
    } catch (e) {
      console.error(e);
    }
  }, [projects]);

  useEffect(() => {
    try {
      localStorage.setItem("tf_tasks", JSON.stringify(tasks));
    } catch (e) {
      console.error(e);
    }
  }, [tasks]);

  // Selected project tab & Search filter
  const [selectedProjectId, setSelectedProjectId] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Modals state
  const [isNewProjectModalOpen, setIsNewProjectModalOpen] = useState(false);
  const [isNewTaskModalOpen, setIsNewTaskModalOpen] = useState(false);

  // New Project Form
  const [newProjectName, setNewProjectName] = useState("");
  const [newProjectDesc, setNewProjectDesc] = useState("");

  // New Task Form
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [newTaskDesc, setNewTaskDesc] = useState("");
  const [newTaskProjectId, setNewTaskProjectId] = useState(projects[0]?.id || "proj-1");
  const [newTaskPriority, setNewTaskPriority] = useState<"Low" | "Medium" | "High">("Medium");
  const [newTaskDueDate, setNewTaskDueDate] = useState("2026-08-10");

  // Add Project
  const handleCreateProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProjectName.trim()) return;
    const newProj: TaskProject = {
      id: `proj-${Date.now()}`,
      userId: "usr-101",
      projectName: newProjectName,
      description: newProjectDesc || "Custom software development project.",
      createdAt: new Date().toISOString().split("T")[0],
    };
    setProjects([newProj, ...projects]);
    setNewProjectName("");
    setNewProjectDesc("");
    setIsNewProjectModalOpen(false);
  };

  // Add Task
  const handleCreateTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;
    const newTask: TaskItem = {
      id: `task-${Date.now()}`,
      projectId: newTaskProjectId,
      title: newTaskTitle,
      description: newTaskDesc || "Standard team task requirement.",
      priority: newTaskPriority,
      status: "Pending",
      dueDate: newTaskDueDate,
      createdAt: new Date().toISOString().split("T")[0],
    };
    setTasks([newTask, ...tasks]);
    setNewTaskTitle("");
    setNewTaskDesc("");
    setIsNewTaskModalOpen(false);
  };

  // Toggle Task Status
  const handleToggleTaskStatus = (taskId: string) => {
    setTasks(
      tasks.map((t) => {
        if (t.id === taskId) {
          const nextStatus =
            t.status === "Pending"
              ? "In Progress"
              : t.status === "In Progress"
              ? "Completed"
              : "Pending";
          return { ...t, status: nextStatus };
        }
        return t;
      })
    );
  };

  // Delete Task
  const handleDeleteTask = (taskId: string) => {
    setTasks(tasks.filter((t) => t.id !== taskId));
  };

  // Delete Project
  const handleDeleteProject = (projId: string) => {
    setProjects(projects.filter((p) => p.id !== projId));
    setTasks(tasks.filter((t) => t.projectId !== projId));
    if (selectedProjectId === projId) setSelectedProjectId("all");
  };

  // Direct, clean filtered tasks list (by Project and Search query)
  const filteredTasks = tasks.filter((t) => {
    const matchesProject = selectedProjectId === "all" || t.projectId === selectedProjectId;
    const matchesSearch =
      t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesProject && matchesSearch;
  });

  // Metrics
  const totalProjectsCount = projects.length;
  const completedTasksCount = tasks.filter((t) => t.status === "Completed").length;
  const inProgressTasksCount = tasks.filter((t) => t.status === "In Progress").length;
  const pendingTasksCount = tasks.filter((t) => t.status === "Pending").length;

  return (
    <div className="space-y-6">
      {/* Top Welcome Banner - Clean White Background */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 relative overflow-hidden shadow-xs">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider bg-amber-50 text-amber-700 px-2.5 py-0.5 rounded border border-amber-200">
                Internship Project
              </span>
              <span className="text-xs text-slate-500 font-mono">KIIT Roll: {userRollNo}</span>
            </div>
            <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
              TaskFlow <span className="text-amber-600 font-normal">— Team Task Management System</span>
            </h2>
            <p className="text-xs text-slate-600 max-w-2xl leading-relaxed font-medium">
              Welcome back, <strong className="text-slate-900">{userName}</strong>! A complete task management platform built with <span className="text-amber-700 font-bold">React, Express, PostgreSQL, and Docker</span>.
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              id="btn-add-project"
              onClick={() => setIsNewProjectModalOpen(true)}
              className="bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-300 px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5"
            >
              <FolderPlus className="w-4 h-4 text-amber-600" />
              <span>+ Create Project</span>
            </button>
            <button
              id="btn-add-task"
              onClick={() => setIsNewTaskModalOpen(true)}
              className="bg-slate-900 hover:bg-slate-800 text-white font-bold px-4 py-2 rounded-xl text-xs uppercase tracking-wider transition-all flex items-center gap-1.5 shadow-sm"
            >
              <Plus className="w-4 h-4 text-amber-400" />
              <span>+ Add Task</span>
            </button>
          </div>
        </div>

        {/* Dashboard Metric Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-5 mt-5 border-t border-slate-200">
          <div className="bg-slate-50 border border-slate-200 p-3.5 rounded-xl space-y-1">
            <div className="text-[11px] text-slate-500 font-semibold flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-amber-600" /> Total Projects
            </div>
            <div className="text-2xl font-extrabold text-slate-900">{totalProjectsCount}</div>
          </div>

          <div className="bg-slate-50 border border-slate-200 p-3.5 rounded-xl space-y-1">
            <div className="text-[11px] text-slate-500 font-semibold flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Completed Tasks
            </div>
            <div className="text-2xl font-extrabold text-emerald-600">{completedTasksCount}</div>
          </div>

          <div className="bg-slate-50 border border-slate-200 p-3.5 rounded-xl space-y-1">
            <div className="text-[11px] text-slate-500 font-semibold flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-amber-600" /> In Progress
            </div>
            <div className="text-2xl font-extrabold text-amber-600">{inProgressTasksCount}</div>
          </div>

          <div className="bg-slate-50 border border-slate-200 p-3.5 rounded-xl space-y-1">
            <div className="text-[11px] text-slate-500 font-semibold flex items-center gap-1.5">
              <AlertCircle className="w-3.5 h-3.5 text-rose-600" /> Pending Tasks
            </div>
            <div className="text-2xl font-extrabold text-rose-600">{pendingTasksCount}</div>
          </div>
        </div>
      </div>

      {/* Main TaskFlow Section */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Left Column: Clean Project Selector List */}
        <div className="space-y-4">
          <div className="bg-white border border-slate-200 rounded-2xl p-5 space-y-4 shadow-xs">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <Layers className="w-4 h-4 text-amber-600" /> Projects ({projects.length})
              </h3>
              <button
                onClick={() => setIsNewProjectModalOpen(true)}
                className="text-[11px] text-amber-600 hover:underline font-bold"
              >
                + New
              </button>
            </div>

            {/* Project List Buttons */}
            <div className="space-y-1.5">
              <button
                onClick={() => setSelectedProjectId("all")}
                className={`w-full text-left px-3 py-2 rounded-xl text-xs font-bold flex items-center justify-between transition-all ${
                  selectedProjectId === "all"
                    ? "bg-slate-900 text-white shadow-sm"
                    : "bg-slate-50 text-slate-700 hover:bg-slate-100 border border-slate-200"
                }`}
              >
                <span>All Projects ({tasks.length})</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>

              {projects.map((proj) => {
                const projTasks = tasks.filter((t) => t.projectId === proj.id);
                const projCompleted = projTasks.filter((t) => t.status === "Completed").length;
                const isSelected = selectedProjectId === proj.id;
                return (
                  <div
                    key={proj.id}
                    className={`group rounded-xl border p-2.5 transition-all text-xs space-y-1 ${
                      isSelected
                        ? "bg-amber-50/60 border-amber-400"
                        : "bg-slate-50 border-slate-200 hover:border-slate-300"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <button
                        onClick={() => setSelectedProjectId(proj.id)}
                        className="font-bold text-left text-slate-900 group-hover:text-amber-700 transition-colors truncate flex-1"
                      >
                        {proj.projectName}
                      </button>
                      <button
                        onClick={() => handleDeleteProject(proj.id)}
                        title="Delete project"
                        className="opacity-0 group-hover:opacity-100 text-slate-400 hover:text-rose-600 p-1 transition-all"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                    <p className="text-[10px] text-slate-500 line-clamp-1">{proj.description}</p>
                    <div className="flex items-center justify-between text-[10px] pt-1 text-slate-600 font-medium">
                      <span>{projCompleted}/{projTasks.length} Done</span>
                      <span className="font-mono text-[9px] text-slate-400">{proj.createdAt}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right 3 Columns: Direct Task List & Clean Search */}
        <div className="lg:col-span-3 space-y-4">
          {/* Search Bar Header */}
          <div className="bg-white border border-slate-200 rounded-2xl p-4 flex flex-col md:flex-row items-center justify-between gap-3 shadow-xs">
            <div className="relative w-full md:max-w-md">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                id="input-search-tasks"
                type="text"
                placeholder="Search tasks..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-amber-500 font-medium"
              />
            </div>

            <div className="flex items-center gap-2 text-xs text-slate-600 font-medium">
              <span>Showing <strong className="text-slate-900">{filteredTasks.length}</strong> tasks</span>
            </div>
          </div>

          {/* Task Cards Container */}
          <div className="space-y-3">
            {filteredTasks.length === 0 ? (
              <div className="bg-white border border-slate-200 rounded-2xl p-8 text-center text-xs text-slate-500 space-y-2">
                <AlertCircle className="w-8 h-8 text-amber-500 mx-auto opacity-70" />
                <p className="font-medium">No tasks found matching your project or search term.</p>
                <button
                  onClick={() => {
                    setSelectedProjectId("all");
                    setSearchQuery("");
                  }}
                  className="text-amber-600 hover:underline font-bold pt-2 block mx-auto"
                >
                  Clear Search
                </button>
              </div>
            ) : (
              filteredTasks.map((task) => {
                const associatedProject = projects.find((p) => p.id === task.projectId);
                return (
                  <motion.div
                    key={task.id}
                    layout
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`bg-white border rounded-2xl p-4 transition-all space-y-3 shadow-xs ${
                      task.status === "Completed"
                        ? "border-slate-200 bg-slate-50/50 opacity-80"
                        : "border-slate-200 hover:border-slate-300"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-start gap-3">
                        <button
                          onClick={() => handleToggleTaskStatus(task.id)}
                          className={`mt-0.5 w-5 h-5 rounded-md border flex items-center justify-center transition-all ${
                            task.status === "Completed"
                              ? "bg-emerald-600 border-emerald-600 text-white"
                              : task.status === "In Progress"
                              ? "bg-amber-100 border-amber-400 text-amber-800"
                              : "bg-slate-50 border-slate-300 hover:border-amber-500 text-slate-400"
                          }`}
                          title="Toggle task status"
                        >
                          {task.status === "Completed" && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                          {task.status === "In Progress" && <Clock className="w-3 h-3" />}
                        </button>

                        <div className="space-y-1">
                          <h4
                            className={`text-sm font-bold ${
                              task.status === "Completed" ? "line-through text-slate-400" : "text-slate-900"
                            }`}
                          >
                            {task.title}
                          </h4>
                          <p className="text-xs text-slate-600 leading-relaxed font-normal">{task.description}</p>
                        </div>
                      </div>

                      {/* Delete Button */}
                      <button
                        onClick={() => handleDeleteTask(task.id)}
                        className="text-slate-400 hover:text-rose-600 p-1.5 transition-colors"
                        title="Delete task"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Footer Badges */}
                    <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-100 text-[11px]">
                      <div className="flex items-center gap-2">
                        {/* Project Badge */}
                        <span className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded border border-slate-200 font-semibold">
                          {associatedProject?.projectName || "General Project"}
                        </span>

                        {/* Priority Badge */}
                        <span
                          className={`px-2 py-0.5 rounded border font-bold ${
                            task.priority === "High"
                              ? "bg-rose-50 text-rose-700 border-rose-200"
                              : task.priority === "Medium"
                              ? "bg-amber-50 text-amber-800 border-amber-200"
                              : "bg-emerald-50 text-emerald-700 border-emerald-200"
                          }`}
                        >
                          {task.priority} Priority
                        </span>

                        {/* Status Pill */}
                        <span
                          className={`px-2 py-0.5 rounded font-semibold ${
                            task.status === "Completed"
                              ? "bg-emerald-100 text-emerald-800"
                              : task.status === "In Progress"
                              ? "bg-amber-100 text-amber-900"
                              : "bg-slate-100 text-slate-600"
                          }`}
                        >
                          {task.status}
                        </span>
                      </div>

                      <div className="flex items-center gap-1.5 text-slate-500 font-mono text-[10px]">
                        <Calendar className="w-3 h-3 text-amber-600" />
                        <span>Due: {task.dueDate}</span>
                      </div>
                    </div>
                  </motion.div>
                );
              })
            )}
          </div>
        </div>
      </div>

      {/* Modal: New Project */}
      <AnimatePresence>
        {isNewProjectModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white border border-slate-200 w-full max-w-md rounded-2xl p-6 relative text-slate-900 space-y-4 shadow-xl"
            >
              <button
                onClick={() => setIsNewProjectModalOpen(false)}
                className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 p-1"
              >
                <X className="w-4 h-4" />
              </button>

              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <FolderPlus className="w-5 h-5 text-amber-600" /> Create New Project
              </h3>

              <form onSubmit={handleCreateProject} className="space-y-3 text-xs">
                <div>
                  <label className="text-slate-700 font-semibold block mb-1">Project Name:</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. TaskFlow Express Backend"
                    value={newProjectName}
                    onChange={(e) => setNewProjectName(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-slate-900 focus:outline-none focus:border-amber-500 font-medium"
                  />
                </div>

                <div>
                  <label className="text-slate-700 font-semibold block mb-1">Description:</label>
                  <textarea
                    rows={3}
                    placeholder="e.g. Node.js REST API with PostgreSQL integration."
                    value={newProjectDesc}
                    onChange={(e) => setNewProjectDesc(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-slate-900 focus:outline-none focus:border-amber-500 font-medium"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-2.5 px-4 rounded-xl text-xs uppercase tracking-wider transition-all shadow-sm"
                >
                  Create Project
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Modal: New Task */}
      <AnimatePresence>
        {isNewTaskModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white border border-slate-200 w-full max-w-md rounded-2xl p-6 relative text-slate-900 space-y-4 shadow-xl"
            >
              <button
                onClick={() => setIsNewTaskModalOpen(false)}
                className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 p-1"
              >
                <X className="w-4 h-4" />
              </button>

              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Plus className="w-5 h-5 text-amber-600" /> Add Task to Project
              </h3>

              <form onSubmit={handleCreateTask} className="space-y-3 text-xs">
                <div>
                  <label className="text-slate-700 font-semibold block mb-1">Select Project:</label>
                  <select
                    value={newTaskProjectId}
                    onChange={(e) => setNewTaskProjectId(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-slate-900 focus:outline-none focus:border-amber-500 font-semibold"
                  >
                    {projects.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.projectName}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-slate-700 font-semibold block mb-1">Task Title:</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Implement POST /login with bcrypt hash check"
                    value={newTaskTitle}
                    onChange={(e) => setNewTaskTitle(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-slate-900 focus:outline-none focus:border-amber-500 font-medium"
                  />
                </div>

                <div>
                  <label className="text-slate-700 font-semibold block mb-1">Description:</label>
                  <textarea
                    rows={2}
                    placeholder="Detail requirement for the task..."
                    value={newTaskDesc}
                    onChange={(e) => setNewTaskDesc(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-slate-900 focus:outline-none focus:border-amber-500 font-medium"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-slate-700 font-semibold block mb-1">Priority:</label>
                    <select
                      value={newTaskPriority}
                      onChange={(e) =>
                        setNewTaskPriority(e.target.value as "Low" | "Medium" | "High")
                      }
                      className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-slate-900 focus:outline-none focus:border-amber-500 font-semibold"
                    >
                      <option value="Low">Low</option>
                      <option value="Medium">Medium</option>
                      <option value="High">High</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-slate-700 font-semibold block mb-1">Due Date:</label>
                    <input
                      type="date"
                      value={newTaskDueDate}
                      onChange={(e) => setNewTaskDueDate(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-slate-900 focus:outline-none focus:border-amber-500 font-medium"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-2.5 px-4 rounded-xl text-xs uppercase tracking-wider transition-all shadow-sm"
                >
                  Save Task
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
