# 🚀 Smart To-Do List

A modern full-stack to-do list application with AI-powered task generation.

Built with **Next.js, NestJS, Prisma, and Docker**, this project allows users to manage tasks manually or generate them intelligently using AI.

---

## ✨ Features

- ✅ Create, complete, and delete tasks
- 🤖 Generate tasks using AI (OpenAI)
- 🧩 Modular architecture with NestJS
- 📄 API documentation with Swagger (`http://localhost:3001/api`)
- 🧪 Unit tests (Jest)
- 🔐 Optional API key input (local or environment-based)
- 🎨 Modern UI with smooth interactions
- 📦 Fully dockerized (run everything with one command)
- 💾 Persistent storage using Prisma + SQLite

---

## 🧠 AI Integration

Users can describe a goal like:

> "Plan a trip to Japan"

And the app will generate structured actionable tasks automatically.

---

## 🏗️ Tech Stack

### Frontend

- Next.js 16
- React
- TailwindCSS

### Backend

- NestJS
- Prisma ORM
- SQLite

### DevOps

- Docker & Docker Compose

---

## 📁 Project Structure

```
smart-to-do-list/
│
├── backend/
│   ├── src/
│   ├── prisma/
│   ├── .env
│   └── Dockerfile
│
├── frontend/
│   ├── app/
│   ├── services/
│   ├── .env.local
│   └── Dockerfile
│
├── docker-compose.yml
└── README.md
```

---

## ⚙️ Environment Variables

### Backend (`backend/.env`)

```
DATABASE_URL="file:./dev.db"
OPENAI_API_KEY=your_api_key_here
FRONTEND_URL=http://localhost:3000
```

### Frontend (`frontend/.env.local`)

```
NEXT_PUBLIC_API_URL=http://localhost:3001
```

---

## 🐳 Running with Docker (Recommended)

### 1. Clone the repository

```bash
git clone https://github.com/your-username/smart-to-do-list.git
cd smart-to-do-list
```

---

### 2. Configure environment variables

Create:

```
backend/.env
frontend/.env.local
```

---

### 3. Run the application

```bash
docker-compose up --build
```

---

### 4. Access the app

- Frontend: http://localhost:3000
- Backend: http://localhost:3001

---

## 💻 Running without Docker

### Backend

```bash
cd backend
yarn install
yarn prisma migrate dev
yarn start:dev
```

---

### Frontend

```bash
cd frontend
yarn install
yarn dev
```

---

## 🧪 Testing AI Behavior

| Scenario        | Expected Behavior |
| --------------- | ----------------- |
| No API key      | Error message     |
| Invalid API key | OpenAI error      |
| Valid API key   | Tasks generated   |

---

## 🎯 Key Decisions

- API key can be provided via UI or environment
- Backend handles all AI logic securely
- Frontend remains stateless regarding AI provider
- Docker used to simplify full-stack setup

---

## 🚀 Future Improvements

- Authentication
- Deploy (Vercel + Railway)
- Better AI prompt customization

---

## 👨‍💻 Author

Pedro Fernandes

---

## 📄 License

MIT
