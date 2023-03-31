import React, { useState } from "react";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
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
  const [value, onChange] = useState(new Date());


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
          <ImSearch className="relative -top-6 w-5 h-3 left-1 text-[#B9BBBE] " />
        </div>
        <div className="w-[30%]">
        <Select
        fontWeight={"500"}
          placeholder="Select action"
          value={selectedUser}
          onChange={handleSelect}
        >
          {allUsers.map((user) => (
            <option key={user.value} value={user.value}>
              {user.label}
            </option>
          ))}
        </Select>
        </div>
        <div className="flex w-[150px] px-3 items-center gap-2 h-[38px] rounded-md font-semibold border-2 border-[#EEEEEE]">
          <img src={calender} alt="" />
          <p>Date range</p>
        </div>

      </div>
      <div>
      <Calendar onChange={onChange} value={value} />
    </div>
    </div>
  );
};

export default ActivityLog;
