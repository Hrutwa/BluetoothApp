import React, { useContext, useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import { Navigate, useNavigate } from "react-router-dom";
import { UserContext } from "../App";
import LoadingSpinner from "../components/LoadingSpinner";

const RequireAuth = ({ children }) => {
  const { authUser, setAuthUser } = useContext(UserContext);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    const listener = onAuthStateChanged(auth, (user) => {
      setAuthUser(user);
      setLoading(false);
      if (!user) {
        navigate("/signIn");
      }
    });
    return listener;
  }, [navigate]);
  if (loading) {
    return <LoadingSpinner />;
  }
  return <>{children}</>;
};
export default RequireAuth;
