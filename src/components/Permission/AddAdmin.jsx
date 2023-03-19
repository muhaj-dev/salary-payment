import React, { useState } from "react";
import {
  useDisclosure,
  Input,
  Select,
} from "@chakra-ui/react";
import ModalWrapper from "../../common/ModalWrapper";
import { ImSearch } from "react-icons/im";
import user from "../../assets/user.png";



const staff = [
    {
      id: 1,
      img: user,
      name: "Moses Samule",
      email: "samuel.lorchain@gmail.com",
      position: "Product Design"
    },
    {
      id: 2,
      img: user,
      name: "Moses Samule",
      email: "samuel.lorchain@gmail.com",
      position: "Product Design"
    },
  ];

const AddAdmin = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();


  return (
    <div>
      <button
        onClick={onOpen}
        className="px-5 py-2 text-white bg-primary border-2 border-primary rounded-lg"
      >
        Add Admin
      </button>
      <ModalWrapper
        isOpen={isOpen}
        size={"xl"}
        onOpen={onOpen}
        onClose={onClose}
      >
        <form className=" py-6">
          <div className="flex justify-between ">
            <p className="font-[500] text-[22px]">Add Admin</p>
            <button className="px-5 py-1 text-white bg-primary h-fit border-2 border-primary rounded-lg">
              Save
            </button>
          </div>
         
          <div className="mt-10">
          <label className="font-semibold text-18px">Search Staff</label>

          <div className="">
          <input
            placeholder="Search"
            type="text"
            // value="search"
            // onChange={onChange}
            className="border-[1.5px] pl-8 w-full text-[16px] border-[black] outline-[1.5px] outline-primary px-3 py-2 mt-1 rounded-md"
          />
          <ImSearch className="relative -top-7 left-3 text-[#B9BBBE] " />
        </div>
        <div className="mt-5 h-[150px] overflow-y-scroll">
              {staff?.map((list) => (
                <div key={list.id} className="flex justify-between mb-3">
                  <div className="flex gap-3 mb-3">
                    <img className="w-[40px] h-[40px]" src={list.img} alt="" />
                    <div>
                        <p className="font-semibold mt-1">{list.name}</p>
                        <div className="flex gap-2">

                        <p className="-mt-2">{list.email}</p>
                        <p className="-mt-2">{list.position}</p>
                        </div>
                    </div>
                  </div>
                    
                </div>
              ))}
            </div>
              <div className="mt-6 w-full">
                <label className="font-semibold text-18px">Admin Permission</label>
                <Select mt={1} py={2} h={"50px"} fontWeight={"500"} placeholder="HR">
                  <option value="hr">HR</option>
                  <option value="superAdmin">Super Admin</option>
                </Select>
              </div>
              
          </div>
          
        </form>
      </ModalWrapper>
    </div>
  );
};

export default AddAdmin;
