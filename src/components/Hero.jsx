import React from "react";

const Hero = () => {

  
  const userDetails = localStorage.getItem("user_details");
  const user = JSON.parse(userDetails);

  return (
    <div className="bg-primary w-full">
      <div className="flex w-[90%] max-w-[1512px] mx-auto text-white justify-between pt-14 pb-20">
        <div>
          <p className="text-[26px] laptop:text-[32px]">Hi, {user.full_name}</p>
          <p className="text-[14px] laptop:text-[16px]">
            CFO - <span>Super admin</span>
          </p>
        </div>
        <div>
          <p className="text-[14px] font-[600]">LAST LOGIN</p>
          <p className="text-[12px] laptop:text-[16px] font-[400]">
            Mar 10, 2023 <span className="ml-2">2:56pm</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Hero;
