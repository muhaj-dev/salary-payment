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
  const [Loading, setLoading] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [user, setUser] = useState({});

  useEffect(() => {
    const IsLoggedIn = localStorage.getItem("lorchaintoken");
    localStorage.getItem("user_details");
    if (IsLoggedIn) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  const login = async (email, password) => {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_LORCHAIN_API}/users/login`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
          }
        );

        const data = await response.json();
        if (response.ok) {
          // setLoading(true)
          localStorage.setItem("lorchaintoken", data.token);
          const user = JSON.stringify(data);
          localStorage.setItem("user_details", user);
          // console.log(data);

          setUser(data);
          setIsAuthenticated(true);
          setLoading(true);
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
          if (data.permission) {
            setIsAdmin(true);
            setIsStaff(false);
            setLoading(false);

            navigate("/admin/dashboard");
          } else {
            setIsStaff(true);
            setIsAdmin(false);
            setLoading(false);

            navigate("/dashboard");
          }
        } else {
          setIsAuthenticated(false);
          resolve(data);
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
                {data.error}
              </Flex>
            ),
          });
          setLoading(false);
          // console.log(data.error);
          // throw new Error(data.message);
        }
      } catch (error) {
        setLoading(false);
        reject(error);

        // console.error(error.message);
        // console.error(error);
        throw error;
      }
    });
  };


  const logout = () => {
    localStorage.removeItem("lorchaintoken");
    localStorage.removeItem("user_details");
    navigate("/login");
  };
  const contextValue = {
    user,
    logout,
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
    Loading,
    refresh,
    setRefresh,
    setLoading,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

const useAuth = () => useContext(AuthContext);

export { AuthProvider, useAuth };
