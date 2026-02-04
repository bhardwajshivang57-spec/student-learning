import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
    terms: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.terms) {
      alert("Please accept Terms & Privacy Policy");
      return;
    }

    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/register",
        {
          name: formData.name,
          email: formData.email,
          password: formData.password,
          role: formData.role,
        }
      );

      alert("Registration successful");
      console.log(res.data);

    } catch (err) {
      alert(err.response?.data?.message || "Registration failed");
    }
  };

 return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="flex w-[900px] h-[600px] rounded-xl overflow-hidden shadow-lg">

        {/* LEFT */}
        <div className="flex-1 bg-[#486877] text-white flex flex-col justify-center items-center text-center p-8">
          <h1 className="text-2xl font-bold mt-4">
            JOIN SKILLSPARK ACADEMY.
          </h1>
          <p className="mt-2">Unlock Your Future.</p>
        </div>

        {/* RIGHT */}
        <div className="flex-1 bg-white p-8 flex flex-col justify-center">
          <h2 className="text-2xl font-semibold text-gray-800">
            Create Account
          </h2>
          <p className="text-gray-500 mb-6">
            Start your learning journey today!
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              onChange={handleChange}
              className="w-full px-3 py-3 border rounded-md"
              required
            />

            <input
              type="email"
              name="email"
              placeholder="Email"
              onChange={handleChange}
              className="w-full px-3 py-3 border rounded-md"
              required
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
              onChange={handleChange}
              className="w-full px-3 py-3 border rounded-md"
              required
            />

            <select
              name="role"
              onChange={handleChange}
              className="w-full px-3 py-3 border rounded-md"
              required
            >
              <option value="">-- Select Role --</option>
              <option value="student">Student</option>
              <option value="instructor">Instructor</option>
            </select>

            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" name="terms" onChange={handleChange} />
              I agree to Terms of Service & Privacy Policy
            </label>

            <button className="w-full py-3 bg-blue-600 text-white rounded-full font-bold">
              SIGN UP
            </button>
          </form>

          <p className="text-center mt-4">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-600 hover:underline">
              Log In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;