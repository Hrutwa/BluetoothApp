import React, { useState, useEffect, useContext } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { Navigate } from "react-router-dom";
import { auth } from "../utils/firebase";
import { UserContext } from "../App";

export default function ({ children }) {
  const User = useContext(UserContext);
  useEffect(() => {
    const listener = onAuthStateChanged(auth, (user) => {
      if (user) {
        User.setAuthUser(user);
      } else {
        User.setAuthUser(null);
      }
    });
  }, []);

  if (!User.authUser) {
    return <Navigate to="/signIn" />;
  }
  return children;
}
