🎓 SkillSpark Academy – Student Learning Platform

A full-stack Learning Management System (LMS) built using React.js, Node.js, Express.js, MongoDB, and JWT Authentication.

SkillSpark Academy is a learning platform where students can explore courses, enroll in courses, and track their learning progress. Instructors can create, manage, and publish courses.

🔗 GitHub Repository

View the complete project on GitHub

🌐 Project Overview

SkillSpark Academy is a full-stack web application with a separate frontend and backend maintained inside the same GitHub repository.

👨‍🎓 Students can

• Create an account

• Login securely

• Browse courses

• Enroll in courses

• View enrolled courses

• Track learning progress

• Mark lessons as completed

👨‍🏫 Instructors can

• Create courses

• Manage courses

• Publish / Unpublish courses

• View course information

• View course statistics
 
✨ Features

🔐 Authentication & Authorization

• User registration and login

• Password hashing using bcryptjs

• JWT-based authentication

• Protected routes

• Role-based access control

• Student and Instructor roles

📚 Course Management

• Create courses

• Manage courses

• Publish / Unpublish courses

• Browse published courses

• View course details

• Student course enrollment

📈 Progress Tracking

• Automatic progress creation after enrollment

• Mark lessons as completed

• Track completed lessons

• Calculate course progress percentage

• View progress for individual courses
 
⚠️ Error Handling

• Global error handling middleware

• 404 handling for invalid API routes

• Authentication and authorization error handling

• Structured JSON error responses

🎨 Frontend

The frontend is built using React.js, Vite, Tailwind CSS, and React Router.

Frontend includes

Home / Landing Page

Login & Registration

Student Dashboard

Instructor Dashboard

Course Browsing

Course Enrollment

Progress Tracking

Protected Routes

Responsive UI

⚙️ Backend

The backend is built using Node.js and Express.js.

It provides REST APIs for:

Authentication

Authorization

Course Management

Course Enrollment

Progress Tracking

MongoDB is used as the database with Mongoose for database operations.

🛠️ Tech Stack

Frontend

React.js

Vite

JavaScript

Tailwind CSS

React Router

Backend

Node.js

Express.js

MongoDB

Mongoose

JWT

bcryptjs

dotenv

Tools

Git

GitHub

Postman

MongoDB Compass

VS Code

📁 Project Structure

student-learning-platform/
│
├── client/
│   ├── public/
│   ├── src/
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
│
├── server/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   ├── server.js
│   └── package.json
│
├── .gitignore
└── README.md

🔗 API Endpoints

Authentication

POST /api/auth/register
POST /api/auth/login

Courses

GET  /api/courses
POST /api/courses
POST /api/courses/:id/enroll

Progress

POST /api/progress/complete
GET  /api/progress/:courseId

Protected APIs require:

Authorization: Bearer <JWT_TOKEN>

⚙️ Installation & Setup

Prerequisites

Node.js

npm

MongoDB

Git

1. Clone the Repository

git clone https://github.com/bhardwajshivang57-spec/student-learning.git
cd student-learning

2. Backend Setup

cd server
npm install
npm run dev

Backend runs on:

http://localhost:5000

3. Frontend Setup

Open a new terminal:

cd client
npm install
npm run dev

Frontend runs on:

http://localhost:5173

🔑 Environment Variables

Create a .env file inside the server folder:

PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
NODE_ENV=development

⚠️ Never upload the actual .env file or MongoDB credentials to GitHub.

Your .gitignore should contain:

node_modules/
.env
dist/

🧪 API Testing

The backend APIs were tested using Postman.

Testing included:

Registration

Login

JWT authentication

Course creation

Course retrieval

Course enrollment

Progress tracking

Protected routes

Error handling

🧠 Learning Outcomes

This project provided practical experience in:

Full-stack web development

React.js

REST API development

JWT authentication

Role-based authorization

MongoDB & Mongoose

Frontend-backend integration

Course management

Student enrollment

Progress tracking

Error handling

Git & GitHub

🚀 Future Enhancements

Video-based lessons

Online quizzes

Course reviews & ratings

Payment integration

Course search & filtering

Certificates

Notifications

Admin dashboard

Advanced analytics

👨‍💻 Author

Shivang Bhardwaj

B.Tech CSE – Data Science

Skills: React.js • JavaScript • Node.js • Express.js • MongoDB • Full-Stack Development

⭐ Project Highlights

SkillSpark Academy demonstrates a complete full-stack Learning Management System with:

Modern React frontend

Node.js & Express backend

MongoDB database

JWT authentication

Role-based authorization

Course management

Student enrollment

Learning progress tracking

REST APIs

Responsive user interface

📌 Project Objective

The objective of SkillSpark Academy is to provide a structured digital learning platform where students can:

Discover → Enroll → Learn → Track Progress

while instructors can create and manage educational courses.