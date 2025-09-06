import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
const SERVER_URL = import.meta.env.VITE_SERVER_URL;
import { useNavigate } from "react-router-dom";

export default function App() {
  const [user, setUser] = useState(null); // decoded token payload
  const [movies, setMovies] = useState(null); // backend response
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  // get token from localStorage
  let token = localStorage.getItem("token");

  useEffect(() => {
    if (token) {
      try {
        const decoded = jwtDecode(token); // ✅ decode only
        setUser(decoded);

        // ✅ call backend with Authorization header
        axios
          .get(`${SERVER_URL}/app/home`, {
            headers: { authorization: `Bearer ${token}` },
          })
          .then((res) => setMovies(res.data))
          .catch((err) => setError(err.message));
      } catch (err) {
        setError("Invalid token");
        console.error(err);
      }
    }
  }, [token]);

  function logout() {
    localStorage.removeItem("token");
    navigate("/");
  }

  return (
    <>
      <Navbar user={user} logout={logout}></Navbar>
      <Home user={user} movies={movies} error={error} />
    </>
  );
}
