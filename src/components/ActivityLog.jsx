import React from "react";
import { Select } from "@chakra-ui/react";
import calender from "../assets/calender.svg";
import { ImSearch } from "react-icons/im";

const ActivityLog = () => {
  return (
    <div className="flex flex-wrap justify-between">
      <div>
        <p className="font-[500] text-[20px] laptop:text-[25px]">
          Activity log
        </p>
        <p className="">View and download activity log</p>
      </div>
      <div className="flex gap-2">
        <div className="">
          <input
            placeholder="Search"
            type="text"
            // value="search"
            // onChange={onChange}
            className="border-[1.5px] pl-8 w-full text-[16px] border-[black] outline-[1.5px] outline-primary px-3 py-1 mt-1 rounded-md"
          />
          {/* <img src={ImSearch} alt="" /> */}
          <ImSearch className="relative -top-6 left-3 text-[#B9BBBE] " />
        </div>
        <div className="w-[30%]">
          <Select fontWeight={"500"} placeholder="Select action">
            <option value="option1">Login</option>
            <option value="option2">Add staff</option>
            <option value="option3">Edit staff</option>
            <option value="option3">Payment records</option>
            <option value="option3">Download report</option>
          </Select>
        </div>
        <div className="flex items-center gap-2 h-[38px] rounded-md font-semibold border-2 border-[#EEEEEE] p-3">
          <img src={calender} alt="" />
          <p>Date range</p>
        </div>
      </div>
    </div>
  );
};

export default ActivityLog;
