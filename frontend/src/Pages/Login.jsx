import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
const SERVER_URL = import.meta.env.VITE_SERVER_URL;
import axios from "axios";

export default function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  // console.log(formData);

  const handleUserInput = useCallback((e) => {
    let { name, value } = e.target;

    setFormData((prev) => ({ ...prev, [name]: value }));
    // console.log(formData);
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${SERVER_URL}/login`, formData);
      console.log(response.data.token);
      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        alert(response.data.message);
        // console.log(response);

        navigate("/app");
      } else {
        alert(response.message);
      }
      // navigate("/login");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <form action="" name="login" onSubmit={handleLogin}>
        <h3>Login</h3>

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
          autoComplete="off"
          value={formData.password}
          onChange={handleUserInput}
        />
        <button className="" type="submit">
          Login
        </button>
      </form>
      <button onClick={() => navigate("/")}>Landing Page</button>
    </>
  );
}
