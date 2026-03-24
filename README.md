# 🧠 Smart To-Do List API

An AI-powered task management API built with **NestJS**, **Prisma**, and **OpenAI**.

---

## 🚀 Features

- ✅ Create, list, update, and delete tasks (CRUD)
- 🤖 AI-powered task generation
- 🧩 Modular architecture with NestJS
- 📄 API documentation with Swagger
- 🛡️ Input validation using DTOs
- 🧪 Unit tests (Jest)
- 🐳 Dockerized environment

---

## 🛠️ Tech Stack

- **Backend:** NestJS
- **Database:** SQLite (via Prisma ORM)
- **AI Integration:** OpenAI API
- **Validation:** class-validator
- **Documentation:** Swagger
- **Testing:** Jest
- **Containerization:** Docker + Docker Compose

---

## 📦 Project Structure

```
backend/
  src/
    tasks/
    prisma/
    ai/
  prisma/
    schema.prisma
    migrations/
```

---

## ⚙️ Setup & Run

### 🔧 1. Clone the repository

```
git clone <your-repo-url>
cd smart-to-do-list
```

---

### 🐳 2. Run with Docker

```
docker-compose up --build
```

---

### 🌐 API will be available at:

```
http://localhost:3000
```

### 📄 Swagger docs:

```
http://localhost:3000/api
```

---

## 🧠 AI Endpoint

### POST `/ai/generate`

Generates tasks from a given prompt using OpenAI.

### Example request:

```json
{
  "prompt": "Plan a trip to Japan"
}
```

---

## 📌 Notes

- The database is automatically created using Prisma migrations.
- No manual database setup is required.
- AI responses are validated and parsed safely before being stored.

---

## 🔐 Environment Variables

The project uses two `.env` files:

### 1. Backend environment (`/backend/.env`)

Used by NestJS and Prisma:

```env
DATABASE_URL="file:./dev.db"
OPENAI_API_KEY=your_api_key_here
```

---

### 2. Root environment (`/.env`)

Used by Docker Compose:

```env
OPENAI_API_KEY=your_api_key_here
```

---

⚠️ Notes:

- Do not commit `.env` files to version control.
- Both files are required when running the project with Docker.

---

## 🧪 Running Tests

```
cd backend
yarn test
```

---

## 🧠 Design Decisions

- SQLite was chosen for simplicity and portability.
- Prisma ensures type safety and easy migrations.
- Migrations are executed on container startup to guarantee reproducibility.
- AI responses are validated to handle non-deterministic outputs.

---

## 🚀 Future Improvements

- Frontend (Next.js)
- Authentication
- PostgreSQL with Docker
- Rate limiting
- Better AI prompt engineering

---

## 👨‍💻 Author

Pedro Fernandes
