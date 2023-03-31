import React from "react";
import useFetch from "./API/useFetch";


const Card = () => {
  const { data, pending, error } = useFetch(
    `${process.env.REACT_APP_LORCHAIN_API}/records`,
    );

    const { data: staff } = useFetch(
      `${process.env.REACT_APP_LORCHAIN_API}/users`,
  
    );

    const { data: team } = useFetch(
      `${process.env.REACT_APP_LORCHAIN_API}/teams`,
  
    );


    const cards = [
      {
        id: 1,
        title: "Total Salary Paid",
        curr: "USD",
        number: data?.totalSalary,
      },
      {
        id: 2,
        title: "Total Staff",
        number: staff?.length,
      },
      {
        id: 3,
        title: "Teams",
        number: team?.length,
      },
    ];

  return (
    <div className="w-full  bg-white rounded-[10px] p-6">
      <div className="flex justify-around gap-y-3 flex-wrap ">
        {cards.map((item) => (
          <div key={item.id} className="rounded-lg p-5 shadow-card w-[200px] laptop:w-[30%]">
            <div>
                <p className="mb-1 text-[14px] laptop:text-[18px]">{item?.title}</p>
                <div className="flex items-center">
                <span className="text-[12px] laptop:text-[14px]">{item?.curr}</span>
                {pending && <div className="ml-2"> ---</div>}
                <p className="text-[#17181D] text-[22px] laptop:text-[30px] font-[600]"> {item.number}</p>
                </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Card;