import React from "react";
import SearchFill from "../../assets/SearchFill.svg";
import { Input } from "@chakra-ui/react";
import { ImSearch } from "react-icons/im";
import CreateTeam from "./CreateTeam";
import AddStaff from "./AddStaff";

const MangLog = ({ searchTerm, handleSearch, placeholder }) => {
  return (
    <div className="flex flex-wrap gap-5 justify-between">
      <div>
        <p className="font-[500] pl-6 text-[20px] laptop:text-[25px]">
          Staff Management
        </p>
      </div>
      <div className="flex gap-3">
        <div className="flex relative">
          <ImSearch className="relative top-3 h-[16px] w-[30px] left-[32px] text-[#B9BBBE] " />
          <Input
            type="text"
            placeholder={placeholder}
            value={searchTerm}
            fontSize={"14px"}
            px={8}
            onChange={handleSearch}
          />
          <img
            className="absolute right-1 top-1 h-[30px] w-[35px] my-auto bg-[#F8EEFF] py-2 px-3 rounded-md"
            src={SearchFill}
            alt=""
          />
        </div>
        <div className="flex gap-3 ">
          <CreateTeam />
          <AddStaff />
        </div>
      </div>
    </div>
  );
};

export default MangLog;
