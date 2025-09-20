import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Register from "./Pages/Register.jsx";
import Login from "./Pages/Login.jsx";
import LandingPage from "./Pages/LandingPage.jsx";
import ThemeProvider from "./contexts/ThemeContext.jsx";
import AuthProvider from "./contexts/AuthContextProvider.jsx";
import Navbar from "./components/Navbar.jsx";
import TodoPage from "./Pages/TodoPage.jsx";
import PrivateRoute from "./components/PrivateRoute.jsx";
import LoaderProvider from "./contexts/LoaderContextProvider.jsx";
import Loader from "./components/Loader.jsx";
// import Loader from "./components/Loader";
// import Home from "./Pages/Home.jsx";
import Log from "./components/Log.jsx";
import LogProvider from "./contexts/LogContextProvider.jsx";
import { injectSpeedInsights } from "@vercel/speed-insights";
createRoot(document.getElementById("root")).render(
  <StrictMode>
    {injectSpeedInsights()}
    <LogProvider>
      <AuthProvider>
        <BrowserRouter>
          <ThemeProvider>
            <LoaderProvider>
              <Loader />
              <Log />
              <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />

                <Route
                  path="/todos"
                  element={
                    <PrivateRoute>
                      <TodoPage />
                    </PrivateRoute>
                  }
                />
                <Route path="/app/home" element={<App />} />
              </Routes>
            </LoaderProvider>
          </ThemeProvider>
        </BrowserRouter>
      </AuthProvider>
    </LogProvider>
  </StrictMode>
);
