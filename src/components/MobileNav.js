import React from "react";
import { NavLink } from "react-router-dom";
import { NavMenu } from "../Data/NavData";

const MobileNav = () => {
  return (
    <div className="mt-8">
      <div className="mt-3 flex flex-col"> 
        {NavMenu.map((nav) => (
        
          <NavLink key={nav.id} to={nav.link} className="my-4 pb-3 font-semibold text-[20px] text-black border-b-2 border-black">
            {nav.name}
          </NavLink>
         
        ))}
         <NavLink
          to="/permission"
          className="my-4 pb-3 font-semibold text-[20px] text-black border-b-2 border-black"
        >
          Admin permissions
        </NavLink>
      </div>
    </div>
  );
};

export default MobileNav;
