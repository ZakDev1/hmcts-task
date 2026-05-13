# HMCTS Task Manager

A full-stack task management system built for HMCTS caseworkers to efficiently create, view, update, and delete tasks.

## Tech Stack

**Backend**
- Node.js + Express + TypeScript
- PostgreSQL + Prisma ORM
- Zod for validation
- Jest for unit testing

**Frontend**
- React + TypeScript + Vite
- GOV.UK Frontend Design System
- Axios for API calls
- Zod for client-side validation

**Infrastructure**
- Docker + Docker Compose

## Getting Started

### With Docker (recommended)

The easiest way to run the full stack. Make sure you have Docker or OrbStack installed.

```bash
git clone https://github.com/ZakDev1/hmcts-task
cd hmcts-task
docker compose up --build
```

Then visit:
- **Frontend**: http://localhost:5173
- **Backend**: http://localhost:3000
- **Health check**: http://localhost:3000/health

Docker Compose will automatically:
- Start a PostgreSQL database
- Run all database migrations
- Start the backend API
- Start the frontend

### Without Docker

**Prerequisites**
- Node.js 20+
- PostgreSQL running locally

**Backend**
```bash
cd backend
npm install
cp .env.example .env
# Update DATABASE_URL in .env with your local Postgres credentials
npx prisma migrate deploy
npm run dev
```

**Frontend**
```bash
cd frontend
npm install
cp .env.example .env
npm run dev
```

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /health | Health check |
| POST | /api/tasks | Create a task |
| GET | /api/tasks | Get all tasks |
| GET | /api/tasks/:id | Get a task by ID |
| PATCH | /api/tasks/:id/status | Update task status |
| DELETE | /api/tasks/:id | Delete a task |

### Example request — Create a task

```bash
curl -X POST http://localhost:3000/api/tasks \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Review case documents",
    "description": "Review all documents submitted for case #1234",
    "status": "PENDING",
    "dueDate": "2026-06-01T10:00:00.000Z"
  }'
```

### Example response

```json
{
  "id": "e2b3c4d5-...",
  "title": "Review case documents",
  "description": "Review all documents submitted for case #1234",
  "status": "PENDING",
  "dueDate": "2026-06-01T10:00:00.000Z",
  "createdAt": "2026-05-13T18:00:00.000Z",
  "updatedAt": "2026-05-13T18:00:00.000Z"
}
```

## Running Tests

```bash
cd backend
npm test
```

## Validation

Validation is enforced on both the frontend and backend using Zod schemas, ensuring data integrity regardless of how the API is accessed.

**Task rules:**
- Title is required and cannot be empty
- Description is optional
- Status must be one of: `PENDING`, `IN_PROGRESS`, `COMPLETED`
- Due date must be a valid ISO datetime

## Production Considerations

This project was scoped as a technical challenge. In a production environment the following would be added:

- **Authentication** — JWT or OAuth2 to secure endpoints and identify caseworkers
- **Authorisation** — role-based access control so caseworkers only see their own tasks
- **Redis** — caching frequently accessed task lists to reduce database load
- **Kubernetes** — container orchestration for scaling, rolling deployments, and resilience
- **CI/CD pipeline** — automated testing and deployment via GitHub Actions
- **Logging and monitoring** — structured logging and alerting for production observability
