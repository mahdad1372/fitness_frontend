import React, { useState } from "react";
import "./signup.css";

const Signup = () => {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    gender: "male",
    password: "",
    weight: "",
    height: "",
  });

  // Update state when inputs change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle submit with POST API
const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const response = await fetch("http://localhost:7000/users/adduser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    let data = null;

    // Try reading JSON safely
    try {
      data = await response.json();
    } catch {
      data = { message: "Invalid JSON response from server." };
    }

    // --- STATUS HANDLING ---
    if (!response.ok) {
      const errorMsg = data?.message || "An error occurred.";

      switch (response.status) {
        case 400:
          alert("Bad Request: " + errorMsg);
          break;
        case 401:
          alert("Unauthorized: " + errorMsg);
          break;
        case 409:
          alert("User already exists: " + errorMsg);
          break;
        case 500:
        default:
          alert("Server Error: " + errorMsg);
          break;
      }

      return;
    }

    // --- SUCCESS ---
    alert("Signup successful!");
    console.log(data);

  } catch (error) {
    // --- NETWORK-LEVEL ERROR ---
    console.error("Network error:", error);
    alert("Cannot connect to server. Please try again later.");
  }
};

  return (
    <div className="main-center">
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: "2rem" }}>
            <h2 className="form-title">Sign up form</h2>
            <p className="form-desc">Please add your personal details</p>
          </div>

          <label className="form-label">Firstname</label>
          <input
            type="text"
            name="firstname"
            className="form-input"
            value={formData.firstname}
            onChange={handleChange}
            required
          />

          <label className="form-label">Lastname</label>
          <input
            type="text"
            name="lastname"
            className="form-input"
            value={formData.lastname}
            onChange={handleChange}
            required
          />

          <label className="form-label">Email Address*</label>
          <input
            type="email"
            name="email"
            className="form-input"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <label className="form-label">Gender</label>
          <select
            name="Gender"
            className="form-select"
            value={formData.gender}
            onChange={handleChange}
            required
          >
            <option value="male">male</option>
            <option value="female">female</option>
          </select>

          <label className="form-label">Password</label>
          <input
            type="password"
            name="password"
            className="form-input"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <label className="form-label">Weight</label>
          <input
            type="number"
            name="weight"
            className="form-input"
            value={formData.weight}
            onChange={handleChange}
          />

          <label className="form-label">Height</label>
          <input
            type="number"
            name="height"
            className="form-input"
            value={formData.height}
            onChange={handleChange}
          />

          <button type="submit" className="form-btn">
            Sign up
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
