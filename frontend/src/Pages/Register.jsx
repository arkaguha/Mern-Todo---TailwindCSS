import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const SERVER_URL = import.meta.env.VITE_SERVER_URL;

export default function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  console.log(formData);

  const handleUserInput = useCallback((e) => {
    let { name, value } = e.target;

    setFormData((prev) => ({ ...prev, [name]: value }));
    // console.log(formData);
  }, []);

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${SERVER_URL}/register`, formData);
      console.log(response.data);
      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <form action="" name="register" onSubmit={handleRegister}>
        <h3>Register</h3>
        <input
          className=""
          type="text"
          placeholder="name"
          name="name"
          autoComplete="off"
          value={formData.name}
          onChange={handleUserInput}
        />
        <input
          className=""
          type="email"
          placeholder="email"
          name="email"
          autoComplete="off"
          value={formData.email}
          onChange={handleUserInput}
        />
        <input
          className=""
          type="password"
          placeholder="password"
          name="password"
          value={formData.password}
          onChange={handleUserInput}
        />
        <button className="" type="submit">
          Sign Up
        </button>
      </form>
      <button onClick={() => navigate("/")}>Landing Page</button>
    </>
  );
}
