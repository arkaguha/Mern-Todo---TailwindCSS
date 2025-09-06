// components/Navbar.jsx
import { Moon, Sun, LogIn, LogOut, User } from "lucide-react";
import { useTheme } from "../contexts/ThemeContext";
import "./Navbar.css";

export default function Navbar({ user, logout }) {
  const { theme, toggleTheme } = useTheme();

  // fake login state (replace with auth logic later)
  const isLoggedIn = user;
  const userName = isLoggedIn ? user.name : null;

  return (
    <nav className={`navbar ${theme}`}>
      <div className="nav-left">
        <h2 className="logo">ToDo App</h2>
      </div>
      <div className="nav-right">
        {isLoggedIn ? (
          <>
            <button className="nav-btn">
              <User size={16} /> {userName}
            </button>
            <button onClick={logout} className="nav-btn">
              <LogOut size={16} /> Logout
            </button>
          </>
        ) : (
          <button className="nav-btn">
            <LogIn size={16} /> Login
          </button>
        )}
        <button className="nav-btn" onClick={toggleTheme}>
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
