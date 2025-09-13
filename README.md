# Full-Stack Course Feedback App

This repository contains a full-stack web app (Node/Express + MongoDB backend, React + Vite frontend) for submitting and managing course feedback.

## Quick setup

1. Clone or extract the project.
2. Backend:
   - cd backend
   - copy `.env.example` to `.env` and set `MONGO_URI` and `JWT_SECRET`.
   - npm install
   - npm run dev
3. Frontend:
   - cd frontend
   - npm install
   - npm run dev

Frontend expects the backend at http://localhost:5000 by default. You can change this by creating a `.env` file in the `frontend` folder with `VITE_API_BASE`.

Enjoy!
