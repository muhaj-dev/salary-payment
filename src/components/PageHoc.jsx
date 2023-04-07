import React from "react";
import Card from "./Card";
import Hero from "./Hero";
import Navbar from "../components/NavBar";
import Nav from "../components/Nav";

const PageHoc = (WrappedComponent) => {
  return function (props) {
    return (
      <div className="flex ">
        <div className="w-full">
          {/* <Navbar /> */}
          <Nav />
          <Hero />
          <div className="pt-11 bg-[#F7F7F7] ">
          <div className="relative -top-28 w-[90%]  max-w-[1512px] mx-auto">
            <Card />
            <WrappedComponent {...props} />
          </div>
          </div>
        </div>
      </div>
    );
  };
};

export default PageHoc;
