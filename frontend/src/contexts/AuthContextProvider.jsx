import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { AuthContext } from "./UseAuth";

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");
  useEffect(() => {
    // setLoading(true)
    if (token) {
      try {
        const dToken = jwtDecode(token);
        if (dToken.exp * 1000 > Date.now()) {
          setUser(dToken);
        } else {
          localStorage.removeItem("token");
        }
      } catch (error) {
        localStorage.removeItem("token");
        console.log("authContext: ", error);
      }
    }
    setLoading(false);
  }, [token]);
  return (
    <AuthContext.Provider value={{ user, setUser, token, loading }}>
      {children}
    </AuthContext.Provider>
  );
}
