# Repository Structure

Reference for where code and configuration live as features are added on branches.

## Top level

| Path | Role |
|------|------|
| `backend/` | Express API, models, auth, business logic |
| `frontend/` | React SPA, routing, UI |
| `docs/` | Workflow and structure documentation |
| `.github/` | PR templates and (future) CI workflows |
| `package.json` | Root scripts to install and run both apps |

## Backend layout

```
backend/
├── config/          # DB connection, shared config
├── controllers/     # HTTP handlers per resource
├── middleware/      # auth, roleCheck, errorHandler
├── models/          # User, Task, ActivityLog
├── routes/          # Route mounting
├── utils/           # token generation, seeds
├── server.js        # App bootstrap
├── .env.example
└── package.json
```

## Frontend layout

```
frontend/src/
├── components/
│   ├── admin/       # Admin-only widgets
│   ├── common/      # Shared UI (layout, buttons, modals)
│   └── user/        # User task components
├── context/         # Auth and global UI state
├── pages/           # One file per route/view
├── services/        # Axios API modules
├── utils/           # PrivateRoute, AdminRoute
├── App.jsx          # Routes
└── main.jsx         # Entry
```

## Suggested feature branch mapping

| Branch (example) | Primary paths |
|------------------|---------------|
| `feature/jwt-authentication` | `backend/middleware/auth.js`, `backend/routes/authRoutes.js`, `frontend/src/context/AuthContext.jsx` |
| `feature/task-crud` | `backend/controllers/taskController.js`, `frontend/src/components/user/` |
| `feature/admin-dashboard` | `frontend/src/pages/AdminDashboard.jsx`, `frontend/src/components/admin/` |
| `feature/activity-logging` | `backend/models/ActivityLog.js`, `frontend/src/pages/ActivityLogs.jsx` |

Keep each PR touching only the paths needed for that milestone.
