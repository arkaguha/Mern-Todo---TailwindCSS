import { useState, useEffect } from "react";
// import { jwtDecode } from "jwt-decode";
import axios from "axios";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
const SERVER_URL = import.meta.env.VITE_SERVER_URL;
import { useNavigate } from "react-router-dom";
import useAuth from "./contexts/UseAuth";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { injectSpeedInsights } from "@vercel/speed-insights";

export default function App() {
  injectSpeedInsights();
  // const [user, setUser] = useState(null); // decoded token payload
  const [movies, setMovies] = useState(null); // backend response
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  // get token from localStorage
  let token = localStorage.getItem("token");
  const { user } = useAuth();
  console.log("appjs user 18: ", user);

  useEffect(() => {
    if (!token) {
      return navigate("/login");
    }
    axios
      .get(`${SERVER_URL}/app/home`, {
        headers: { authorization: `Bearer ${token}` },
      })
      .then((res) => setMovies(res.data))
      .catch((err) => setError(err.message));
  }, [token, navigate]);

  // useEffect(() => {
  //   if (token) {
  //     try {
  //       const decoded = jwtDecode(token); // ✅ decode only
  //       setUser(decoded);

  //       // ✅ call backend with Authorization header
  //       axios
  //         .get(`${SERVER_URL}/app/home`, {
  //           headers: { authorization: `Bearer ${token}` },
  //         })
  //         .then((res) => setMovies(res.data))
  //         .catch((err) => setError(err.message));
  //     } catch (err) {
  //       setError("Invalid token");
  //       console.error(err);
  //     }
  //   }
  // }, [token]);

  function logout() {
    localStorage.removeItem("token");
    navigate("/");
  }

  return (
    <>
      <Navbar user={user} logout={logout}></Navbar>
      <Home user={user} movies={movies} error={error} setError={setError} />
    </>
  );
}
