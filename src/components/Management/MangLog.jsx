import React from "react";
import SearchFill from "../../assets/SearchFill.svg";
import { ImSearch } from "react-icons/im";
import CreateTeam from "./CreateTeam";
import AddStaff from "./AddStaff";

const MangLog = () => {
  return (
    <div className="flex flex-wrap gap-5 justify-between">
      <div>
        <p className="font-[500] pl-6 text-[20px] laptop:text-[25px]">
          Staff Management
        </p>
      </div>
      <div className="flex gap-3">
        <div className="flex relative">
          <ImSearch className="relative top-4 h-[16px] w-[30px] left-[32px] text-[#B9BBBE] " />
          <input
            placeholder="Search"
            type="text"
            // value="search"
            // onChange={onChange}
            className="border-[1.5px] pl-8 w-full text-[16px] border-[black] outline-[1.5px] outline-primary px-3 py-1 mt-1 rounded-md"
          />
          <img
            className="absolute right-1 top-2 h-[30px] w-[35px] my-auto bg-[#F8EEFF] py-2 px-3 rounded-md"
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
