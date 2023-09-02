import React from "react";
import { Route, Navigate } from "react-router-dom";
import { useAuth } from "../auth";

const PrivateRoute = ({ path, element }) => {
  const { token } = useAuth();

  if (!token) {
    return <Navigate to="/" />;
  }

  return <Route path={path} element={element} />;
};

export default PrivateRoute;
