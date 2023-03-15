import React from "react";
import { Select } from "@chakra-ui/react";
import Editw from "../assets/Editw.svg";


const PermissionLog = () => {
  return (
    <div className="flex gap-5 flex-wrap justify-between ">
      <div>
        <p className="font-[500] text-[20px] laptop:text-[25px]">
        Payment History
        </p>
        <p className="text-[14px] text-[#838383]">
        View and download payment history
        </p>
      </div>
      <div className="flex gap-2">
        <div className="flex gap-3 ">
          <button className="flex items-center gap-2 px-7 py-3 h-fit text-white bg-primary border-2 border-primary rounded-lg">
          Payslip
            <img src={Editw} alt="" />
          </button>
          
        </div>
      </div>
    </div>
  );
};

export default PermissionLog;
