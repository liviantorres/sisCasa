
import { Navigate } from "react-router-dom";

export function AuthPaths({ children }) {
  const token = localStorage.getItem("token");

  const isAuthenticated = !!token;

  const user = localStorage.getItem("id");
  console.log("id: ", user)
  console.log("token: ", token);


  return isAuthenticated ? children : <Navigate to="/" />;
}
