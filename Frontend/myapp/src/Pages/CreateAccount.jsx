import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CreateAccount() {
  const ip = process.env.REACT_APP_IP;

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`${ip}/api/users/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      console.log("Registration Response:", data);

      if (res.ok) {
        // Navigate only when the API call succeeds
        navigate("/");
      } else {
        alert(data.message || "Registration failed");
      }
    } catch (err) {
      console.error("Registration error:", err);
      alert("Something went wrong, please try again.");
    }
  };

  return (
    <div className="bg-black text-white min-vh-100 d-flex justify-content-center align-items-center">
      <div
        className="p-4 rounded"
        style={{ width: "380px", background: "#111", border: "1px solid #222" }}
      >
        <h3 className="text-center fw-bold mb-3">Create Account</h3>

        <form onSubmit={handleSubmit}>
          {/* Name */}
          <div className="mb-3">
            <label className="form-label">Full Name</label>
            <input
              type="text"
              name="name"
              className="form-control text-white"
              style={{ background: "#000", border: "1px solid #333" }}
              value={form.name}
              onChange={handleChange}
              required
            />
          </div>

          {/* Email */}
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              name="email"
              className="form-control text-white"
              style={{ background: "#000", border: "1px solid #333" }}
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>

          {/* Password */}
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              name="password"
              className="form-control text-white"
              style={{ background: "#000", border: "1px solid #333" }}
              value={form.password}
              onChange={handleChange}
              required
            />
          </div>

          {/* Submit */}
          <button type="submit" className="btn btn-success w-100 fw-bold mt-2">
            Create Account
          </button>
        </form>

        <p className="mt-3 text-center small">
          Already have an account?{" "}
          <a href="/login" className="text-info">
            Login
          </a>
        </p>
      </div>
    </div>
  );
}
