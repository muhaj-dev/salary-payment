import React, { useState, useEffect } from "react";
import useFetch from "../API/useFetch";
import profile from "../../assets/profile.png";
import { getAllPermissions } from "../../helpers";
import { useAuth } from "../API/AuthContext";
const PermissionCard = () => {
  const [permissions, setPermissions] = useState([]);
  const { refresh } = useAuth();
  const { data, pending, error } = useFetch(
    `${process.env.REACT_APP_LORCHAIN_API}/users`
  );

  useEffect(() => {
    getAllPermissions()
      .then((data) => {
        setPermissions(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [refresh]);

  const capitalize = (str) => {
    return str
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };
  // Get current posts
  const list = data?.filter((admin) => admin.permission !== undefined);

  return (
    <div className="w-full  bg-white rounded-[10px] p-6">
      {pending && <div className="italic text-center mb-3">Please wait...</div>}
      {error && (
        <div className="italic text-center mb-3">Internal server error</div>
      )}
      {permissions && (
        <div className="flex justify-around gap-y-3 flex-wrap ">
          <div className="rounded-lg p-5 shadow-card w-[200px] laptop:w-[30%]">
            <div>
              <p className="mb-1 text-[14px] laptop:text-[18px]">
                Total Permission
              </p>
              <div className="flex justify-between items-center">
                <p className="text-[#17181D] text-[20px] laptop:text-[24px] font-[600]">
                  {" "}
                  {permissions?.length}
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

          {permissions.map((permission) => (
            <div
              key={permission._id}
              className="rounded-lg p-5 shadow-card w-[200px] laptop:w-[30%]"
            >
              <div>
                <p className="mb-1 text-[14px] laptop:text-[18px]">
                  {capitalize(permission.name)}
                </p>
                <div className="flex justify-between items-center">
                  <p className="text-[#17181D] text-[20px] laptop:text-[24px] font-[600]">
                    {" "}
                    {permission?.roles.length === 4
                      ? "All"
                      : permission.roles.length}
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
          ))}
        </div>
      )}
    </div>
  );
};

export default PermissionCard;
