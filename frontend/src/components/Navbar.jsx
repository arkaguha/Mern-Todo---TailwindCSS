// components/Navbar.jsx
import { Moon, Sun, LogIn, LogOut, User } from "lucide-react";
import { useTheme } from "../contexts/ThemeContext";
import "./Navbar.css";
import useAuth from "../contexts/UseAuth";
import { useNavigate } from "react-router-dom";
import { useLoader } from "../contexts/UseLoader";

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const { user } = useAuth();
  const navigate = useNavigate();
  const { showLoader, hideLoader } = useLoader();

  function logout() {
    try {
      showLoader();
      localStorage.removeItem("token");
    } catch (error) {
      console.log("error nav 18: ", error);
    } finally {
      hideLoader();
    }
    return navigate("/login");
  }

  const isLoggedIn = user;
  const userName = isLoggedIn ? user.name : null;

  return (
    <nav
      className={
        theme === "dark"
          ? "fixed w-screen top-0  bg-amber-400 text-black flex justify-between px-6 py-4 items-center shadow-2xl shadow-amber-100"
          : "fixed w-screen top-0  bg-amber-300  flex justify-between px-6 py-4 items-center shadow-2xl shadow-amber-100"
      }
    >
      <div className="">
        <h2 className="text-3xl ">todos</h2>
      </div>
      <div className="flex flex-row gap-3 ">
        {isLoggedIn ? (
          <>
            <button className="flex flex-row items-center gap-1">
              <User size={16} /> {userName}
            </button>
            <button
              onClick={logout}
              className="flex flex-row items-center gap-1"
            >
              <LogOut size={16} /> Logout
            </button>
          </>
        ) : (
          <button className="flex flex-row items-center gap-1">
            <LogIn size={16} /> Login
          </button>
        )}
        <button
          className="flex flex-row items-center gap-1"
          onClick={toggleTheme}
        >
          {theme === "light" ? (
            <Sun fill="yellow" />
          ) : (
            <Moon color="skyblue" fill="skyblue" />
          )}
        </button>
      </div>
    </nav>
  );
}
