import React, { useRef } from "react";
import { NavMenu } from "../Data/NavData";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Drawer,
  DrawerBody,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
} from "@chakra-ui/react";

import { AiOutlineMenu } from "react-icons/ai";
import { IoIosArrowDown } from "react-icons/io";
import Plogo from "../assets/Plogo.png";
import user from "../assets/user.png";
import MobileNav from "./MobileNav";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef();

  return (
    <nav className="p-3 my-2 flex justify-between w-[95%] mx-auto max-w-[1512px]">
      <div className="flex gap-10">
        <div>
          <img className=" h-[45px]" src={Plogo} alt="logo" />
        </div>
        <div className=" hidden laptop_l:flex align-middle font-semibold">
          <div className="flex gap-2  my-auto">
            {NavMenu.map((nav) => (
              <NavLink
                key={nav.id}
                to={nav.link}
                className=" rounded-md my-auto px-4 py-2"
              >
                {nav.name}
              </NavLink>
            ))}
          </div>
        </div>
      </div>
      <div className="hidden laptop_l:flex gap-2  my-auto">
        <NavLink
          to="/permission"
          className=" rounded-md my-auto text-primary font-semibold px-4 py-2"
        >
          Admin permissions
        </NavLink>
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

      {/* Mobile view */}

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
      <div className="my-auto z-50 block laptop_l:hidden ">
        <AiOutlineMenu
          ref={btnRef}
          onClick={onOpen}
          className="w-[30px] h-[30px]"
        />

        <Drawer
          isOpen={isOpen}
          placement="right"
          onClose={onClose}
          finalFocusRef={btnRef}
        >
          <DrawerOverlay />
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerBody>
              <MobileNav />
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      </div>
    </nav>
  );
};

export default Navbar;
