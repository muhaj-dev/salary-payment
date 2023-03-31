import React, { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import Managment from "../pages/Managment";
import Permission from "../pages/Permission";
import StaffDashboard from "../pages/StaffDashboard";
import { useAuth } from "../components/API/AuthContext";
import TeamMang from "../pages/TeamMang";
import PaymentReport from "../pages/PaymentReport";
import TaxReport from "../pages/TaxReport";

const Protected = () => {
  const { isAuthenticated } = useAuth();
  const [IsLoggedIn, setIsLoggedIn] = useState();

  const checkUserToken = () => {
    const IsLoggedIn = localStorage.getItem("lorchaintoken");
    if (!isAuthenticated || IsLoggedIn === "undefine") {
      setIsLoggedIn(null);
    }
    setIsLoggedIn(true);
  };

  useEffect(() => {
    checkUserToken();
  
  }, []);

  const userDetails = localStorage.getItem("user_details");
  const user = JSON.parse(userDetails);

  return (
    <div className="relative">
      <div>
        {isAuthenticated ? (
          <Routes>
            {!user.permission ? (
              <Route path="/dashboard" element={<StaffDashboard />} />
            ) : (
              <>
                <Route path="/admin/dashboard" element={<Dashboard />} />
                <Route path="/management/staffs" element={<Managment />} />
                <Route path="/management/teams" element={<TeamMang />} />
                <Route path="/payment/report" element={<PaymentReport />} />
                <Route path="/tax/report" element={<TaxReport />} />
                <Route path="/permission" element={<Permission />} />
                <Route index path="/admin/dashboard" element={<Dashboard />} />
              </>
            )}
          </Routes>
        ) : null}
      </div>
    </div>
  );
};

export default Protected;
