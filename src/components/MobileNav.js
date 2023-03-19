import React from "react";
import { NavLink } from "react-router-dom";
import {ImCancelCircle} from 'react-icons/im'

import { NavMenu } from "../Data/NavData";

const MobileNav = ({ setIsActive }) => {
  return (
    <div>
      <ImCancelCircle onClick={(() => setIsActive(false))} className="w-[30px] h-[30px]  ml-auto mr-10 mt-9" />
      <div className="mt-3 flex flex-col"> 
        {NavMenu.map((nav) => (
          <NavLink key={nav.id} to={nav.link} className="my-4 mx-4 pb-3 font-bold text-[20px] text-black border-b-2 border-black">
            {nav.name}
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default MobileNav;
