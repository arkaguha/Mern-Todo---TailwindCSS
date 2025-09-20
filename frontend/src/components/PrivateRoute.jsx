import useAuth from "../contexts/UseAuth";
import { Navigate } from "react-router-dom";
// import { jwtDecode } from "jwt-decode";

export default function PrivateRoute({ children }) {
  const { user, loading } = useAuth();
  // const token = localStorage.getItem("token")
  // const dToken = jwtDecode(token)
  // if(dToken._id === user.id) return <Navigate to="/todos" replace />
  if (loading) {
    // Don't redirect yet, still checking token
    return <p>Loading...</p>;
  }
  if (!user) return <Navigate to="/login" replace />;
  return children;
}
