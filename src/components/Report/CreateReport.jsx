import React, { useState } from "react";
import useFetch from "../API/useFetch";
import { useToast, Flex } from "@chakra-ui/react";
import Calendar from "react-calendar";
import { BsCheckCircleFill } from "react-icons/bs";
import { useDisclosure, Input } from "@chakra-ui/react";
import ModalWrapper from "../../common/ModalWrapper";
import search from "../../assets/search.svg";

const CreateReport = () => {
  const { data, pending, error } = useFetch(
    `${process.env.REACT_APP_LORCHAIN_API}/users`
  );
  const members = data;
  const toast = useToast();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [salary, setSetSalary] = useState("");
  const [trans, setTrans] = useState("");
  const [wallet, setWallet] = useState("");
  const [selectedLead, setSelectedLead] = useState(null);
  const [searchLead, setSearchLead] = useState("");

  const [selectedDate, setSelectedDate] = useState('212222');
  const [isCalendar, setIsCalendar] = useState(false);

  // Date

 
  // For Team Lead

  const handleSelectLead = (leadId) => {
    setSelectedLead(leadId);
  };

  const handleSearchLead = (event) => {
    setSearchLead(event.target.value);
  };

  const filteredLeads = members?.filter((lead) =>
    lead.full_name.toLowerCase().includes(searchLead.toLowerCase())
  );

  //textarea

  const handleSalary = (e) => {
    e.preventDefault();
    const inputValue = e.target.value;
    setSetSalary(inputValue);
  };

  const handleTrans = (e) => {
    e.preventDefault();
    const inputValue = e.target.value;
    setTrans(inputValue);
  };

  const handleCalender = (e) => {
    e.preventDefault();
    const inputValue = e.target.value;
    setTrans(inputValue);
  };
  
  const handleDateClick = (e) => {
    e.preventDefault();
    const inputValue = e.target.value;
    setSelectedDate(inputValue);
  };



  const handleSubmit = (event) => {
    event.preventDefault();
    const team = {
        salary,
        wallet,
    //   lead,
    //   members,
    //   about,
    };
    // console.log(team)

    let token = localStorage.getItem("lorchaintoken");

    fetch(`${process.env.REACT_APP_LORCHAIN_API}/records`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(team),
    }).then((data) => {
      toast({
        position: "top-right",
        render: () => (
          <Flex
            color="primary"
            p={3}
            bg="white"
            w="fit-content"
            className="gap-2  items-center font-semibold shadow-card "
            rounded={"md"}
          >
            <BsCheckCircleFill className="text-[#16A34A] " />
            Staff report created successfuly
          </Flex>
        ),
      });
      onClose();
    });
  };

  return (
    <div>
      <button
        onClick={onOpen}
        className="px-5 py-2 text-primary border-2 border-primary rounded-lg"
      >
        Record payment
      </button>
      <ModalWrapper
        isOpen={isOpen}
        size={"xl"}
        onOpen={onOpen}
        onClose={onClose}
      >
        <form onSubmit={handleSubmit}>
          <div className="relative">
            <div className="flex justify-between mt-3 ">
              <p className="font-[500] text-[22px]"> Record payment</p>
              <button
                type="submit"
                className="px-5 py-1 text-white bg-primary h-fit border-2 border-primary rounded-lg"
              >
                Save payment
              </button>
            </div>

            <div className="mt-6 w-full relative">
              <label className="font-semibold">Search staff</label>
              <Input
                label="text"
                type="text"
                id="search-box"
                onChange={handleSearchLead}
                placeholder="Search staff"
                mt={1}
                pl={8}
              />
              <img
                className="absolute bottom-[10px] left-2"
                src={search}
                alt=""
              />
            </div>
            {selectedLead && (
              <div className="border-b-2 border-primary mt-4">
                <div className="flex justify-between mb-3">
                  <div className="flex gap-3 mb-3">
                    <img
                      className="w-[40px] h-[40px] rounded-full"
                      src={selectedLead[3]}
                      alt=""
                    />
                    <div className="">
                      <p className="font-semibold mt- text-start">
                        {selectedLead[1]}
                      </p>
                      <p className="-mt-2 text-start">{selectedLead[2]}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <ul className="mt-6 h-[200px] overflow-y-scroll">
              {filteredLeads?.map((user) => (
                <li key={user._id} className="flex gap-3 items-center">
                  <div
                    onClick={() =>
                      handleSelectLead([
                        user._id,
                        user.full_name,
                        user.email,
                        user.image.url,
                      ])
                    }
                    className="flex cursor-pointer justify-between mb-3"
                  >
                    <div className="flex gap-3 mb-3">
                      <img
                        className="w-[40px] h-[40px] rounded-full"
                        src={user.image?.url}
                        alt=""
                      />
                      <div className="">
                        <p className="font-semibold mt- text-start">
                          {user.full_name}
                        </p>
                        <p className="-mt-2 text-start">{user.email}</p>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-wrap mb-6 justify-between">
            <div className="relative mt-6 w-full tablet:w-[47%]">
              <label className="font-semibold">Salary</label>
              <Input
                type="number"
                id="salary"
                onChange={handleSalary}
                placeholder="1500"
                mt={1}
                pl={6}
              />
                <span className="font-bold absolute top-9 left-3">$</span>
            </div>
            <div className="mt-6  w-full tablet:w-[47%] ">
              <label className="font-semibold"> Wallet </label>
              <Input
                label="text"
                type="text"
                id="wallet"
                // onChange={handleTeamName}
                placeholder="wallet"
                mt={1}
              />
            </div>
            <div className="mt-6 w-full tablet:w-[47%]">
              <label className="font-semibold">Transaction link</label>
              <Input
                label="text"
                type="text"
                id="trans"
                onChange={handleTrans}
                placeholder="https://"
                mt={1}
              />
            </div>
            <div className="mt-6 w-full tablet:w-[47%]">
              <label className="font-semibold">Payment date</label>
              <Input
                label="text"
                type="text"
                id="date"
                // onChange={handl}
                placeholder=""
                mt={1}
              />
              {isCalendar &&
              
                <div className="-right-10 top-28 laptop:top-12 z-50 shadow-xl absolute">
          <Calendar onChange={handleDateClick} value={selectedDate} />
          <p>Selected Date: {selectedDate && selectedDate.length > 0 && selectedDate[0].time}</p>
        </div>
              }
            </div>
          </div>
        </form>
      </ModalWrapper>
    </div>
  );
};

export default CreateReport;
