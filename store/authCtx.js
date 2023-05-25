import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useEffect, useState } from "react";

export const AuthCtx = createContext({
  token: "",
  isAuth: false,
  authenticate: () => {},
  logout: () => {},
});

export const AuthCtxProvider = ({ children }) => {
  const [token, setToken] = useState();

  function authenticate(token) {
    AsyncStorage.setItem("token", token);
    setToken(token);
  }

  function logout() {
    AsyncStorage.removeItem('token')
    setToken(null);
  }

  const value = {
    token: token,
    isAuth: !!token,
    authenticate,
    logout,
  };

  return <AuthCtx.Provider value={value}>{children}</AuthCtx.Provider>;
};
