import React from "react";
import { Input, useToast } from "@chakra-ui/react";
import SearchFill from "../../assets/SearchFill.svg";
import { ImSearch } from "react-icons/im";
import downloadw from "../../assets/downloadw.svg";
import CreateReport from "./CreateReport";
import { successToastMessage } from "../../helpers/toast";

const RepoLog = ({ searchTerm, generatePDF, handleSearch, placeholder }) => {
  const toast = useToast();

  return (
    <div className="flex flex-wrap justify-between">
      <div>
        <p className="font-[500] text-[20px] laptop:text-[25px]">Report</p>
      </div>
      <div className="flex gap-3">
        <div className="flex relative">
          <ImSearch className="relative top-3.5 h-[16px] w-[30px] left-[32px] text-[#B9BBBE] " />
          <Input
            type="text"
            placeholder={placeholder}
            value={searchTerm}
            fontSize={"14px"}
            px={8}
            onChange={handleSearch}
          />
          <img
            className="absolute right-1 top-1.5 h-[30px] w-[35px] my-auto bg-[#F8EEFF] py-2 px-3 rounded-md"
            src={SearchFill}
            alt=""
          />
        </div>
        <div className="flex gap-3 ">
          <button
            onClick={() => {
              generatePDF()
              successToastMessage(toast, "Downloaded");
            }}
            className="flex gap-2 px-5 py-2 bg-primary text-white border-2 border-primary rounded-lg"
          >
            <img
              className="h-[16px] my-auto rounded-md"
              src={downloadw}
              alt=""
            />
            Download
          </button>
          <CreateReport />
        </div>
      </div>
    </div>
  );
};

export default RepoLog;
