import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

export default function DoctorRoute({ children }) {
  const { user } = useContext(AuthContext);

  const token = localStorage.getItem("token");

  // ❌ login nahi hai
  if (!token) {
    return <Navigate to="/login" />;
  }

  // ⏳ refresh ke time wait
  if (!user) {
    return null;
  }

  // ❌ wrong role
  if (user.role !== "doctor") {
    return <h1>Access Denied ❌</h1>;
  }

  return children;
}