export interface JobDriveDetails {
  companyName: string;
  driveNo: string;
  driveDate: string;
  role: string;
  deadline: string;
  processMode: string;
  stipendFixed: number;
  stipendVariable: number;
  durationMonths: number;
  ppoCtcLpa: number;
  eligibility: string;
  jobLocation: string;
  joiningDate: string;
  companyOverview: string;
  requiredSkills: string[];
  goodToHaveSkills: string[];
  learningOutcomes: string[];
}

export interface InterviewQuestionResponse {
  question: string;
  difficulty: "Easy" | "Medium" | "Hard";
  category: string;
  hint: string;
  keyConcepts: string[];
}

export interface InterviewEvaluationResponse {
  rating: number;
  feedback: string;
  idealAnswer: string;
  strengths: string[];
  improvements: string[];
  followUpQuestion?: string;
}

export interface CodeChallenge {
  id: string;
  title: string;
  type: "react" | "express" | "postgres" | "typescript";
  difficulty: "Easy" | "Medium" | "Hard";
  description: string;
  starterCode: string;
  requirementPrompt: string;
  sampleSolution: string;
  keyTakeaways: string[];
}

export interface CheatSheetCard {
  id: string;
  category: "React" | "Node & Express" | "PostgreSQL" | "AWS & Cloud" | "Docker & DevOps" | "Git & Rest";
  title: string;
  keyPoints: string[];
  codeExample?: string;
  codeSnippet?: string;
  interviewTip: string;
}

export interface SupersetQAPair {
  question: string;
  sampleAnswer: string;
  suggestedAnswer?: string;
  fieldLabel?: string;
  keyHighlight?: string;
  category: string;
}

export interface TaskProject {
  id: string;
  userId: string;
  projectName: string;
  description: string;
  createdAt: string;
  taskCount?: number;
  completedCount?: number;
}

export interface TaskItem {
  id: string;
  projectId: string;
  title: string;
  description: string;
  priority: "Low" | "Medium" | "High";
  status: "Pending" | "In Progress" | "Completed";
  dueDate: string;
  createdAt: string;
}

export interface TaskUser {
  id: string;
  name: string;
  email: string;
  role: string;
  createdAt: string;
}

export interface ApiEndpoint {
  method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  path: string;
  description: string;
  requestBody?: string;
  responseSample: string;
}
