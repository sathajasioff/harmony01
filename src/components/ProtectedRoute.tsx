import React from "react";
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  element: JSX.Element;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ element }) => {
  const isAuthenticated = !!localStorage.getItem("adminToken"); // Check if token exists

  // If the user is authenticated, render the protected route, otherwise redirect to login
  return isAuthenticated ? element : <Navigate to="/AdminLogin" replace />;
};

export default ProtectedRoute;
