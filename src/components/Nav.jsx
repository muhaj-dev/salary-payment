import React, { useRef } from "react";
import { NavMenu } from "../Data/NavData";
import { useNavigate } from "react-router-dom";
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
import MobileNav from "./MobileNav";
import { NavLink } from "react-router-dom";
import { useAuth } from "./API/AuthContext";

const Nav = () => {
  const { logout } = useAuth();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();
  const navigate = useNavigate();

  const userDetails = localStorage.getItem("user_details");
  const user = JSON.parse(userDetails);

  const home = () => {
    navigate("/admin/dashboard");
  };

  return (
    <nav className="p-3 my-2 flex justify-between w-[95%] mx-auto max-w-[1512px]">
      <div className="flex gap-10 cursor-pointer">
        <div onClick={home}>
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
              <div className="rounded-full border-2 overflow-hidden ">
                <img className="h-[45px]" src={user?.image?.url} alt="logo" />
              </div>
              <div className="text-left h-fit">
                <p className="font-semibold">{user?.full_name}</p>
                <p className="text-[#B0B0B0] text-[14px]">{user?.email}</p>
              </div>
            </div>
          </MenuButton>
          <MenuList>
            <MenuItem>
              <NavLink to="/reset-password">Change password</NavLink>
            </MenuItem>
            <MenuItem onClick={logout}>Logout</MenuItem>
          </MenuList>
        </Menu>
      </div>

      {/* Mobile view */}

      <div className="flex laptop_l:hidden mr-5 ml-auto ">
        <Menu>
          <MenuButton pos="relative">
            <div className="flex">
              <div className="rounded-full border-2 overflow-hidden">
                <img
                  className=" h-[35px] w-[35px] "
                  src={user?.image?.url}
                  alt="logo"
                />
              </div>
              <IoIosArrowDown className="w-[30px] h-[24px] my-auto" />
            </div>
          </MenuButton>
          <MenuList>
            <MenuItem>
              <NavLink to="/reset-password">Change password</NavLink>
            </MenuItem>
            <MenuItem onClick={logout}>Logout</MenuItem>
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

export default Nav;
