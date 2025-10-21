import { Navigate, Outlet } from "react-router-dom";

import { PUBLIC_ROUTES } from "./routes.jsx";
import { useAuth } from "../context/AuthContext.jsx";

export const AuthGuard = () => {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? <Outlet /> : <Navigate to={PUBLIC_ROUTES.LOGIN} />;
};
