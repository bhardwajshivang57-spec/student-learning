🎓 Student Learning Platform – Backend

A RESTful backend for a Student Learning Platform (LMS) built using Node.js, Express, MongoDB, and JWT Authentication.
This backend handles authentication, course management, student enrollment, and progress tracking.

🚀 Features
🔐 Authentication & Authorization

User Registration & Login

Password hashing using bcrypt

JWT-based authentication

Role-based access (Student / Instructor)

📚 Course Management

Instructor can create courses

Publish / Unpublish courses

Public API to fetch published courses

Instructor dashboard with course stats

Students can enroll in courses

👩‍🎓 Student Enrollment

Secure course enrollment

Prevent duplicate enrollments

Fetch enrolled courses for students

📈 Progress Tracking

Auto-create progress on course enrollment

Mark lessons as completed

Progress percentage calculation

Fetch progress for a specific course

⚠️ Error Handling

Global error handling middleware

404 handling for invalid routes

Clean JSON error responses

🛠️ Tech Stack

Node.js

Express.js

MongoDB + Mongoose

JWT (jsonwebtoken)

bcryptjs

dotenv

Postman (for API testing)

📁 Folder Structure
server/
│
├── config/
│   └── db.js
│
├── controllers/
│   ├── authController.js
│   ├── courseController.js
│   └── progressController.js
│
├── middleware/
│   ├── authMiddleware.js
│   └── errorMiddleware.js
│
├── models/
│   ├── User.js
│   ├── Course.js
│   └── Progress.js
│
├── routes/
│   ├── authRoutes.js
│   ├── courseRoutes.js
│   └── progressRoutes.js
│
├── .env
├── server.js
└── package.json

⚙️ Environment Variables

Create a .env file in the server folder:

PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
NODE_ENV=development

▶️ How to Run the Backend
1️⃣ Install dependencies
npm install

2️⃣ Start the server
npm run dev


Server will run on:

http://localhost:5000

🧪 API Testing

All APIs were tested using Postman.

Example APIs:

POST /api/auth/register

POST /api/auth/login

GET /api/courses

POST /api/courses/:id/enroll

POST /api/progress/complete

GET /api/progress/:courseId

Protected routes require:

Authorization: Bearer <JWT_TOKEN>

🧠 Learning Outcomes

Built a real-world LMS backend

Understood JWT authentication flow

Learned MongoDB relationships & population

Implemented progress tracking logic

Debugged and handled real backend edge cases

📌 Future Enhancements (Optional)

Lesson & Video models

Payment integration

Admin dashboard

Course reviews & ratings

Pagination & search

👤 Author

Shivang Bhardwaj
📧 Email: bhardwajshivang57@gmail.com

💻 Backend Developer | MERN Stack Learner

⭐ Final Note

This backend is fully functional, scalable, and resume-ready, built with proper architecture and best practices.