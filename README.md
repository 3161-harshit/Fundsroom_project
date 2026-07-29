<h1 align="center">🚀 TaskFlow – Team Task Management System</h1>

<p align="center">
<b>Full Stack Web Application & Backend Service</b><br>
Designed for Software Engineering Placement Drives
</p>

<p align="center">

![React](https://img.shields.io/badge/React-18-61DAFB?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript)
![NodeJS](https://img.shields.io/badge/Node.js-20-339933?logo=node.js)
![Express](https://img.shields.io/badge/Express.js-Backend-black)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15-4169E1?logo=postgresql)
![Docker](https://img.shields.io/badge/Docker-Ready-2496ED?logo=docker)
![Gemini](https://img.shields.io/badge/Gemini-AI-blueviolet)
![License](https://img.shields.io/badge/License-MIT-red)

</p>

---

# 📌 Project Overview

TaskFlow is a **modern Full Stack Team Task Management System** developed for software engineering placement interviews.

It demonstrates enterprise software development using **React, Express.js, PostgreSQL, Docker, JWT Authentication, TypeScript**, and **Google Gemini AI**.

The application enables teams to manage projects, assign tasks, monitor progress, and collaborate efficiently while showcasing production-level architecture.

---

# ✨ Features

- ✅ User Authentication (JWT)
- ✅ Secure Password Hashing
- ✅ Project Management
- ✅ Task Assignment
- ✅ Priority Management
- ✅ Status Tracking
- ✅ PostgreSQL Database
- ✅ REST API
- ✅ Docker Containerization
- ✅ Responsive React UI
- ✅ Gemini AI Integration
- ✅ Clean Modular Architecture

---

# 🏗️ System Architecture

```
                        CLIENT (React + TypeScript)
                                   │
                          HTTP REST API
                                   │
                ┌──────────────────┴──────────────────┐
                │                                     │
        Express Backend                      Gemini AI API
                │
                │
          PostgreSQL Database
```

---

# ⚙️ Technology Stack

| Technology | Purpose |
|------------|---------|
| React 18 | Frontend |
| TypeScript | Type Safety |
| Tailwind CSS | Styling |
| Express.js | Backend |
| Node.js | Runtime |
| PostgreSQL | Database |
| JWT | Authentication |
| Docker | Containerization |
| Gemini API | AI Features |

---

# 🗄️ Database Design

Main Tables

- Users
- Projects
- Tasks
- Login History

### Relationships

```
Users
   │
   ├────────── Projects
                    │
                    ├──────── Tasks
```

Composite indexing is used to improve task filtering performance.

---

# 🔌 REST API

| Method | Endpoint | Description |
|---------|----------|-------------|
| GET | /api/tasks | Get Tasks |
| POST | /api/tasks | Create Task |
| PUT | /api/tasks/:id | Update Task |
| DELETE | /api/tasks/:id | Delete Task |
| POST | /api/admin/login | Admin Login |
| GET | /api/system/info | System Information |

---

# 🐳 Docker Architecture

```
Docker Compose

├── Frontend Container
│
├── Backend Container
│
└── PostgreSQL Container
```

One command starts the complete application.

```
docker-compose up
```

---

# 📂 Project Structure

```
TaskFlow
│
├── client
│   ├── src
│   ├── components
│   ├── pages
│   └── assets
│
├── server
│   ├── routes
│   ├── middleware
│   ├── controllers
│   ├── database
│   └── models
│
├── docker-compose.yml
├── package.json
├── README.md
└── .env.example
```

---

# 🚀 Installation

## Clone Repository

```bash
git clone https://github.com/YOUR_USERNAME/taskflow.git

cd taskflow
```

Install packages

```bash
npm install
```

Create environment file

```env
PORT=3000

DATABASE_URL=your_database_url

JWT_SECRET=your_secret

GEMINI_API_KEY=your_api_key
```

Run

```bash
npm run dev
```

---

# 📸 Screenshots

### Home Page

> Add screenshot here

---

### Dashboard

> Add screenshot here

---

### Task Board

> Add screenshot here

---

# 📈 Future Improvements

- Notification System
- Email Integration
- Team Chat
- Calendar View
- File Uploads
- Analytics Dashboard
- AI Project Suggestions

---

# 🎯 Why This Project?

This project demonstrates:

- Full Stack Development
- REST API Design
- Authentication
- Database Design
- Docker Deployment
- Enterprise Folder Structure
- Production Ready Code
- AI Integration

Perfect for:

- Software Engineering Placements
- Portfolio Projects
- GitHub Showcase
- Resume
- Interviews

---

# ⭐ Repository Statistics

If you found this project useful,

⭐ Star this repository

🍴 Fork this repository

📢 Share with others

---

# 👨‍💻 Author

**Harshit**

B.Tech CSE

KIIT University

---

<p align="center">

Made with ❤️ using React • Node.js • PostgreSQL • Docker

</p>
