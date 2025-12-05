import React, { useState } from "react";
import "./signup.css";

const Signup = () => {
  const [formData, setFormData] = useState({
    fullname: "",
    Lastname: "",
    email: "",
    Gender: "male",
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
      const response = await fetch("YOUR_API_URL_HERE", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      console.log(result);
      alert("Signup successful!");
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Something went wrong.");
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
            name="fullname"
            className="form-input"
            value={formData.fullname}
            onChange={handleChange}
            required
          />

          <label className="form-label">Lastname</label>
          <input
            type="text"
            name="Lastname"
            className="form-input"
            value={formData.Lastname}
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
            value={formData.Gender}
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
