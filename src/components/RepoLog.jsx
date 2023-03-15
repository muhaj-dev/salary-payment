import React from "react";
import SearchFill from "../assets/SearchFill.svg";
import { ImSearch } from "react-icons/im";
import downloadw from "../assets/downloadw.svg"

const RepoLog = () => {
  return (
    <div className="flex flex-wrap justify-between">
      <div>
        <p className="font-[500] text-[20px] laptop:text-[25px]">
          Report
        </p>
      </div>
      <div className="flex gap-3">
        <div className="flex relative">
          <ImSearch className="relative top-3 h-[20px] w-[30px] left-[32px] text-[#B9BBBE] " />
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
          <button className="flex gap-2 px-5 py-2 bg-primary text-white border-2 border-primary rounded-lg">
          <img
            className="h-[16px] my-auto rounded-md"
            src={downloadw}
            alt=""
          />
          Download
          </button>
          <button className="px-5 py-2 text-primary border-2 border-primary rounded-lg">
          Record payment
          </button>
        </div>
      </div>
    </div>
  );
};

export default RepoLog;
