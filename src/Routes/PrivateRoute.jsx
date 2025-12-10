import { useContext } from "react";
import { Navigate } from "react-router";
import { AuthContext } from "../Contexts/AuthContext/AuthContext";

export default function PrivateRoute({ children, allowedRoles }) {
  const { user, loading } = useContext(AuthContext);

  if (loading) return <div>Loading...</div>;

  if (!user) return <Navigate to="/login" replace />;

  const normalizedRole =
    user.role?.charAt(0).toUpperCase() + user.role?.slice(1);

  if (!allowedRoles.includes(normalizedRole))
    return <Navigate to="/" replace />;

  return children;
}
