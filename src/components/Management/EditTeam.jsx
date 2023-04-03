import React, { useState } from "react";
import useFetch from "../API/useFetch";
import { useToast, Flex } from "@chakra-ui/react";
import { BsCheckCircleFill } from "react-icons/bs";
import { useDisclosure, Input, Textarea } from "@chakra-ui/react";
import ModalWrapper from "../../common/ModalWrapper";
import search from "../../assets/search.svg";
import Edit from "../../assets/Edit.svg";
import Iicon from "../../assets/Iicon.svg";

const EditTeam = ({ item }) => {
  const { data } = useFetch(`${process.env.REACT_APP_LORCHAIN_API}/users`);
  const members = data;
  const toast = useToast();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [aboutTeam, setAboutTeam] = useState("");
  const [teamName, setTeamName] = useState("");
  const [checkedUserIds, setCheckedUserIds] = useState([]);

  const [selectedLead, setSelectedLead] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchLead, setSearchLead] = useState("");

  // dummy

  // selected users

  const handleCheckboxChange = (event) => {
    const userId = event.target.value;
    const isChecked = event.target.checked;

    if (isChecked) {
      setCheckedUserIds([...checkedUserIds, userId]);
    } else {
      setCheckedUserIds(checkedUserIds?.filter((id) => id !== userId));
    }
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredUsers = members?.filter((user) =>
    user?.full_name?.toLowerCase()?.includes(searchTerm.toLowerCase())
  );

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

  const handleInputChange = (e) => {
    e.preventDefault();
    const inputValue = e.target.value;
    setAboutTeam(inputValue);
  };

  const handleTeamName = (e) => {
    e.preventDefault();
    const inputValue = e.target.value;
    setTeamName(inputValue);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const lead = selectedLead[1];
    const membersId = checkedUserIds;
    const about = aboutTeam;
    const name = teamName;
    const teams = {
      name,
      lead,
      membersId,
      about,
    };

    let token = localStorage.getItem("lorchaintoken");
    fetch(`${process.env.REACT_APP_LORCHAIN_API}/teams/${item._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(teams),
    })
      .then((res) => res.json())
      .then((data) => {
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
              Team created successfuly
            </Flex>
          ),
        });
        onClose();
      window.location.reload(false);
        

        // setIsPending(false);
      })
      .catch((err) => {
        // setLoading(false);
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
              Team not created
            </Flex>
          ),
        });
        //handle any error here
        console.log(err);
      });
  };

  return (
    <div>
      <div
        onClick={onOpen}
        className="w-full flex gap-10 tablet:gap-16 justify-between"
      >
        <div className="  flex gap-2">
          <img src={Edit} alt="" />
          <span>Edit</span>
        </div>
        <img src={Iicon} alt="" />
      </div>
      <ModalWrapper
        isOpen={isOpen}
        size={"xl"}
        onOpen={onOpen}
        onClose={onClose}
      >
        <form onSubmit={handleSubmit}>
          <div className="relative">
            <div className="flex justify-between mt-3 ">
              <p className="font-[500] text-[22px]"> Create team</p>
              <button
                type="submit"
                className="px-5 py-1 text-white bg-primary h-fit border-2 border-primary rounded-lg"
              >
                Save
              </button>
            </div>
            <div className="mt-6 w-full">
              <label className="font-semibold">Team name</label>
              <Input
                label="text"
                type="text"
                // value={item.name}
                id="search-box"
                onChange={handleTeamName}
                placeholder="chose team name"
                mt={1}
              />
            </div>
            <div className="mt-6 w-full relative">
              <label className="font-semibold">Team Lead</label>
              <Input
                label="text"
                type="text"
                // value={item.lead}
                id="search-box"
                onChange={handleSearchLead}
                placeholder="Search Lead"
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
            <ul className="mt-6  h-[150px] overflow-y-scroll">
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

          <div className="mt-6 w-full ">
            <label className="font-semibold mb-3">About team</label>
            <Textarea
              // value={setAboutTeam}
              //   value={item.about}
              onChange={handleInputChange}
              placeholder=""
              size="sm"
              rounded={"md"}
              mt={2}
            />
          </div>
          <div className="mt-6 w-full relative ">
            <label className="font-semibold">Team members</label>
            <Input
              label="text"
              type="text"
              //   value={item.members[1]}
              id="search-box"
              onChange={handleSearchChange}
              placeholder="Search member"
              mt={1}
              pl={8}
            />
            <img
              className="absolute bottom-[10px] left-2"
              src={search}
              alt=""
            />
          </div>

          <ul className="mt-6 h-[200px] overflow-y-scroll">
            {filteredUsers?.map((user) => (
              <li key={user._id} className="flex gap-3 items-center ">
                <input
                  type="checkbox"
                  value={user._id}
                  checked={checkedUserIds?.includes(user._id)}
                  onChange={handleCheckboxChange}
                  className="my-auto mt-3"
                />
                <div className="flex justify-between mb-3">
                  <div className="flex gap-3 mb-3">
                    <img
                      className="w-[40px] h-[40px] rounded-full"
                      src={user.image?.url}
                      alt=""
                    />
                    <div>
                      <p className="font-semibold mt-1">{user.full_name}</p>
                      <p className="-mt-2">{user.email}</p>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </form>
      </ModalWrapper>
    </div>
  );
};

export default EditTeam;
