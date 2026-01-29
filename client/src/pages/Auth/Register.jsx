import React, { useState } from "react";
import "./Auth.css";

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

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.terms) {
      alert("Please accept Terms & Privacy Policy");
      return;
    }

    console.log(formData);
    // yahin backend register API lagegi
  };

  return (
    <div className="auth-container">
      {/* LEFT PANEL */}
      <div className="auth-left">
        <h1>JOIN SKILLSPARK ACADEMY.</h1>
        <p>Unlock Your Future.</p>
      </div>

      {/* RIGHT PANEL */}
      <div className="auth-right">
        <div className="auth-box">
          <h2>Create Account</h2>
          <span>Start your learning journey today!</span>

          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              onChange={handleChange}
              required
            />

            <input
              type="email"
              name="email"
              placeholder="Email"
              onChange={handleChange}
              required
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
              onChange={handleChange}
              required
            />

            <select name="role" onChange={handleChange} required>
              <option value="">-- Select Role --</option>
              <option value="student">Student</option>
              <option value="instructor">Instructor</option>
            </select>

            <label className="terms">
              <input
                type="checkbox"
                name="terms"
                onChange={handleChange}
              />
              I agree to Terms of Service & Privacy Policy
            </label>

            <button type="submit">SIGN UP</button>
          </form>

          <p className="switch-auth">
            Already have an account? <span>Log In</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
