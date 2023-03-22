import React, { useState, useEffect } from "react";
import { useNavigate, Route, Routes } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import Managment from "../pages/Managment";
import Permission from "../pages/Permission";
import Report from "../pages/Report";
import StaffDashboard from "../pages/StaffDashboard";
import { useAuth } from "../components/API/AuthContext";

const Protected = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [IsLoggedIn, setIsLoggedIn] = useState(null);

  const checkUserToken = () => {
    const IsLoggedIn = localStorage.getItem('lorchaintoken');
    if (!isAuthenticated || IsLoggedIn === null) {
      setIsLoggedIn(null);
      return navigate("/login");
    }
    setIsLoggedIn(true);
  };

  useEffect(() => {
    checkUserToken();
  }, [isAuthenticated]);
 
  return (
    <div className="relative">
      <div>
        {IsLoggedIn ? (
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
