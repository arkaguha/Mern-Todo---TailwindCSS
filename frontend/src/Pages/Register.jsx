import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const SERVER_URL = import.meta.env.VITE_SERVER_URL;
import { useLoader } from "../contexts/UseLoader";

export default function Register() {
  const navigate = useNavigate();
  const { showLoader, hideLoader } = useLoader();
  const [showPassword, setShowPassword] = useState("password");

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
    setShowPassword((prev) => (prev === "text" ? "password" : prev));
    try {
      showLoader();
      const response = await axios.post(`${SERVER_URL}/register`, formData);
      console.log(response.data);
      navigate("/login");
    } catch (error) {
      console.error(error);
    } finally {
      hideLoader();
    }
  };

  function handleShowPassword() {
    setShowPassword((prev) => (prev === "password" ? "text" : "password"));
  }
  return (
    <section
      className="flex flex-col items-center justify-center m-10 mx-auto bg-amber-300 
    border-2 border-red-500 w-[80%]  rounded-2xl lg:w-[30%] "
    >
      {/* h-screen flex flex-col items-center justify-center text-center*/}
      <form
        className="bg-amber-300 w-full h-fit grid grid-cols-1 rounded-2xl p-20"
        name="register"
        onSubmit={handleRegister}
      >
        <h3 className="text-center text-5xl pt-2.5">Register</h3>
        <input
          className="w-[70%] translate-x-[20%] border-b-2 p-4 text-l mt-9"
          type="text"
          placeholder="name"
          name="name"
          autoComplete="off"
          value={formData.name}
          onChange={handleUserInput}
        />
        <input
          className="w-[70%] translate-x-[20%] border-b-2 p-4 text-l mt-9"
          type="email"
          placeholder="email"
          name="email"
          autoComplete="off"
          value={formData.email}
          onChange={handleUserInput}
        />
        <div>
          <input
            className="w-[70%] translate-x-[20%] border-b-2 p-4 mt-4 text-l "
            id="password"
            type={showPassword}
            placeholder="Password"
            name="password"
            autoComplete="off"
            value={formData.password}
            onChange={handleUserInput}
          />
          <button
            type="button"
            className="hover:cursor-pointer z-10 relative bottom-0.5 -right-15 text-xl "
            onClick={handleShowPassword}
          >
            {showPassword === "password" ? "🙈" : "🫣"}
          </button>
        </div>
        <button
          className="bg-gray-800 w-[50%] translate-[50%] mb-9 mt-6 hover:bg-slate-700 text-white px-4 py-2 rounded "
          type="submit"
        >
          Sign Up
        </button>
      </form>
      <div className="lg:flex">
        <button className="p-5" onClick={() => navigate("/")}>
          ⬅️ Landing Page
        </button>
        <button className="p-5" onClick={() => navigate("/login")}>
          Login
        </button>
      </div>
    </section>
  );
}
