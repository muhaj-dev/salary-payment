import React from "react";
import { useNavigate } from "react-router-dom";
import { Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/react";

import { IoIosArrowDown } from "react-icons/io";
import Plogo from "../../assets/Plogo.png";

const StaffNav = () => {
  const navigate = useNavigate();

  const userDetails = localStorage.getItem("user_details");
  const user = JSON.parse(userDetails);


  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const home = () => {
    navigate("/user/dashboard");
  }

  return (
    <nav className=" tablet:p-3 my-2 flex justify-between w-[95%] mx-auto max-w-[1512px]">
      <div className="flex gap-10">
        <div onClick={home}>
          <img className="h-[40px] cursor-pointer laptop:h-[45px]" src={Plogo} alt="logo" />
        </div>
      </div>
      <div className="hidden laptop:flex gap-2  my-auto">
        <Menu>
          <MenuButton pos="relative">
            <div className="flex gap-3">
              <IoIosArrowDown className="w-[30px] h-[20px] absolute -right-6 top-2" />
              <div className="rounded-full border-2 overflow-hidden ">
                <img className="h-[45px]" src={user.image.url} alt="logo" />
              </div>
              <div className="text-left h-fit">
                <p className="font-semibold">{user.full_name}</p>
                <p className="text-[#B0B0B0] text-[14px]">{user.email}</p>
              </div>
            </div>
          </MenuButton>
          <MenuList>
            <MenuItem>Change password</MenuItem>
            <MenuItem onClick={logout}>Logout</MenuItem>
          </MenuList>
        </Menu>
      </div>
      <div className="flex laptop:hidden mr-5 ml-auto ">
        <Menu>
          <MenuButton pos="relative">
            <div className="flex">
              <div className="rounded-full border-2 overflow-hidden">
                <img className=" h-[35px] w-[35px] " src={user.image.url} alt="logo" />
              </div>
              <IoIosArrowDown className="w-[30px] h-[24px] my-auto" />
            </div>
          </MenuButton>
          <MenuList>
            <MenuItem>
             Change password
            </MenuItem>
            <MenuItem  onClick={logout}>Logout</MenuItem>
          </MenuList>
        </Menu>
      </div>
    </nav>
  );
};

export default StaffNav;
