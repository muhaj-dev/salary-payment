import React, { useState } from "react";
import useFetch from "../API/useFetch";
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
const lead = [
  {
    id: 1,
    img: user,
    name: "Moses",
    email: "samuel.lorchain@gmail.com",
  },
  {
    id: 2,
    img: user,
    name: "Samule",
    email: "samuel.lorchain@gmail.com",
  },
];
const CreateTeam = () => {
  const { data, pending, error } = useFetch(
    `${process.env.REACT_APP_LORCHAIN_API}/users`
  );
  // console.log(data);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [aboutTeam, setAboutTeam] = useState("");
  const [teamLead, setTeamLead] = new useState(lead);



  // dummy
  const members = data
  console.log(members)

  const [searchB, setSearchB] = useState("");

  const [term, setTerm] = useState([ ])
  const [selectedMembers, setSelectedMembers] = useState([])

  const handleSearchB = (event) => {
    setTerm(event.target.value);
  };

  const handleCheckboxChangeB = (event) => {
    const checkedName = event.target.name;
    const isChecked = event.target.checked;

    if (isChecked) {
      setSelectedMembers([...selectedMembers, checkedName]);
    } else {
      setSelectedMembers(selectedMembers?.filter((name) => name !== checkedName));
    }
  };

  const filteredNamesB = members?.filter((name) => {
  if (name) {
    return name._id.includes(searchB);
  } else {
    return name.full_name.toLowerCase().includes(searchB.toLowerCase());
  }
    // name?.full_name.toLowerCase().includes(searchB.toLowerCase()) 
}
  );


  const filterBySearch = (event) => {
    // Access input value
    const query = event.target.value;
    // Create copy of item list
    var updatedList = [...lead];
    // Include all elements which includes the search query
    updatedList = updatedList.filter((item) => {
      return item.name.toLowerCase().indexOf(query.toLowerCase()) !== -1;
    });
    // Trigger render with updated values
    setTeamLead(updatedList);
  };

  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    setAboutTeam(inputValue);
    console.log(aboutTeam);
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
                id="search-box"
                onChange={filterBySearch}
                placeholder="chose team name"
                mt={1}
              />
            </div>
            <div className="mt-6 w-full relative">
              <label className="block mb-2 font-semibold">Team lead</label>
              {/* <input
                label="text"
                type="text"
                // value={regFormData.email}
                onChange={filterBySearch}
                // onChange={(e) => setRegFormData({...regFormData, email: e.target.value})}
                placeholder="Search staff"
                className="pl-8 w-full outline-1 border-[#eeeeee] border-2 rounded-md p-2 outline-[#EEEEEE]"
                mt={1}
              /> */}
              <Input
                label="text"
                type="text"
                id="search-box"
                onChange={filterBySearch}
                placeholder="chose team name"
                mt={1}
              />
              <img
                className="absolute bottom-[10px] left-2"
                src={search}
                alt=""
              />
            </div>
            <div id="item-list">
              <ol>
                {teamLead?.map((item, index) => (
                  <li key={item.name}>{item.name}</li>
                ))}
              </ol>
            </div>
            <div className="mt-6 w-full">
              <label className="font-semibold mb-3">About team</label>
              <Textarea
                // value={setAboutTeam}
                onChange={handleInputChange}
                placeholder=""
                size="sm"
                rounded={"md"}
                mt={2}
              />
            </div>
            <div>
            <div className="mt-6 w-full relative">
               <label className="block mb-2 font-semibold">Team members</label>
              <input
                type="text"
                // value={regFormData.email}
                onChange={handleSearchB}
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
            <ul>
                {filteredNamesB?.map((name) => (
                  <li key={name._id}>
                    <label>
                      <input
                        type="checkbox"
                        name={name.full_name}
                        onChange={handleCheckboxChangeB}
                        checked={selectedMembers.includes(name.full_name)}
                      />
                      {name.full_name}
                      {name._id}
                    </label>
                  </li>
                ))}
              </ul>

              <p>Selected names:</p>
              <ul>
                {selectedMembers.map((name) => (
                  <li key={name}>
                    {name}
                      {name._id}
                  
                  </li>
                ))}
              </ul>
              
           

            
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
              {data?.map((list) => (
                <div key={list.id} className="flex justify-between mb-3">
                  <div className="flex gap-3 mb-3">
                    <img className="w-[40px] h-[40px] rounded-full" src={list.image?.url} alt="" />
                    <div>
                      <p className="font-semibold mt-1">{list.full_name}</p>
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
