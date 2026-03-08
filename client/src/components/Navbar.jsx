import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import logo from "../assets/logo.jpg";
import logoDark from "../assets/logo-dark.png";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const isLoggedIn = !!user;

  return (
    <header
      className={`w-full sticky top-0 z-50 shadow-sm ${
  isLoggedIn
    ? "bg-gradient-to-r from-black to-[#0f172a]"
    : "bg-white"
}`}
    >
      <div className="w-full px-6">
        <div className="flex items-center h-20">
          {/* LOGO */}
          <Link to="/" className="flex items-center">
            <img
              src={isLoggedIn ? logoDark : logo}
              alt="SkillSpark Academy"
              className={`object-contain rounded ${
                isLoggedIn ? "h-20 w-auto" : "w-auto h-10"
              }`}
            />
          </Link>

          {/* NAV LINKS */}
          <nav
            className={`flex items-center gap-8 ml-auto text-sm font-medium ${
              isLoggedIn ? "text-gray-200" : "text-gray-700"
            }`}
          >
            {/* COMMON */}
            <Link
              to="/courses"
              className="hover:text-blue-500 transition"
            >
              Courses
            </Link>

            <Link
              to="/about"
              className="hover:text-blue-500 transition"
            >
              About Us
            </Link>

            <Link
              to="/profile"
              className="hover:text-blue-500 transition"
            >
              Profile
            </Link>

            {/* STUDENT */}
            {user?.role === "student" && (
              <>
                <Link
                  to="/dashboard"
                  className="hover:text-blue-500 transition"
                >
                  Dashboard
                </Link>

                <Link
                  to="/my-courses"
                  className="hover:text-blue-500 transition"
                >
                  My Courses
                </Link>
              </>
            )}

            {/* TEACHER */}
            {user?.role === "instructor" && (
              <>
                <Link
                  to="/create-course"
                  className="hover:text-blue-500 transition"
                >
                  Create Course
                </Link>

                <Link
                  to="/dashboard"
                  className="hover:text-blue-500 transition"
                >
                  Dashboard
                </Link>
              </>
            )}

            {/* AUTH */}
            {user ? (
              <button
                onClick={handleLogout}
                className="text-red-400 hover:underline"
              >
                Logout
              </button>
            ) : (
              <Link
                to="/login"
                className="hover:text-blue-600 transition"
              >
                Login
              </Link>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}