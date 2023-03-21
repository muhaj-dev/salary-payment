import React from "react";

const cards = [
  {
    id: 1,
    title: "Last Salary",
    curr: "USD",
    number: "800",
  },
  {
    id: 2,
    title: "Total Salary Paid",
    curr: "USD",
    number: "800",
  },
  {
    id: 3,
    title: "Active months",
    number: "7 months",
  },
];
const UserCard = () => {
  return (
    <div className="w-full  bg-white rounded-[10px] p-6">
      <div className="flex justify-around gap-y-3 flex-wrap ">
        {cards.map((item) => (
          <div key={item.id} className="rounded-lg p-5 shadow-card w-[200px] laptop:w-[30%]">
            <div>
                <p className="mb-1 text-[14px] laptop:text-[18px]">{item?.title}</p>
                <div className="flex items-center">
                <span className="text-[12px] laptop:text-[14px]">{item?.curr}</span>
                <p className="text-[#17181D] text-[26px] laptop:text-[36px] font-[600]"> {item?.number}</p>
                </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserCard;
