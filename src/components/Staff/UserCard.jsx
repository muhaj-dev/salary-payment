import React from "react";
import useFetch from "../API/useFetch";
import { Spinner } from "@chakra-ui/react";


const calculateDuration = (startDate, endDate) => {
  const diffInMs = new Date(endDate) - new Date(startDate);
  const diffInMonths = Math.floor(diffInMs / (1000 * 60 * 60 * 24 * 30));

  if (diffInMonths >= 12) {
    const years = Math.floor(diffInMonths / 12);
    return years === 1 ? `${years} year` : `${years} years`;
  } else if (diffInMonths >= 1) {
    return diffInMonths === 1
      ? `${diffInMonths} month`
      : `${diffInMonths} months`;
  } else {
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
    return diffInDays === 1 ? `${diffInDays} day` : `${diffInDays} days`;
  }
};

const UserCard = () => {
  const userDetails = localStorage.getItem("user_details");
  const user = JSON.parse(userDetails);

  const { data, pending, error } = useFetch(
    `${process.env.REACT_APP_LORCHAIN_API}/records/user/${user._id}`,

  );

  // if (!data || data?.records?.length === 0) {
  //   return (
  //     <div className="text-primary font-semibold text-[18px] itallic text-center">
  //       No salary data found.
  //     </div>
  //   );
  // }

  const totalSalary = data?.records.reduce((acc, obj) => {
    return acc + obj?.salary;
  }, 0);

  const curr = data?.records[0]?.salary;

  const activeDuration = calculateDuration(user?.start_date, new Date());

  return (
    <div className="w-full  bg-white rounded-[10px] p-6">
      {pending && (
        <div className="text-primary italic text-center bg-[red-500] font-bold text-[20px]">
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="#662483"
            size="xl"
          />
        </div>
      )}
      {error && (
        <div className="text-primary italic text-center bg-[red-500] font-bold text-[20px]">
          There is an error in the server. pls check back later...
        </div>
      )}
      <div className="flex justify-around gap-y-3 flex-wrap ">
        <div className="rounded-lg p-5 shadow-card w-full tablet:w-[47%] laptop:w-[30%]">
          <div>
            <p className="mb-1 text-[14px] laptop:text-[18px]">Last Salary</p>
            <div className="flex gap-1 items-center">
              <span className="text-[12px] laptop:text-[14px]">USD</span>
              <p className="text-[#17181D] text-[26px] laptop:text-[36px] font-[600]">
                {" "}
                {curr}
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-lg p-5 shadow-card w-full tablet:w-[47%] laptop:w-[30%]">
          <div>
            <p className="mb-1 text-[14px] laptop:text-[18px]">
              Total Paid Salary
            </p>
            <div className="flex gap-1 items-center">
              <span className="text-[12px] laptop:text-[14px]">USD</span>
              <p className="text-[#17181D] text-[26px] laptop:text-[36px] font-[600]">
                {" "}
                {totalSalary}
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-lg p-5 shadow-card w-full tablet:w-[47%] laptop:w-[30%]">
          <div>
            <p className="mb-1 text-[14px] laptop:text-[18px]">Active months</p>
            <div className="flex gap-1 items-center">
              <span className="text-[12px] laptop:text-[14px]">USD</span>
              <p className="text-[#17181D] text-[26px] laptop:text-[32px] font-[600]">
                {" "}
                {activeDuration}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
