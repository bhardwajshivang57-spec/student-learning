import { useState } from "react";
import { Link } from "react-router-dom";
import bgLogin from "../../assets/bglogin.jpg";
import logo from "../../assets/logo.jpg";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [role, setRole] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  // 🔑 BACKEND CONNECTED LOGIN
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Please fill all fields");
      return;
    }

    try {
      setLoading(true);

      // backend login
      const userData = await login({
        email,
        password,
      });

      // role based redirect
        navigate("/dashboard");
    } catch (error) {
      alert(error?.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen w-full bg-cover bg-center relative"
      style={{ backgroundImage: `url(${bgLogin})` }}
    >
      {/* DARK OVERLAY */}
      <div className="absolute inset-0 bg-black/30"></div>

      {/* CONTENT */}
      <div className="relative z-10 min-h-screen flex items-center justify-end px-6 md:px-24">
        {/* LOGIN CARD */}
        <div className="bg-white w-[350px] min-h-[480px] rounded-2xl shadow-2xl px-10 py-12">
          {/* LOGO */}
          <div className="flex justify-center mb-6">
            <img src={logo} alt="SkillSpark" className="w-44" />
          </div>

          <h2 className="text-2xl font-bold text-center mb-1">
            Welcome Back!
          </h2>
          <p className="text-center text-gray-500 mb-6">
            Please log in to your account
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* ROLE (UI only – backend decides real role) */}
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500"
            >
              <option value="">-- Select Role --</option>
              <option value="student">Student</option>
              <option value="instructor">Instructor</option>
            </select>

            {/* EMAIL */}
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500"
              required
            />

            {/* PASSWORD */}
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500"
              required
            />

            {/* OPTIONS */}
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={() => setRemember(!remember)}
                />
                Remember me
              </label>

              <button
                type="button"
                className="text-blue-600 hover:underline"
              >
                Forgot Password?
              </button>
            </div>

            {/* BUTTON */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition disabled:opacity-60"
            >
              {loading ? "Logging in..." : "Log In"}
            </button>
          </form>

          {/* SIGN UP */}
          <p className="text-center text-sm mt-6">
            Don’t have an account?{" "}
            <Link
              to="/register"
              className="text-blue-600 cursor-pointer hover:underline"
            >
              Sign Up
            </Link>

          </p>
        </div>
      </div>
    </div>
  );
}
