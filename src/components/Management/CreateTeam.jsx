import React, { useState } from "react";
import { useDisclosure, Input, Textarea } from "@chakra-ui/react";
import ModalWrapper from "../../common/ModalWrapper";
import search from "../../assets/search.svg";
import user from "../../assets/user.png";
import deleteIcon from "../../assets/deleteIcon.svg";

const staff = [
  {
    id: 1,
    img: user,
    name: "Moses Samule",
    email: "samuel.lorchain@gmail.com",
  },
  {
    id: 2,
    img: user,
    name: "Moses Samule",
    email: "samuel.lorchain@gmail.com",
  },
];
const CreateTeam = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [aboutTeam, setAboutTeam] = useState("");

  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    setAboutTeam(inputValue);
  };

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
        <form className=" py-6">
          <div className="flex justify-between ">
            <p className="font-[500] text-[22px]"> Create team</p>
            <button className="px-5 py-1 text-white bg-primary h-fit border-2 border-primary rounded-lg">
              Save
            </button>
          </div>

          <div>
            <div className="mt-6 w-full">
              <label className="font-semibold">Team name</label>
              <Input
                label="text"
                type="text"
                // value={regFormData.email}
                // onChange={(e) => setRegFormData({...regFormData, email: e.target.value})}
                placeholder="chose team name"
                mt={1}
              />
            </div>
            <div className="mt-6 w-full relative">
              <label className="block mb-2 font-semibold">Team lead</label>
              <input
                label="text"
                type="text"
                // value={regFormData.email}
                // onChange={(e) => setRegFormData({...regFormData, email: e.target.value})}
                placeholder="Search staff"
                className="pl-8 w-full outline-1 border-[#eeeeee] border-2 rounded-md p-2 outline-[#EEEEEE]"
                mt={1}
              />
              <img
                className="absolute bottom-[10px] left-2"
                src={search}
                alt=""
              />
            </div>
            <div className="mt-6 w-full">
              <label className="font-semibold mb-3">About team</label>
              <Textarea
                value={setAboutTeam}
                onChange={handleInputChange}
                placeholder=""
                size="sm"
                rounded={"md"}
                mt={2}
              />
            </div>
            <div className="mt-6 w-full relative">
              <label className="block mb-2 font-semibold">Team members</label>
              <input
                label="text"
                type="text"
                // value={regFormData.email}
                // onChange={(e) => setRegFormData({...regFormData, email: e.target.value})}
                placeholder="Search members"
                className="pl-8 w-full outline-1 border-[#eeeeee] border-2 rounded-md p-2 outline-[#EEEEEE]"
                mt={1}
              />
              <img
                className="absolute bottom-[10px] left-2"
                src={search}
                alt=""
              />
            </div>

            <div className="mt-5 ">
              {staff?.map((list) => (
                <div key={list.id} className="flex justify-between mb-3">
                  <div className="flex gap-3 mb-3">
                    <img className="w-[40px] h-[40px]" src={list.img} alt="" />
                    <div>
                        <p className="font-semibold mt-1">{list.name}</p>
                        <p className="-mt-2">{list.email}</p>
                    </div>
                  </div>
                    <img src={deleteIcon} alt="" />
                </div>
              ))}
            </div>
          </div>
        </form>
      </ModalWrapper>
    </div>
  );
};

export default CreateTeam;
