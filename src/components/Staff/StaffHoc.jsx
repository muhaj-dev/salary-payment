import React from "react";
import StaffNav from "./StaffNav";
import UserCard from "./UserCard";

const PageHoc = (WrappedComponent) => {

  return function (props) {
    return (
      <div className="flex ">
        <div className="w-full">
          <StaffNav />
          <div className="bg-primary">
            <div className="w-[90%] max-w-[1512px] mx-auto text-white justify-between pt-14 pb-24">
              <p className="font-semibold text-[26px] laptop:text-[32px]">Payment Dashboard</p>
              <p className="text-[14px] laptop:text-[16px]">Access and track your salary payments</p>
            </div>
          </div>
          <div className="pt-11 bg-[#F7F7F7] ">
            <div className="relative -top-28 w-[90%]  max-w-[1512px] mx-auto">
              <UserCard />
              <WrappedComponent {...props} />
            </div>
          </div>
        </div>
      </div>
    );
  };
};

export default PageHoc;
