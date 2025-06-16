import React, { useState } from "react";
import { registerUser } from "../api";

function RegistrationForm({ onRegistered }) {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [msg, setMsg] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setMsg(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg(null);
    try {
      await registerUser(form);
      setForm({ name: "", email: "", password: "" });
      setMsg("Registration successful!");
      onRegistered();
    } catch (err) {
      setMsg(
        err.response?.data?.error || "Registration failed. Try again."
      );
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      <input
        name="name"
        placeholder="Name"
        value={form.name}
        onChange={handleChange}
        required
      />
      <input
        name="email"
        placeholder="Email"
        type="email"
        value={form.email}
        onChange={handleChange}
        required
      />
      <input
        name="password"
        placeholder="Password (min 6 chars)"
        type="password"
        value={form.password}
        onChange={handleChange}
        required
      />
      <button type="submit">Register</button>
      {msg && <p>{msg}</p>}
    </form>
  );
}

export default RegistrationForm; 