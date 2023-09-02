import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../auth";

export const ProtectRoutes = () => {
  const { token } = useAuth();
  return token ? <Outlet /> : <Navigate to="/login" exact />;
};
