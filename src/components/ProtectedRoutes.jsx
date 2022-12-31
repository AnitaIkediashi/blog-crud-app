import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Navigate } from "react-router-dom";
import { auth } from "../firebase/Config";

const ProtectedRoutes = ({children}) => {
  const [user] = useAuthState(auth)

  return (
    user ? children : <Navigate to="/login" />
  )
};

export default ProtectedRoutes;
