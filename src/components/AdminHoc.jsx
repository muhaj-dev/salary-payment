import { Flex, Box } from "@chakra-ui/react";
import React from "react";
import admin from "../assets/Admin.jpg";

import logo from "../assets/logo.svg";
import AdminDetails from "./AdminDetails";

const LoginHoc = (WrappedComponent) => {
  return function (props) {
    return (
      <Flex>
        <Box className="relative hidden tablet:block tablet:w-[50%] h-[100vh] ">
          {/* <img src={logo} className="absolute top-6 left-20 h-[45px]" alt="logo" /> */}
          <p className="absolute top-6 left-20 font-[700] text-[200%] text-[#fff] ">PayRec</p>
          <img src={admin} alt="logo" className="h-full object-cover w-full " />
          <div className="absolute top-[41%] w-full text-white">
            <AdminDetails />
          </div>
        </Box>
        <Box className="h-[100vh] w-full tablet:w-[50%] flex">
          <div className=" w-[90%] tablet:w-[450px] laptop:w-[500px] flex mx-auto">
            <WrappedComponent {...props} />
          </div>
        </Box>
      </Flex>
    );
  };
};

export default LoginHoc;
