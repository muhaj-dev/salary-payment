import React from "react";
import downloadw from "../../assets/downloadw.svg";
import {  useToast } from "@chakra-ui/react";
import { successToastMessage } from "../../helpers/toast";

const StaffLog = ({generatePDF}) => {
  const toast = useToast();

  return (
    <div className="flex gap-5 flex-wrap justify-between ">
      <div>
        <p className="font-[500] text-[20px] laptop:text-[25px]">
          Payment History
        </p>
        <p className="">
          View and{" "}
          <button className="underline cursor-pointer" 
          onClick={() => {
            generatePDF()
            successToastMessage(toast, "Downloaded");
          }}
          >
            download
          </button>{" "}
          activity log
        </p>
      </div>
      <div className="flex gap-2">
        <div className="flex gap-3 ">
          <button className="flex gap-2 px-5 py-2 h-fit bg-primary text-white border-2 border-primary rounded-lg">
            Payslip
            <img
              className="h-[16px] my-auto rounded-md"
              src={downloadw}
              alt=""
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default StaffLog;
