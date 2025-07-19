import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("user"));
    if (stored && stored.token) {
      setIsAuthenticated(true);
      setToken(stored.token);
      setCurrentUser(stored.user);
    }
  }, []);

  const login = (userData) => {
    localStorage.setItem("user", JSON.stringify(userData));
    setIsAuthenticated(true);
    setToken(userData.token);
    setCurrentUser(userData.user);
  };

  const logout = () => {
    localStorage.removeItem("user");
    setIsAuthenticated(false);
    setToken(null);
    setCurrentUser(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, token, currentUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
