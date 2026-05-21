# Contributing Guide

Thank you for contributing. This document defines how we branch, name commits, and open pull requests so `main` stays clean and reviewable.

## Branch Strategy

| Branch | Purpose |
|--------|---------|
| `main` | Stable, integration-ready code only |
| `feature/*` | New functionality |
| `fix/*` | Bug fixes |
| `chore/*` | Tooling, docs, config (no behavior change) |
| `refactor/*` | Internal restructuring without feature changes |

### Workflow

1. Sync with `main`:
   ```bash
   git checkout main
   git pull origin main
   ```
2. Create a focused branch:
   ```bash
   git checkout -b feature/auth-jwt-setup
   ```
3. Commit in small, logical units with clear messages.
4. Push and open a pull request against `main`.
5. Squash or merge after review; delete the branch when done.

## Branch Naming Convention

```
<type>/<short-kebab-description>
```

**Examples**

| Branch | Use case |
|--------|----------|
| `feature/jwt-authentication` | Login, register, token middleware |
| `feature/admin-dashboard` | Admin UI and APIs |
| `feature/task-crud` | Task create/read/update/delete |
| `feature/activity-logging` | Audit log capture and viewer |
| `feature/analytics-api` | Dashboard metrics endpoint |
| `fix/cors-origin-config` | Configuration bug fix |
| `chore/readme-and-gitignore` | Repository scaffolding |

Use lowercase and hyphens. Keep names under ~50 characters and specific to one deliverable.

## Commit Messages

Follow [Conventional Commits](https://www.conventionalcommits.org/) where practical:

```
feat(auth): add JWT login endpoint
fix(tasks): enforce owner on delete
docs(readme): add environment setup section
chore(deps): bump mongoose to 9.x
```

Types: `feat`, `fix`, `docs`, `chore`, `refactor`, `test`, `style`.

## Pull Requests

- One feature or fix per PR
- Link related issues or assessment tasks when applicable
- Include a short **test plan** (manual steps or commands run)
- Ensure `.env` files are not included
- Request review before merging to `main`

Use the [pull request template](../.github/pull_request_template.md) when opening a PR.

## Local Setup Checklist

- [ ] Node.js 18+
- [ ] `backend/.env` from `backend/.env.example`
- [ ] `frontend/.env` from `frontend/.env.example`
- [ ] MongoDB reachable
- [ ] `npm run install:all` completed
- [ ] Backend and frontend dev servers start without errors

## Code Organization

- **Backend**: controllers stay thin; business rules in services or models as the project grows
- **Frontend**: pages compose components; API calls live in `src/services/`
- **Shared contracts**: keep request/response shapes consistent between client and API

## What Not to Commit

- `.env` or credentials
- `node_modules/`
- Assignment PDFs, pasted notes, or `scratch/` experiments
- Large generated build artifacts (`dist/`, unless releasing)
