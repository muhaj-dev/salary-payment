// import React, { createContext, useState } from "react";
// import axios from "axios";

// export const AuthContext = createContext();

// const AuthContextProvider = (props) => {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [user, setUser] = useState({});

//   const login = (username, password) => {
//     axios
//       .post("http://localhost:8000/api/auth/login/", {
//         username,
//         password,
//       })
//       .then((res) => {
//         localStorage.setItem("token", res.data.token);
//         setIsAuthenticated(true);
//         setUser(res.data.user);
//       })
//       .catch((err) => console.log(err));
//   };

//   const logout = () => {
//     localStorage.removeItem("token");
//     setIsAuthenticated(false);
//     setUser({});
//   };

//   return (
//     <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
//       {props.children}
//     </AuthContext.Provider>
//   );
// };

// export default AuthContextProvider;