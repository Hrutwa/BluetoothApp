import React, { useContext } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { UserContext } from "../App";
import LoadingSpinner from "../components/LoadingSpinner";

const RequireAuth = ({ children }) => {
  const { authUser, loading } = useContext(UserContext);
  const navigate = useNavigate();
  if (loading) {
    return <LoadingSpinner />;
  }

  return authUser ? <>{children}</> : <Navigate to="/signin" />;
};
export default RequireAuth;
