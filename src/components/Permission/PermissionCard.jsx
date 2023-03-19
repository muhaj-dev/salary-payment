import React from "react";
import user from "../../assets/user.png";

const cards = [
  {
    id: 1,
    title: "Total Admin",
    number: "12",
    img: [
      {
        id: 1,
        img: user,
      },
      {
        id: 2,
        img: user,
      },
      {
        id: 3,
        img: user,
      },
    ],
  },
  {
    id: 2,
    title: "Super Permissions",
    number: "All",
    img: [
      {
        id: 1,
        img: user,
      },
      {
        id: 2,
        img: user,
      },
      {
        id: 3,
        img: user,
      },
    ],
  },
  {
    id: 3,
    title: "HR Permissions",
    number: "3",
    img: [
      {
        id: 1,
        img: user,
      },
      {
        id: 2,
        img: user,
      },
      {
        id: 3,
        img: user,
      },
    ],
  },
];
const PermissionCard = () => {
  return (
    <div className="w-full  bg-white rounded-[10px] p-6">
      <div className="flex justify-around gap-y-3 flex-wrap ">
        {cards.map((item) => (
          <div
            key={item.id}
            className="rounded-lg p-5 shadow-card w-[200px] laptop:w-[30%]"
          >
            <div>
              <p className="mb-1 text-[14px] laptop:text-[18px]">
                {item?.title}
              </p>
              <div className="flex justify-between items-center">
                <p className="text-[#17181D] text-[20px] laptop:text-[24px] font-[600]">
                  {" "}
                  {item?.number}
                </p>
                <div className="flex justify-between">
                  {item.img.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-center w-[1.9rem] h-[1.8rem] -mx-3 overflow-hidden rounded-full border-2 border-white"
                    >
                      <img src={item.img} alt="" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PermissionCard;
