# Full-Stack Developer Portfolio (MERN)

A modern, scalable **Full-Stack Developer Portfolio** built using the **MERN stack**, designed to showcase projects, skills, and experience in a clean, professional, and production-ready manner.

This portfolio is not a static website — it is a **full-stack application** with a backend API, database integration, authentication, and dynamic project management.

---

## 🚀 Features

- Dynamic project showcase powered by MongoDB
- Secure authentication using JWT
- RESTful APIs with Express.js
- Responsive frontend built with React & Tailwind CSS
- Smooth animations using Framer Motion & GSAP
- Scalable architecture to add more projects easily
- Contact form with backend handling
- Environment-based configuration for production readiness

---

## 🛠 Tech Stack

### Frontend
- React (Vite)
- Tailwind CSS
- Framer Motion
- GSAP
- React Router
- Axios

### Backend
- Node.js
- Express.js
- MongoDB & Mongoose
- JWT Authentication
- bcryptjs
- dotenv
- CORS

---

## 🏗 Architecture Overview

- **Frontend** communicates with backend via REST APIs
- **Backend** handles authentication, project data, and contact submissions
- **MongoDB** stores project and user data
- JWT protects sensitive routes
- Modular folder structure for scalability

---

## 📂 Project Structure
portfolio/
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   ├── components/
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── public/
│
├── backend/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   └── server.js

---

## 🔐 Authentication

- JWT-based authentication
- Protected routes using middleware
- Password hashing with bcrypt

---

## 📈 Scalability

This project is built with scalability in mind:
- New projects can be added without changing frontend code
- Backend APIs are modular
- Can be extended into an admin dashboard
- Supports future automation from GitHub repositories

---

## 🧠 What This Project Demonstrates

- Full-stack application development
- Clean API design
- Database schema modeling
- Secure authentication
- Frontend animation & UI skills
- Real-world project structuring

---

## 📬 Contact

Feel free to connect with me for collaboration or opportunities.

GitHub: https://github.com/SuryaPanduri

---

## ⚙️ Local Setup

### 1) Install dependencies

```bash
cd backend && npm install
cd ../frontend && npm install
```

### 2) Configure environment variables

Backend (`backend/.env`)

```env
PORT=5000
MONGO_URI=<your_mongodb_connection_string>
JWT_SECRET=<your_jwt_secret>
FRONTEND_ORIGIN=http://localhost:5173
EMAIL_HOST=<smtp_host>
EMAIL_PORT=587
EMAIL_USER=<smtp_user>
EMAIL_PASS=<smtp_password>
```

Frontend (`frontend/.env`)

```env
VITE_API_BASE=http://localhost:5000/api
VITE_RESUME_URL=<optional_resume_url>
```

### 3) Run development servers

```bash
# terminal 1
cd backend && npm run dev

# terminal 2
cd frontend && npm run dev
```
