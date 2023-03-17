import React from "react";
import Card from "../Card";
import Hero from "../Hero";
import Navbar from "../Navbar";
import PermissionCard from "./PermissionCard";

const PermissionHoc = (WrappedComponent) => {
  return function (props) {
    return (
      <div className="flex ">
        <div className="w-full">
          <Navbar />
          <Hero />
          <div className="pt-11 bg-[#F7F7F7] ">
          <div className="relative -top-28 w-[90%] max-w-[1512px] mx-auto">
            <PermissionCard />
            <WrappedComponent {...props} />
          </div>
          </div>
        </div>
      </div>
    );
  };
};

export default PermissionHoc;
