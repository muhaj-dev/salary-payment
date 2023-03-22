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
console.log(IsLoggedIn)
  const checkUserToken = () => {
    const IsLoggedIn = localStorage.getItem('lorchaintoken');
    if (!isAuthenticated || IsLoggedIn === 'undefine') {
      setIsLoggedIn(null);
    }
    setIsLoggedIn(true);

  };

  useEffect(() => {
    checkUserToken();
  }, []);
 
  return (
    <div className="relative">
      <div>
        {isAuthenticated ? (
          <Routes>
            <Route index path="/admin/dashboard" element={<Dashboard />} />
            <Route path="/admin/dashboard" element={<Dashboard />} />
            <Route path="/user/dashboard" element={<StaffDashboard />} />
            <Route path="/managment" element={<Managment />} />
            <Route path="/report" element={<Report />} />
            <Route path="/permission" element={<Permission />} />
          </Routes>
        ) : 
        null
        }
      </div>
    </div>
  );
};

export default Protected;
