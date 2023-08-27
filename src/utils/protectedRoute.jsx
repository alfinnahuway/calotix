import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, redirect }) => {
  const checkoutData = localStorage.getItem("checkout");
  if (!checkoutData) {
    return <Navigate to={redirect} />;
  }

  return children;
};

export default ProtectedRoute;
