require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

// routes
const authRoutes = require("./routes/authRoutes");
const testRoutes = require("./routes/testRoutes");
const courseRoutes = require("./routes/courseRoutes");
const progressRoutes = require("./routes/progressRoutes");

// error middleware
const { notFound, errorHandler } = require("./middleware/errorMiddleware");

const app = express();

// connect to database
connectDB();

// middleware
app.use(
  cors({
    origin: "http://localhost:5173", // frontend URL
    credentials: true,
  })
);

app.use(express.json());

// routes
app.use("/api/auth", authRoutes);
app.use("/api/test", testRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/progress", progressRoutes);



// test route
app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

// ❗ ERROR MIDDLEWARE (ALWAYS LAST)
app.use(notFound);
app.use(errorHandler);


// port
const PORT = process.env.PORT || 5000;

// start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
