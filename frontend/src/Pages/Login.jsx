import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import useAuth from "../contexts/UseAuth";
import { useLoader } from "../contexts/UseLoader";
import { useLog } from "../contexts/UseLog";

const SERVER_URL = import.meta.env.VITE_SERVER_URL;

export default function Login() {
  const navigate = useNavigate();
  const { setUser } = useAuth();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const { showLoader, hideLoader } = useLoader();
  const { showLog } = useLog();
  const [showPassword, setShowPassword] = useState("password");

  const handleUserInput = useCallback((e) => {
    let { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setShowPassword((prev) => (prev === "text" ? "password" : prev));

    try {
      showLoader();
      const response = await axios.post(`${SERVER_URL}/login`, formData);

      if (response.data.token) {
        showLog("success", response.data.message); // ✅ log success
        localStorage.setItem("token", response.data.token);
        const dToken = jwtDecode(response.data.token);
        setUser(dToken);
        setTimeout(() => navigate("/todos"), 1500);
      } else {
        showLog("warning", response.data.message || "Login failed"); // ✅ log warning
      }
    } catch (error) {
      if (error.response) {
        showLog("error", error.response.data.message || "Something went wrong");
      } else {
        showLog("error", error.message || "Network error");
      }
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
      <form
        onSubmit={handleLogin}
        className="bg-amber-300 w-full h-fit grid grid-cols-1 rounded-2xl p-20"
      >
        <h3 className="text-center text-5xl pt-2.5">Login</h3>
        <input
          className="w-[70%] translate-x-[20%] border-b-2 p-4 text-l mt-9"
          type="email"
          placeholder="Email"
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
          Login
        </button>
      </form>
      <div className="lg:flex">
        <button className="p-5" onClick={() => navigate("/")}>
          ⬅️ Landing Page
        </button>
        <button className="p-5" onClick={() => navigate("/register")}>
          Register
        </button>
      </div>
    </section>
  );
}
