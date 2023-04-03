import React from "react";
import useFetch from "../API/useFetch";
import profile from "../../assets/profile.png";

const PermissionCard = () => {
  const { data, pending, error } = useFetch(
    `${process.env.REACT_APP_LORCHAIN_API}/users`
  );

  // Get current posts
  const list = data?.filter((admin) => admin.permission !== undefined);


  return (
    <div className="w-full  bg-white rounded-[10px] p-6">
    {pending && <div className="italic text-center mb-3">Pls wait...</div>}
    {error && <div className="italic text-center mb-3">Internal server error</div>}
      <div className="flex justify-around gap-y-3 flex-wrap ">
        <div className="rounded-lg p-5 shadow-card w-[200px] laptop:w-[30%]">
          <div>
            <p className="mb-1 text-[14px] laptop:text-[18px]">Total Admin</p>
            <div className="flex justify-between items-center">
              <p className="text-[#17181D] text-[20px] laptop:text-[24px] font-[600]">
                {" "}
                {list?.length}
              </p>
              <div className="flex justify-between">
                {list?.map((item) => (
                  <div
                    key={item._id}
                    className="flex items-center justify-center w-[1.9rem] h-[1.8rem] -mx-2.5 overflow-hidden rounded-full  border-white"
                  >
                    <img
                      src={
                        item?.image?.url === undefined
                          ? profile
                          : item?.image?.url
                      }
                      alt=""
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-lg p-5 shadow-card w-[200px] laptop:w-[30%]">
          <div>
            <p className="mb-1 text-[14px] laptop:text-[18px]">Super Permission</p>
            <div className="flex justify-between items-center">
              <p className="text-[#17181D] text-[20px] laptop:text-[24px] font-[600]">
                {" "}
                All
              </p>
              <div className="flex justify-between">
                {list?.map((item) => (
                  <div
                    key={item._id}
                    className="flex items-center justify-center w-[1.9rem] h-[1.8rem] -mx-2.5 overflow-hidden rounded-full  border-white"
                  >
                    <img
                      src={
                        item?.image?.url === undefined
                          ? profile
                          : item?.image?.url
                      }
                      alt=""
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-lg p-5 shadow-card w-[200px] laptop:w-[30%]">
          <div>
            <p className="mb-1 text-[14px] laptop:text-[18px]">HR Permission</p>
            <div className="flex justify-between items-center">
              <p className="text-[#17181D] text-[20px] laptop:text-[24px] font-[600]">
                {" "}
                {list?.length}
              </p>
              <div className="flex justify-between">
                {list?.map((item) => (
                  <div
                    key={item._id}
                    className="flex items-center justify-center w-[1.9rem] h-[1.8rem] -mx-2.5 overflow-hidden rounded-full  border-white"
                  >
                    <img
                      src={
                        item?.image?.url === undefined
                          ? profile
                          : item?.image?.url
                      }
                      alt=""
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PermissionCard;
