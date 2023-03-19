import React from "react";
import { Select } from "@chakra-ui/react";
import EditP from "../../assets/EditP.svg";
import AddAdmin from "./AddAdmin";
import PermissionModal from "./PermissionModal";


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
          <PermissionModal />
          <AddAdmin />
        </div>
      </div>
    </div>
  );
};

export default PermissionLog;
