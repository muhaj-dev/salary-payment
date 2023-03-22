import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast, Flex } from "@chakra-ui/react";
import { BsCheckCircleFill } from "react-icons/bs"

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const toast = useToast();
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [isAdmin, setIsAdmin] = useState(null);
  const [IsStaff, setisStaff] = useState(null);
  const [IsLoggedIn, setIsLoggedIn] = useState(null);
  const [user, setUser] = useState({});

  useEffect(() => {
    const IsLoggedIn = localStorage.getItem("lorchaintoken");
    if (IsLoggedIn) {
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
        toast({
          position: "top-right",
          render: () => (
            <Flex
              color="primary"
              p={3}
              bg="white"
              w="fit-content"
              className="gap-2  items-center font-semibold shadow-card "
              rounded={"md"}
            >
              <BsCheckCircleFill className="text-[#16A34A] " />
              Logged in successfuly
            </Flex>
          ),
        });
        navigate("/admin/dashboard");
      } else {
        toast({
            position: "top-right",
            render: () => (
              <Flex
                color="white"
                p={3}
                bg="red"
                w="fit-content"
                className="gap-2 items-center font-semibold shadow-card "
                rounded={"md"}
              >
                <BsCheckCircleFill className="text-white " />
                Logged in successfuly
              </Flex>
            ),
          });
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
    navigate("/login");
  };

  const contextValue = {
    user,
    login,
    logout,
    isAuthenticated,
    setIsAuthenticated,
    IsLoggedIn,
    setIsLoggedIn,
    isAdmin,
    setIsAdmin,
    IsStaff,
    setisStaff,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

const useAuth = () => useContext(AuthContext);

export { AuthProvider, useAuth };
