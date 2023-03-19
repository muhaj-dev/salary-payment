import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { AiOutlineMenu } from "react-icons/ai";
import Plogo from "../assets/Plogo.png";
import user from "../assets/user.png";
import { NavMenu } from "../Data/NavData";
import MobileNav from "./MobileNav";

const Navbar = () => {
  const [isActive, setIsActive] = useState(false);

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
        <div className="flex gap-3">
          <div className="rounded-full border-2 ">
            <img className=" h-[45px]" src={user} alt="logo" />
          </div>
          <div className="my-auto h-fit">
            <p className="font-semibold">Oluwasegun Samuel</p>
            <p className="text-[#B0B0B0] text-[14px]">
              samuel.lorchain@gmail.com
            </p>
          </div>
        </div>
      </div>
      <div
        onClick={() => setIsActive(!isActive)}
        className="my-auto block laptop_l:hidden "
      >
        <AiOutlineMenu className="w-[30px] h-[30px]" />
      </div>
      {isActive && (
        <div className="absolute right-0 bg-grey top-0 h-[100vh] w-[70%] transition ease-in-out delay-350">
          <MobileNav setIsActive={setIsActive} />
        </div>
      )}
    </nav>
  );
};

export default Navbar;
