import React from "react";
import { useDisclosure, Input, Select } from "@chakra-ui/react";
import ModalWrapper from "../../common/ModalWrapper";
import avatar from "../../assets/avatar.svg";
import calender from "../../assets/calender.svg";

const CreateTeam = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <div>
      <button
        onClick={onOpen}
        className="px-5 py-2 text-primary border-2 border-primary rounded-lg"
      >
        Create team
      </button>
      <ModalWrapper
        isOpen={isOpen}
        size={"xl"}
        onOpen={onOpen}
        onClose={onClose}
      >
        <form className=" py-4">
          <div className="flex justify-between ">
            <p className="font-[500] text-[22px]">Add Staff</p>
            <button className="px-5 py-1 text-white bg-primary h-fit border-2 border-primary rounded-lg">
              Save information
            </button>
          </div>
          <div className="flex gap-3 mt-7 rounded-xl items-center bg-[#F7F7F7] p-3">
            <div>
              <img className="w-[50px]" src={avatar} alt="" />
            </div>
            <div>
              <p className="font-semibold ">
                Upload staff picture or drag and drop
              </p>
              <p className="text-[14px]">only files in PNG or JPG upto 3MB</p>
            </div>
          </div>
          <div className="flex items-center mt-6 gap-2 h-[38px] rounded-md font-semibold border-2 border-[#EEEEEE] p-3">
            <img src={calender} alt="" />
            <p>04, feb 2023</p>
          </div>
          <div className="flex gap-5">
            <div>
              <div className="mt-6">
                <label>Full name</label>
                <Input
                  label="text"
                  type="text"
                  // value={regFormData.email}
                  // onChange={(e) => setRegFormData({...regFormData, email: e.target.value})}
                  placeholder="Enter staff legal"
                  mt={1}
                />
              </div>
              <div className="mt-6">
                <label>Email address</label>
                <Input
                  label="email"
                  type="email"
                  // value={regFormData.email}
                  // onChange={(e) => setRegFormData({...regFormData, email: e.target.value})}
                  placeholder="enter company mail"
                  mt={1}
                />
              </div>
              <div className="mt-6">
                <label>Phone number</label>
                <Select mt={1} fontWeight={"500"} placeholder="Select action">
                  <option value="option1">Login</option>
                  <option value="option2">Add staff</option>
                  <option value="option3">Edit staff</option>
                  <option value="option3">Payment records</option>
                  <option value="option3">Download report</option>
                </Select>
              </div>
            </div>
            <div>
              <div className="mt-6">
                <label>Phone number</label>
                <Select mt={1} fontWeight={"500"} placeholder="Gender">
                  <option value="option1">Male</option>
                  <option value="option2">Female</option>
                  <option value="option3">Binary</option>
                </Select>
              </div>
              <div className="mt-6">
                <label>Nationality</label>
                <Select mt={1} fontWeight={"500"} placeholder="Select country">
                  <option value="option1">Nigerial</option>
                </Select>
              </div>
              <div className="mt-6">
                <label>Address</label>
                <Input
                  label="adrdess"
                  type="text"
                  mt={1}
                  // value={regFormData.email}
                  // onChange={(e) => setRegFormData({...regFormData, email: e.target.value})}
                  placeholder="Full address"
                />
              </div>
            </div>
            <div></div>
          </div>
        </form>
      </ModalWrapper>
    </div>
  );
};

export default CreateTeam;
