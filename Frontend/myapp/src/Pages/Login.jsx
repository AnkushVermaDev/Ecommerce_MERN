import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const ip = process.env.REACT_APP_IP;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const navigate  =useNavigate()

 const [message,setmsg] =useState("")

 
 const handleSubmit = (e) => {
  e.preventDefault();

  fetch(`${ip}/api/users/login`, {
    method: 'POST',
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(form)
  })
  .then(response => {
    if (!response.ok) {
      setmsg("Login failed")

      throw new Error('Login failed');
      
    }
    return response.json(); // return the parsed JSON
  })
  .then(data => {
    // data contains your token
    localStorage.setItem('jwt', data.token);
    console.log(data.token);
    setmsg("Login Successfull")
    navigate('/')
  })
  .catch(err => {
    console.error(err);
    setmsg("Login failed")

  });
};

  return (
    <div className="bg-black text-white min-vh-100 d-flex justify-content-center align-items-center flex-col">
       
         <h4 className={`${message=="Login Successfull"?"text-success":"text-danger"}`}>{message}</h4>
       

      <div className="p-4 rounded" style={{ width: "380px", background: "#111", border: "1px solid #222" }}>
        <h3 className="text-center fw-bold mb-3">Login</h3>

        <form onSubmit={handleSubmit}>

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
          <button className="btn btn-primary w-100 fw-bold mt-2">Login</button>
        </form>

        <p className="mt-3 text-center small">
          Don’t have an account?{" "}
          <a href="/signup" className="text-info">Create Account</a>
        </p>

      </div>
    </div>
  );
}
