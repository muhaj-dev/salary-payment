import React from "react";
import { Select } from "@chakra-ui/react";
import calender from "../assets/calender.svg";
import { ImSearch } from "react-icons/im";
import { Input } from "@chakra-ui/react";

const ActivityLog = ({
  searchTerm,
  handleSearch,
  selectedUser,
  handleSelect,
  allUsers,
}) => {
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
          <Input
            type="text"
            placeholder="Search by name or email"
            value={searchTerm}
            fontSize={"14px"}
            pl={6}
            onChange={handleSearch}
          />
          {/* <img src={ImSearch} alt="" /> */}
          <ImSearch className="relative -top-6 w-5 h-3 left-1 text-[#B9BBBE] " />
        </div>
        <div className="w-[30%]">
        <Select
        fontWeight={"500"}
          placeholder="Select action"
          value={selectedUser}
          onChange={handleSelect}
          // style={{ width: "200px", marginLeft: "10px" }}
        >
          {allUsers.map((user) => (
            <option key={user.value} value={user.value}>
              {user.label}
            </option>
          ))}
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
