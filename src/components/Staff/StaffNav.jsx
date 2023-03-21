import React from "react";
import {
    Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";

import { IoIosArrowDown } from "react-icons/io";
import Plogo from "../../assets/Plogo.png";
import user from "../../assets/user.png";

const StaffNav = () => {

  return (
    <nav className="p-3 my-2 flex justify-between w-[95%] mx-auto max-w-[1512px]">
      <div className="flex gap-10">
        <div>
          <img className=" h-[45px]" src={Plogo} alt="logo" />
        </div>
      </div>
      <div className="hidden laptop_l:flex gap-2  my-auto">
        <Menu>
          <MenuButton pos="relative">
            <div className="flex gap-3">
              <IoIosArrowDown className="w-[30px] h-[20px] absolute -right-6 top-2" />
              <div className="rounded-full border-2 ">
                <img className=" h-[45px]" src={user} alt="logo" />
              </div>
              <div className="text-left h-fit">
                <p className="font-semibold">Oluwasegun Samuel</p>
                <p className="text-[#B0B0B0] text-[14px]">
                  samuel.lorchain@gmail.com
                </p>
              </div>
            </div>
          </MenuButton>
          <MenuList>
            <MenuItem>Change password</MenuItem>
            <MenuItem>Logout</MenuItem>
          </MenuList>
        </Menu>
      </div>
      <div className="flex laptop_l:hidden mr-5 ml-auto ">
        <Menu>
          <MenuButton pos="relative">
            <div className="flex">
              <div className="rounded-full border-2 ">
                <img className=" h-[45px]" src={user} alt="logo" />
              </div>
              <IoIosArrowDown className="w-[30px] h-[24px] my-auto" />
            </div>
          </MenuButton>
          <MenuList>
            <MenuItem>Change password</MenuItem>
            <MenuItem>Logout</MenuItem>
          </MenuList>
        </Menu>
      </div>

    </nav>
  );
};

export default StaffNav;
