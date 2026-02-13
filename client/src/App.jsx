import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./routes/ProtectedRoute";
import Navbar from "./components/Navbar";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import Courses from "./pages/Courses/Courses";
import Dashboard from "./pages/Dashboard/Dashboard";
import Learn from "./pages/Learn/Learn";
import CreateCourse from "./pages/CreateCourse/CreateCourse";


function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<ProtectedRoute> <Dashboard /></ProtectedRoute>} />
          <Route path="/learn" element={<ProtectedRoute> <Learn /></ProtectedRoute>} />
          <Route path="/create-course" element={<ProtectedRoute> <CreateCourse /></ProtectedRoute>} />
          <Route path="/courses" element={<Courses />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
