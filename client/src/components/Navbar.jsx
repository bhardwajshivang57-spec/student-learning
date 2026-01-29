import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import logo from "../assets/logo.jpg";

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <header className="w-full bg-white shadow-sm">
      <div className="w-full px-6">
        <div className="flex items-center h-20">

          {/* LOGO – LEFT CORNER */}
          <Link to="/" className="flex items-center">
            <img
              src={logo}
              alt="SkillSpark Academy"
              className="h-10 w-auto object-contain"
            />
          </Link>

          {/* NAV LINKS – RIGHT CORNER */}
          <nav className="flex items-center gap-8 ml-auto text-sm font-medium text-gray-700">
            <Link to="/courses" className="hover:text-blue-600">
              Courses
            </Link>
            <Link to="/about" className="hover:text-blue-600">
              About Us
            </Link>

            {user?.role === "student" && (
              <>
                <Link to="/dashboard" className="hover:text-blue-600">
                  Dashboard
                </Link>
                <Link to="/my-courses" className="hover:text-blue-600">
                  My Courses
                </Link>
                <button
                  onClick={logout}
                  className="text-red-500 hover:underline"
                >
                  Logout
                </button>
              </>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}
