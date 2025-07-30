# School Registry

## ⚙️ Technologies
### Backend
- Java 17
- Spring Boot 3.5.3
- PostgreSQL 15 (via Docker)
- Liquibase
- Gradle
- Lombok 1.18.30

### Frontend
- React 19.1.0
- React DOM 19.1.0
- MUI 7.2.0
- Emotion 11.14.x
- Zod 4.0.5
- Vite 7.0.4

---

## 🚀 Project Setup

### Docker

cd docker

docker compose up -d

### 🔙 Backend

cd school-registry-backend

./gradlew bootRun

The API will be available at: http://localhost:8081.

### 💻 Frontend

cd school-registry-frontend

npm install

npm run dev

The interface will be available at: http://localhost:5173.

### 📌 API Endpoints

GET /schools — get a list of schools with optional filters: region, type, is_active

POST /schools — create a new school

PATCH /schools/{id}/deactivate — deactivate a school

### 🗂 ERD Diagram

The file: ERD_diagram_school.pdf — is located in the project root.
