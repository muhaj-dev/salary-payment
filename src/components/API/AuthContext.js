import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast, Flex } from "@chakra-ui/react";
import { BsCheckCircleFill } from "react-icons/bs";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const toast = useToast();
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isStaff, setIsStaff] = useState(false);
  const [IsLoggedIn, setIsLoggedIn] = useState(null);
  //   const [user, setUser] = useState(localStorage.getItem("user_details"));
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

        const user = JSON.stringify(data);

        localStorage.setItem("user_details", user);
        // user(data);
        console.log(data)
        console.log(data.token)

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
        if (data.permission === undefined) {
          setIsStaff(true);
          setIsAdmin(false);
          navigate("/dashboard");
        } else {
          setIsAdmin(true);
          setIsStaff(false);
          navigate("/admin/dashboard");
        }
        console.log(user);
      } else {
        setIsAuthenticated(false);

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
              Incorrect Email or password
            </Flex>
          ),
        });
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

 

  const contextValue = {
    user,
    setUser,
    login,
    isAuthenticated,
    setIsAuthenticated,
    IsLoggedIn,
    setIsLoggedIn,
    isAdmin,
    setIsAdmin,
    isStaff,
    setIsStaff,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

const useAuth = () => useContext(AuthContext);

export { AuthProvider, useAuth };
