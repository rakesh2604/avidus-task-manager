# Task Manager — RBAC System

A full-stack MERN application with role-based access control, task management, and admin dashboard.

## Features

**Backend**
- JWT authentication (register / login)
- Role-based middleware: Admin vs User
- Admin APIs: view/delete/update-status users
- Task CRUD with ownership enforcement
- Activity logging: login, task create/update/delete
- Analytics dashboard endpoint

**Frontend**
- Login & Register pages
- Role-aware routing (Admin → admin dashboard, User → user dashboard)
- User dashboard: create, edit, delete, filter tasks
- Admin dashboard: analytics cards, recent activity feed
- User Management: search, filter, activate/deactivate, delete users
- Task Monitoring: view all tasks with status filter
- Activity Logs: filterable log viewer with pagination

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Backend | Node.js, Express 5, Mongoose |
| Frontend | React 18, Vite, React Router v6 |
| Database | MongoDB Atlas |
| Auth | JWT (24h expiry) |
| Styling | Tailwind CSS v4 |

## Getting Started

### Prerequisites
- Node.js 18+
- MongoDB Atlas cluster (free tier works)

### Backend Setup

```bash
cd backend
cp .env.example .env
# Fill in MONGO_URI and JWT_SECRET in .env
npm install
npm run seed      # creates admin@example.com / admin123
npm run dev
```

Server runs on `http://localhost:5000`

### Frontend Setup

```bash
cd frontend
cp .env.example .env
# VITE_API_URL=http://localhost:5000/api
npm install
npm run dev
```

App runs on `http://localhost:5173`

## Test Accounts

| Role | Email | Password |
|------|-------|----------|
| Admin | admin@example.com | admin123 |
| User | register via /register | — |

## API Reference

### Auth
| Method | Route | Access |
|--------|-------|--------|
| POST | /api/auth/register | Public |
| POST | /api/auth/login | Public |
| GET | /api/auth/me | Protected |

### Users (Admin only)
| Method | Route | Action |
|--------|-------|--------|
| GET | /api/users | List all users |
| GET | /api/users/:id | Get user |
| PATCH | /api/users/:id/status | Activate/Deactivate |
| DELETE | /api/users/:id | Delete user |

### Tasks
| Method | Route | Access |
|--------|-------|--------|
| GET | /api/tasks | User: own tasks, Admin: all tasks |
| POST | /api/tasks | Create (User/Admin) |
| PATCH | /api/tasks/:id | Update own task |
| DELETE | /api/tasks/:id | Delete own task |

### Admin only
| Method | Route | Action |
|--------|-------|--------|
| GET | /api/logs | Activity logs (paginated, filterable) |
| GET | /api/analytics/dashboard | Dashboard stats |

## Project Structure

```
backend/
├── config/db.js
├── controllers/       authController, userController, taskController, logController, analyticsController
├── middleware/        auth.js (protect), roleCheck.js (adminOnly), errorHandler.js
├── models/            User.js, Task.js, ActivityLog.js
├── routes/            authRoutes, userRoutes, taskRoutes, logRoutes, analyticsRoutes
├── utils/             generateToken.js, seedAdmin.js
└── server.js

frontend/src/
├── components/
│   ├── admin/         AnalyticsCards, UserTable, TaskMonitor, ActivityLogViewer
│   ├── common/        Navbar, Button, Card, Modal, Loader
│   └── user/          TaskList, TaskCard, TaskForm
├── context/           AuthContext.jsx
├── pages/             Login, Register, Dashboard, AdminDashboard, UserDashboard,
│                      UserManagement, TaskManagement, ActivityLogs, MyTasks, NotFound
├── services/          api.js, authService, taskService, userService, logService, analyticsService
└── utils/             PrivateRoute.jsx, AdminRoute.jsx
```
