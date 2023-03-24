import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "../pages/Login";
import Protected from "./Protected";


const CreateRoutes = () => {


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
