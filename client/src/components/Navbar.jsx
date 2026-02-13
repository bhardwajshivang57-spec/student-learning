import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import logo from "../assets/logo.jpg";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="w-full bg-white shadow-sm sticky top-0 z-50">
      <div className="w-full px-6">
        <div className="flex items-center h-20">
          {/* LOGO */}
          <Link to="/" className="flex items-center">
            <img
              src={logo}
              alt="SkillSpark Academy"
              className="h-10 w-auto object-contain"
            />
          </Link>

          {/* NAV LINKS */}
          <nav className="flex items-center gap-8 ml-auto text-sm font-medium text-gray-700">
            {/* COMMON */}
            <Link to="/courses" className="hover:text-blue-600">
              Courses
            </Link>

            <Link to="/about" className="hover:text-blue-600">
              About Us
            </Link>

            {/* STUDENT */}
            {user?.role === "student" && (
              <>
                <Link to="/dashboard" className="hover:text-blue-600">
                  Dashboard
                </Link>

                <Link to="/my-courses" className="hover:text-blue-600">
                  My Courses
                </Link>
              </>
            )}

            {/* TEACHER */}
            {user?.role === "instructor" && (
              <>
                <Link to="/create-course" className="hover:text-blue-600">
                  Create Course
                </Link>

                <Link to="/dashboard" className="hover:text-blue-600">
                  Dashboard
                </Link>
              </>
            )}

            {/* AUTH */}
            {user ? (
              <button
                onClick={handleLogout}
                className="text-red-500 hover:underline"
              >
                Logout
              </button>
            ) : (
              <Link to="/login" className="hover:text-blue-600">
                Login
              </Link>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}
