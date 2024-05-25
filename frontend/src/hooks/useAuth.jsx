import React from "react";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";

// Hook to use the authentication context
const useAuth = () => {
  return useContext(AuthContext);
};

export default useAuth;
