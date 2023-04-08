import React, { useState } from "react";
import useFetch from "../API/useFetch";
import { useToast, Flex, Spinner } from "@chakra-ui/react";
import Calendar from "react-calendar";
import { BsCheckCircleFill } from "react-icons/bs";
import { MdOutlineContentCopy } from "react-icons/md";
import { useDisclosure, Input } from "@chakra-ui/react";
import ModalWrapper from "../../common/ModalWrapper";
import { CiCalendar } from "react-icons/ci";
import { CopyToClipboard } from "react-copy-to-clipboard";
import calender from "../../assets/calender.svg";

import search from "../../assets/search.svg";

const CreateReport = () => {
  const { data, pending, error } = useFetch(
    `${process.env.REACT_APP_LORCHAIN_API}/users`
  );
  const members = data;
  const toast = useToast();
  const [loading, setLoading] = useState(true);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [salary, setSetSalary] = useState("");
  const [wallet, setWallet] = useState();
  const [selectedLead, setSelectedLead] = useState(null);
  const [searchLead, setSearchLead] = useState("");
  const [transaction_url, setTransaction_url] = useState(selectedLead);

  const [date, setDate] = useState(new Date());

  const [isCalendar, setIsCalendar] = useState(false);

  const [copyText, setCopyText] = useState("");

  // Date

  // For Team Lead

  const handleSelectLead = (userId) => {
    setSelectedLead(userId);
  };

  const handleSearchLead = (event) => {
    setSearchLead(event.target.value);
  };

  const filteredLeads = members?.filter((lead) =>
    lead.full_name.toLowerCase().includes(searchLead.toLowerCase())
  );

  // function handleChange(event) {
  //   setWallet(event.target.value);
  // }
  //textarea

  const handleSalary = (e) => {
    e.preventDefault();
    const inputValue = e.target.value;
    setSetSalary(inputValue);
  };

  const handleTrans = (e) => {
    e.preventDefault();
    const inputValue = e.target.value;
    setTransaction_url(inputValue);
  };

  const onChange = (date) => {
    setDate(date);
  };

  const formattedDate = date.toLocaleString("default", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    let userId = selectedLead[0];
    let createdDate = date;

    setLoading(false);
    const records = {
      salary,
      transaction_url,
      createdDate,
      userId,
    };
    console.log(records);

    return new Promise(async (resolve, reject) => {
      let token = localStorage.getItem("lorchaintoken");

      try {
        const response = await fetch(
          `${process.env.REACT_APP_LORCHAIN_API}/records`,
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(records),
          }
        );

        const data = await response.json();

        if (response.ok) {
          console.log(data);
          setLoading(true);

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
                Report successfuly created
              </Flex>
            ),
          });
          onClose();
        } else {
          resolve(data);
          setLoading(true);

          toast({
            position: "top-right",
            render: () => (
              <Flex
                color="white"
                p={3}
                bg="red"
                w="fit-content"
                className="gap-2 items-center font-semibold shadow-card "
                rounded={"md"}
              >
                <BsCheckCircleFill className="text-white " />
                {data.message}
              </Flex>
            ),
          });
          
          throw new Error(data.message);
        }
      } catch (error) {
        reject(error);

        // console.error(error.message);
        // console.error(error);
        throw error;
      }
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
              {loading ? (
                <button
                  type="submit"
                  className="px-5 py-1 text-white bg-primary h-fit border-2 border-primary rounded-lg"
                >
                  Save payment
                </button>
              ) : (
                <Spinner mr={14} color="primary" size="sm" />
              )}
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
                        user?._id,
                        user?.full_name,
                        user?.email,
                        user?.image?.url,
                        user?.transaction_url,
                        user?.wallet_address,
                      ])
                    }
                    className="flex cursor-pointer justify-between mb-3"
                  >
                    <div className="flex gap-3 mb-3">
                      <img
                        className="w-[40px] h-[40px] rounded-full"
                        src={user?.image?.url}
                        alt=""
                      />
                      <div className="">
                        <p className="font-semibold mt- text-start">
                          {user?.full_name}
                        </p>
                        <p className="-mt-2 text-start">{user?.email}</p>
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
              {selectedLead?.length >= 6 ? (
                <>
                  <div className="relative">
                    <Input
                      type="text"
                      value={selectedLead[5] ? selectedLead[5] : ""}
                      placeholder="0x0ee"
                      mt={1}
                      onChange={(e) => {
                        setCopyText(e.target.value);
                        setWallet(e.target?.selectedLead[5]);
                      }}
                    />
                    <CopyToClipboard
                      className="absolute cursor-pointer top-3 right-2 bg-white w-[10%] h-[60%]"
                      text={selectedLead[5] ? selectedLead[5] : ""}
                    >
                      <MdOutlineContentCopy
                        onClick={() =>
                          toast({
                            title: "Wallet copied",
                            status: "success",
                            duration: 2000,
                            isClosable: true,
                          })
                        }
                        className="p-2 bg-white"
                      />
                    </CopyToClipboard>
                  </div>
                </>
              ) : (
                <Input
                  type="text"
                  // value={selectedLead[5] ? selectedLead[5] : ""}
                  placeholder="0x0ee"
                  mt={1}
                />
              )}
              {/* <input type="text" value={wallet} onChange={handleChange} /> */}
              {/* <div>{selectedLead[5]}</div> */}
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

              {isCalendar && (
                <>
                  <div className="right-10 top-28 laptop:top-12 z-50 shadow-xl absolute"></div>
                  <div
                    onClick={() => {
                      setIsCalendar(false);
                    }}
                    className=" z-10 h-[100vh] w-[105vw] absolute -top-[34vh] right-0 -left-40"
                  />
                  <div className="absolute z-50 top-10 ">
                    <Calendar onChange={onChange} value={date} />
                  </div>
                </>
              )}
              <div
                onClick={() => {
                  setIsCalendar(true);
                }}
                className="cursor-pointer flex items-center mt-1 gap-2 h-[38px] rounded-md font-semibold border-2 border-[#EEEEEE] p-3"
              >
                <img src={calender} alt="" />
                <p>{formattedDate}</p>
                <div className="relative"></div>
              </div>
            </div>
          </div>
        </form>
      </ModalWrapper>
    </div>
  );
};

export default CreateReport;
