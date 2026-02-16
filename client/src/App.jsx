import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import ProtectedRoute from "./routes/ProtectedRoute";

import Navbar from "./components/Navbar";
import Loader from "./components/Loader";

import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";

import Courses from "./pages/Courses/Courses";
import CourseDetail from "./pages/Courses/CourseDetail";

import Dashboard from "./pages/Dashboard/Dashboard";
import Learn from "./pages/Learn/Learn";
import Profile from "./pages/Profile/Profile";
import CreateCourse from "./pages/CreateCourse/CreateCourse";
import MyCourses from "./pages/student/MyCourses";

/* 🔥 Separate wrapper to access auth loading state */
function AppRoutes() {
  const { loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <Loader />
      </div>
    );
  }

  return (
    <>
      <Navbar />

      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/courses/:id" element={<CourseDetail />} />
        <Route path="/my-courses" element={<MyCourses />} />

        {/* Protected Routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/learn/:id"
          element={
            <ProtectedRoute>
              <Learn />
            </ProtectedRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

        <Route
          path="/create-course"
          element={
            <ProtectedRoute>
              <CreateCourse />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppRoutes />
      </Router>
    </AuthProvider>
  );
}

export default App;
