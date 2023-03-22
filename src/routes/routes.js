import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import Login from "../pages/Login";
import Managment from "../pages/Managment";
import Permission from "../pages/Permission";
import Report from "../pages/Report";
import StaffDashboard from "../pages/StaffDashboard";
import { useAuth } from "../components/API/AuthContext";
import Protected from "./Protected";


const CreateRoutes = () => {
  const { isAuthenticated, setIsAuthenticated } = useAuth();


  return (
    <div className="relative">
      <div>
        <Routes>
          <Route  path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
        
          <Route path="*" element={<Protected />} />
          
        </Routes>
      </div>
    </div>
  );
};

export default CreateRoutes;
