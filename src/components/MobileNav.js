import React from "react";
import { NavLink } from "react-router-dom";
import { NavMenu } from "../Data/NavData";
import { MdOutlineAdminPanelSettings } from 'react-icons/md'

const MobileNav = () => {
  return (
    <div className="mt-8">
      <div className=" flex flex-col"> 
        {NavMenu.map((nav) => (
        
          <NavLink key={nav.id} to={nav.link} className="py-2 w-full pb-3 flex gap-3 items-center font-semibold text-[16px] text-black">
            {nav.icon}
            {nav.name}
          </NavLink>
         
        ))}
         <NavLink
          to="/permission"
          className="py-2 pb-3 flex gap-3 items-center font-semibold text-[16px] text-black "
        >
          <MdOutlineAdminPanelSettings  className='h-[10%] w-[10%]'/>
          Admin permissions
        </NavLink>
      </div>
    </div>
  );
};

export default MobileNav;
