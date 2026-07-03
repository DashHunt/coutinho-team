import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../../features/auth/authStore";

export function ProtectedRoute() {
  const isAuthenticated = useAuthStore((state) => Boolean(state.accessToken));
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
}
