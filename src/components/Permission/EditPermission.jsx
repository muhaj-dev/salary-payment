import React, { useState } from "react";
import {
  useDisclosure,
  Input,
  Select,
} from "@chakra-ui/react";
import ModalWrapper from "../../common/ModalWrapper";
import Edit from "../../assets/Edit.svg";




const EditPermission = ({audit}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();


  return (
    <div>
      <button
        onClick={onOpen}
        className="flex items-center gap-2 px-5 py-2 h-fit rounded-lg"
      >
         <img src={Edit} alt="" />
                  {audit}
      </button>
      <ModalWrapper
        isOpen={isOpen}
        size={"xl"}
        onOpen={onOpen}
        onClose={onClose}
      >
        <form className=" py-6">
          <div className="flex justify-between ">
            <p className="font-[500] text-[22px]">Edit Permission</p>
            <button className="px-5 py-1 text-white bg-primary h-fit border-2 border-primary rounded-lg">
              Save
            </button>
          </div>
         
          <div className="mt-10">

            <div className="mt-6 w-full">
                <label className="font-semibold text-18px">Admin Permission</label>
                <Select mt={1} py={2} h={"50px"} fontWeight={"500"} placeholder="HR">
                  <option value="superAdmin">Super Admin</option>
                </Select>
            </div>
              
          </div>          
        </form>
      </ModalWrapper>
    </div>
  );
};

export default EditPermission;
