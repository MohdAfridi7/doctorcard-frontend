import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

export default function AdminRoute({ children }) {
  const { user } = useContext(AuthContext);

  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/login" />;
  }

  if (!user) {
    return null;
  }

  if (user.role !== "admin") {
    return <h1>Access Denied ❌</h1>;
  }

  return children;
}