import { JobDriveDetails, CodeChallenge, CheatSheetCard, SupersetQAPair } from "../types";

export const FUNDSROOM_DRIVE_DETAILS: JobDriveDetails = {
  companyName: "Fundsroom Infotech Pvt Ltd.",
  driveNo: "KIIT-DU/T&P/26/608",
  driveDate: "23rd July 2026",
  role: "Fullstack Developer Intern",
  deadline: "24th July 2026 by 11:00 AM",
  processMode: "Virtual Recruitment Drive",
  stipendFixed: 10000,
  stipendVariable: 5000,
  durationMonths: 6,
  ppoCtcLpa: 6.0,
  eligibility: "2026 Graduated B.Tech (CSE / CS&SE / CS&CE / IT / ETC / E&CS) - No Backlog",
  jobLocation: "To be Informed (Virtual Mode)",
  joiningDate: "Immediate",
  companyOverview:
    "Fundsroom Infotech Pvt. Ltd. is a technology-driven company that develops modern web applications, ERP/CRM solutions, and cloud-based platforms. Their internship provides students with hands-on live project experience under experienced mentors.",
  requiredSkills: [
    "React.js",
    "Node.js & Express.js",
    "JavaScript (ES6+) & TypeScript",
    "HTML5 & CSS3",
    "PostgreSQL",
    "REST APIs",
    "Git & GitHub, Postman",
    "Basic AWS Knowledge",
    "Problem-solving & Teamwork",
  ],
  goodToHaveSkills: ["Docker", "Redis", "GraphQL", "CI/CD", "Next.js", "Tailwind CSS"],
  learningOutcomes: [
    "Full Stack Web Development",
    "React & Node.js Architecture",
    "REST API Development & Security",
    "Database Design (PostgreSQL)",
    "Cloud Deployment (AWS)",
    "Git Workflow & Best Practices",
  ],
};

export const SAMPLE_SUPERSET_QA: SupersetQAPair[] = [
  {
    category: "Location",
    question: "Current Location (City with state)",
    sampleAnswer: "Chhattisgarh",
  },
  {
    category: "Technical Core",
    question: "Skills Required - Highlight your experience with AWS & Fullstack",
    sampleAnswer:
      "I have strong practical experience in building React and TypeScript frontends integrated with Express REST APIs and PostgreSQL databases. Additionally, I possess Basic AWS knowledge including launching EC2 instances, configuring S3 buckets for media assets, and managing environment secrets.",
  },
  {
    category: "Good to Have",
    question: "Good to Have - Experience with Docker & DevOps concepts",
    sampleAnswer:
      "I have hands-on experience using Docker to containerize fullstack React and Express applications. I write Dockerfiles, configure docker-compose for multi-container development (frontend + backend + PostgreSQL instance), ensuring environment consistency between dev and production.",
  },
  {
    category: "Learning Goals",
    question: "What You'll Learn & Contribution Goals at Fundsroom",
    sampleAnswer:
      "Full Stack Web Development, React & Node.js, Database Design (PostgreSQL). At Fundsroom Infotech, I aim to contribute to live ERP/CRM solutions while mastering scalable Express backend services, optimized PostgreSQL schema indexing, and automated cloud deployments.",
  },
];

export const PRACTICAL_CODE_CHALLENGES: CodeChallenge[] = [
  {
    id: "express-auth-middleware",
    title: "Express JWT Auth Middleware & Error Handling",
    type: "express",
    difficulty: "Medium",
    description: "Write an Express middleware in TypeScript that verifies a Bearer JWT token from headers and handles unauthorized access cleanly.",
    starterCode: `import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export interface AuthenticatedRequest extends Request {
  user?: { userId: string; role: string };
}

export const authenticateToken = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  // TODO: Extract 'Authorization' header (Bearer <token>)
  // TODO: Verify token with process.env.JWT_SECRET
  // TODO: Attach user payload to req.user or return 401/403 with JSON error message
};`,
    requirementPrompt: "Extract token, verify JWT secret safely, handle missing or invalid tokens with HTTP 401/403 JSON responses, and call next() on success.",
    sampleSolution: `export const authenticateToken = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ success: false, message: 'Access token required' });
  }

  jwt.verify(token, process.env.JWT_SECRET || 'fallback_secret', (err, user) => {
    if (err) {
      return res.status(403).json({ success: false, message: 'Invalid or expired token' });
    }
    req.user = user as { userId: string; role: string };
    next();
  });
};`,
    keyTakeaways: [
      "Always check for Bearer scheme prefix",
      "Return standardized JSON response on failure",
      "Pass typed user object onto Express Request interface",
    ],
  },
  {
    id: "postgres-indexing-query",
    title: "PostgreSQL Schema Query & JOIN with Indexing",
    type: "postgres",
    difficulty: "Medium",
    description: "Write a PostgreSQL SQL query to fetch all users with their active subscription details, joining `users` and `subscriptions` tables with pagination and index creation.",
    starterCode: `-- 1. Create optimal index on subscriptions(user_id, status)
-- 2. Select user name, email, plan_name, and expiry_date
-- 3. JOIN users and subscriptions
-- 4. Filter status = 'ACTIVE'
-- 5. Order by start_date DESC limit 10 offset 0

-- Write SQL below:
`,
    requirementPrompt: "Write index creation DDL and SELECT JOIN query with WHERE filtering, ORDER BY, and LIMIT/OFFSET pagination.",
    sampleSolution: `CREATE INDEX IF NOT EXISTS idx_subscriptions_user_status 
ON subscriptions (user_id, status);

SELECT 
  u.id AS user_id,
  u.name,
  u.email,
  s.plan_name,
  s.expiry_date
FROM users u
INNER JOIN subscriptions s ON u.id = s.user_id
WHERE s.status = 'ACTIVE'
ORDER BY s.start_date DESC
LIMIT 10 OFFSET 0;`,
    keyTakeaways: [
      "Composite indexes on foreign key + filter columns accelerate JOIN query execution",
      "Explicit column aliasing prevents name collision in JSON REST API serializations",
    ],
  },
  {
    id: "react-custom-hook-fetch",
    title: "React Custom Hook `useFetch` with Loading & Error State",
    type: "react",
    difficulty: "Easy",
    description: "Build a custom React hook `useFetch<T>(url: string)` that handles async API calls, cleanup on unmount, and returns `{ data, loading, error, refetch }`.",
    starterCode: `import { useState, useEffect, useCallback } from 'react';

export function useFetch<T>(url: string) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // TODO: Implement fetchData function with AbortController for cleanup
  // TODO: Return { data, loading, error, refetch }
  return { data, loading, error, refetch: () => {} };
}`,
    requirementPrompt: "Use AbortController to cancel pending fetches when URL changes or component unmounts, handle HTTP error statuses, and provide a refetch callback.",
    sampleSolution: `export function useFetch<T>(url: string) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async (signal?: AbortSignal) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(url, { signal });
      if (!res.ok) throw new Error(\`HTTP Error \${res.status}\`);
      const result = await res.json();
      setData(result);
    } catch (err: any) {
      if (err.name !== 'AbortError') {
        setError(err.message || 'Failed to fetch data');
      }
    } finally {
      setLoading(false);
    }
  }, [url]);

  useEffect(() => {
    const controller = new AbortController();
    fetchData(controller.signal);
    return () => controller.abort();
  }, [fetchData]);

  return { data, loading, error, refetch: () => fetchData() };
}`,
    keyTakeaways: [
      "AbortController prevents memory leaks and stale state updates on unmounted React components",
      "useCallback memoization prevents infinite re-render loops in useEffect dependency arrays",
    ],
  },
];

export const CHEAT_SHEET_CARDS: CheatSheetCard[] = [
  {
    id: "react-state-perf",
    category: "React",
    title: "React Hooks & Performance Optimization",
    keyPoints: [
      "useMemo: Caches expensive computation outputs until dependency values change.",
      "useCallback: Memoizes callback functions to prevent unnecessary child component re-renders.",
      "Virtualization: Use libraries like react-window for rendering large datasets.",
      "Strict Rules: Never update state directly in render phase or omit dependencies in useEffect.",
    ],
    codeExample: `const memoizedValue = useMemo(() => computeHeavyStats(items), [items]);`,
    interviewTip: "Fundsroom asks about preventing re-renders in complex dashboard forms and live tables.",
  },
  {
    id: "node-express-architecture",
    category: "Node & Express",
    title: "Express.js REST Architecture & Error Handling",
    keyPoints: [
      "Layered Architecture: Controllers -> Services -> Repositories/DB.",
      "Global Error Handler: Always define `app.use((err, req, res, next) => {...})` at the bottom of middleware stack.",
      "Async Handlers: Use async/await wrapper or express-async-errors to catch unhandled promise rejections.",
      "Status Codes: 200 OK, 201 Created, 400 Bad Request, 401 Unauthorized, 403 Forbidden, 404 Not Found, 500 Internal Server Error.",
    ],
    codeExample: `app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  res.status(500).json({ success: false, message: err.message });
});`,
    interviewTip: "Emphasize input validation (Zod/Joi) and central error handling middleware.",
  },
  {
    id: "postgres-acid-joins",
    category: "PostgreSQL",
    title: "PostgreSQL ACID, Transactions & Joins",
    keyPoints: [
      "ACID Properties: Atomicity, Consistency, Isolation, Durability.",
      "Transactions: `BEGIN; UPDATE ...; UPDATE ...; COMMIT;` (or ROLLBACK on error).",
      "INNER JOIN vs LEFT JOIN: INNER returns matching rows in both; LEFT returns all left rows plus matching right rows.",
      "Indexes: B-tree indexes speed up WHERE, JOIN, and ORDER BY queries significantly.",
    ],
    codeExample: `BEGIN;
UPDATE accounts SET balance = balance - 100 WHERE id = 1;
UPDATE accounts SET balance = balance + 100 WHERE id = 2;
COMMIT;`,
    interviewTip: "Be ready to explain how indexes improve search speeds vs the cost of slower INSERTs.",
  },
  {
    id: "aws-cloud-basics",
    category: "AWS & Cloud",
    title: "AWS Core Services (EC2, S3, RDS, CloudFront)",
    keyPoints: [
      "EC2 (Elastic Compute Cloud): Virtual servers in the cloud running Node.js / Linux binaries.",
      "S3 (Simple Storage Service): Scalable object storage for user image uploads, PDFs, and assets.",
      "RDS (Relational Database Service): Managed PostgreSQL database with automated backups & replicas.",
      "IAM (Identity & Access Management): Managing environment keys and minimal execution roles securely.",
    ],
    interviewTip: "Mention how S3 bucket policies allow signed URLs for secure private file uploads.",
  },
  {
    id: "docker-devops",
    category: "Docker & DevOps",
    title: "Docker Containerization & Compose",
    keyPoints: [
      "Container vs VM: Containers share the host OS kernel and are lightweight (~100MB vs multi-GB VMs).",
      "Dockerfile: Multi-stage builds reduce final production image size (e.g. node:18-alpine).",
      "Docker Compose: Manages multi-container stacks (React + Node API + PostgreSQL DB) with custom network bridges.",
      "Volumes: Persist database data (`postgres_data:/var/lib/postgresql/data`) across container restarts.",
    ],
    codeExample: `version: '3.8'
services:
  backend:
    build: .
    ports: ["3000:3000"]
    environment:
      - DATABASE_URL=postgres://user:pass@db:5432/fundsroom_db`,
    interviewTip: "Highlighting docker-compose shows readiness for working in team dev environments.",
  },
];
