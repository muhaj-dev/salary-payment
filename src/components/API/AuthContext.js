import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [isAdmin, setIsAdmin] = useState(true);
  const [IsLoggedIn, setIsLoggedIn] = useState(null)
  const [user, setUser] = useState({});

  useEffect(() => {
    const IsLoggedIn = localStorage.getItem("lorchaintoken");
    console.log(IsLoggedIn)
    if (IsLoggedIn ) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  const login = async (email, password) => {
    try {
      const response = await fetch(
        "https://lorchain-api.onrender.com/users/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("lorchaintoken", data.token);
        setUser(data.user);
        console.log(data);
        setIsAuthenticated(true);
      navigate('/admin/dashboard'); 

      } else {

      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem("lorchaintoken");
    setIsAuthenticated(false);
    setUser({});
    navigate("/");
  };

  const contextValue = {
    user,
    login,
    logout,
    isAuthenticated,
    setIsAuthenticated,
    IsLoggedIn, 
    setIsLoggedIn
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

const useAuth = () => useContext(AuthContext);

export { AuthProvider, useAuth };
