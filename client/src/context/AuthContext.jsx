import { createContext, useContext, useState } from "react";
import { loginUser, registerUser } from "../services/authService";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = async (data) => {
    const res = await loginUser(data);
    setUser(res);
    localStorage.setItem("user", JSON.stringify(res));
    return res;
  };

  const register = async (data) => {
    const res = await registerUser(data);
    setUser(res);
    localStorage.setItem("user", JSON.stringify(res));
    return res;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
