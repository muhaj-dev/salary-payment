import React from "react";
import { capitalize } from '../helpers'

const Hero = () => {

  const userDetails = localStorage.getItem("user_details");
  const user = JSON.parse(userDetails);

  function formatDate(time) {
    const date = new Date(time);
    const hours = date.getHours() % 12 || 12; // convert to 12-hour format
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const amOrPm = date.getHours() < 12 ? "am" : "pm";
    const month = date.toLocaleString("default", { month: "short" });
    const day = date.getDate();
    const year = date.getFullYear();
    return `${month} ${day}, ${year} - ${hours}:${minutes} ${amOrPm}`;
  }
  return (
    <div className="bg-primary w-full">
      <div className="flex w-[90%] max-w-[1512px] mx-auto text-white justify-between pt-14 pb-20">
        <div>
          <p className="text-[26px] laptop:text-[32px]">Hi, {user?.full_name}</p>
          <p className="text-[14px] laptop:text-[16px]">
            <span>{capitalize(user?.permission?.name)}</span>
          </p>
        </div>
        <div>
          <p className="text-[14px] font-[600]">LAST LOGIN</p>
          <p className="text-[12px] laptop:text-[16px] font-[400]">
           {formatDate(user?.last_login)} <span className="ml-2">2:56pm</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Hero;
