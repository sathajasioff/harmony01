import React from "react";
import { Navigate } from "react-router-dom";

interface PublicRouteProps {
  element: JSX.Element;
}

const PublicRoute: React.FC<PublicRouteProps> = ({ element }) => {
  const isAuthenticated = !!localStorage.getItem("adminToken"); // Check if already logged in

  // If authenticated, redirect to Admin panel, otherwise show the login page
  return isAuthenticated ? <Navigate to="/Admin/Admin" replace /> : element;
};

export default PublicRoute;
// admin1@example.com
// Admin12345