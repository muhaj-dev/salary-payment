import React, { useState } from "react";
import {
  useDisclosure,
  Input,
  Select,
} from "@chakra-ui/react";
import ModalWrapper from "../../common/ModalWrapper";
import avatar from "../../assets/avatar.svg";
import calender from "../../assets/calender.svg";

const radio = [
  {
    title: "Design",
    des: "The design team is responsible for creating visual and interactive experiences for the organization's products, services.",
  },
  {
    title: "Engineering",
    des: "The engineering team is responsible for developing and maintaining the organization's products and services.",
  },
  {
    title: "Community",
    des: "Responsible for promoting the organization's products and services to customers and stakeholders. ",
  },
  {
    title: "Marketing",
    des: "The design team is responsible for creating visual and interactive experiences for the organization's products, services, and brand.",
  },
  {
    title: "Operations",
    des: "The engineering team is responsible for developing and maintaining the organization's products and services.",
  },
  {
    title: "Culture",
    des: "Responsible for creating and maintaining a positive and strong culture requires intentional effort and investment.",
  },
];

const AddStaff = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedOption, setSelectedOption] = useState(radio[0].title);

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };


  return (
    <div>
      <button
        onClick={onOpen}
        className="px-5 py-2 text-white bg-primary border-2 border-primary rounded-lg"
      >
        Add Staff
      </button>
      <ModalWrapper
        isOpen={isOpen}
        size={"4xl"}
        onOpen={onOpen}
        onClose={onClose}
      >
        <form className=" py-6">
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
          <div className="flex gap-5 justify-between">
            <div className="w-full tablet:w-[48%]">
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
            <div className="w-full tablet:w-[48%]">
              <div className="mt-6">
                <label>Gender</label>
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
          </div>
          <div className="mt-6 ">
            <p className="text-[20px] font-bold">Staff Team</p>
            <div>
              <div className="flex flex-wrap gap-4 justify-between">
                {radio.map((radio) => (
                  <label key={radio.title} className="w-[90%] shadow-md rounded-lg p-4 tablet:w-[45%] laptop:w-[30%] flex items-center space-x-2">
                    <input
                      type="radio"
                      name="radioGroup"
                      value={radio.title}
                      checked={selectedOption === radio.title}
                      onChange={handleOptionChange}
                      className="h-4 w-4 text-indigo-600"
                    />
                    <div className="ml-3">
                        <p className="text-gray-900 font-[500]">{radio.title}</p>
                        <p className="text-[13px] leading-4 text-gray-700">{radio.des}</p>
                    </div>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </form>
      </ModalWrapper>
    </div>
  );
};

export default AddStaff;
