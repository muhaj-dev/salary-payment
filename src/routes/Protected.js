import React, { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import Managment from "../pages/Managment";
import Permission from "../pages/Permission";
import Report from "../pages/Report";
import StaffDashboard from "../pages/StaffDashboard";
import { useAuth } from "../components/API/AuthContext";

const Protected = () => {
  const { isAuthenticated } = useAuth();
  const [IsLoggedIn, setIsLoggedIn] = useState();
  const [isRoute, setIsRoute] = useState(true);

  const checkUserToken = () => {
    const IsLoggedIn = localStorage.getItem("lorchaintoken");
    if (!isAuthenticated || IsLoggedIn === "undefine") {
      setIsLoggedIn(null);
    }
    setIsLoggedIn(true);
  };

  useEffect(() => {
    if (user.permission === null) {
      setIsRoute(false);
    } else {
      setIsRoute(true);
    }
    checkUserToken();
  }, []);

  const userDetails = localStorage.getItem("user_details");
  const user = JSON.parse(userDetails);

  return (
    <div className="relative">
      <div>
        {isAuthenticated ? (
          <Routes>
            {isRoute ? (
              <Route path="/dashboard" element={<StaffDashboard />} />
            ) : (
              <>
                <Route path="/admin/dashboard" element={<Dashboard />} />
                <Route path="/managment" element={<Managment />} />
                <Route path="/report" element={<Report />} />
                <Route path="/permission" element={<Permission />} />
                <Route index path="/admin/dashboard" element={<Dashboard />} />
              </>
            )}
            {/* {user.permission ===  ? <Route index path="/admin/dashboard" element={<Dashboard />} /> */}
            {/* : null } */}
          </Routes>
        ) : null}
      </div>
    </div>
  );
};

export default Protected;
