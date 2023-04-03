import React, { useState, useEffect } from "react";
import ModalWrapper from "../../common/ModalWrapper";
import { ImSearch } from "react-icons/im";
import search from "../../assets/search.svg";
import { useDisclosure, Input, Select, useToast } from "@chakra-ui/react";
import { getAllPermissions, updateStaff } from "../../helpers";
import { successToastMessage } from "../../helpers/toast";
import { useAuth } from "../API/AuthContext";
import useFetch from "../API/useFetch";
import profile from "../../assets/profile.png";

const AddAdmin = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [permission, setPermission] = useState([]);
  const [selectedPermission, setSelectedPermission] = useState("");
  const { loading, setLoading, setRefresh, refresh } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  const [selectedLead, setSelectedLead] = useState(null);
  const [searchLead, setSearchLead] = useState("");

  const [selectedUser, setSelectedUser] = useState(null);

  const toast = useToast();

  const { data, pending, error } = useFetch(
    `${process.env.REACT_APP_LORCHAIN_API}/users`
  );

  const handleSearch = (event) => {
    const value = event.target.value.toLowerCase();
    setSearchTerm(value);
    const results = data?.filter((post) =>
      post.full_name.toLowerCase().includes(value)
    );
    setFilteredData(results);
  };

  let list = data;
  if (searchTerm) {
    list = filteredData;
  }

  const handleSelectLead = (leadId) => {
    setSelectedLead(leadId);
  };

  const handleSearchLead = (event) => {
    setSearchLead(event.target.value);
  };

  const filteredLeads = list?.filter((lead) =>
    lead.full_name.toLowerCase().includes(searchLead.toLowerCase())
  );

  useEffect(() => {
    getAllPermissions()
      .then((data) => {
        setPermission(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [refresh]);

  const handleSave = (e) => {
    e.preventDefault();
    setLoading(true);
    console.log(selectedLead);
    console.log(selectedLead[0]);
    // if (selectedPermission !== permissionId) {
    //   console.log(selectedPermission);
    //   console.log(userId);
    //   let formData = new FormData();
    //   formData.append("permission", selectedPermission);
    //   updateStaff(userId, formData)
    //     .then((data) => {
    //       setRefresh(!refresh);
    //       setLoading(false);
    //       onClose();
    //       successToastMessage(toast, "Permission updated successfully");
    //       console.log(data);
    //     })
    //     .catch((err) => {
    //       setLoading(false);
    //       console.log(err);
    //     });
    // }
  };

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
        <form onSubmit={handleSave} className=" py-6">
          <div className="flex justify-between ">
            <p className="font-[500] text-[22px]">Add Admin</p>
            <button className="px-5 py-1 text-white bg-primary h-fit border-2 border-primary rounded-lg">
              Save
            </button>
          </div>

          <div className="mt-10">
            <div className="mt-6 w-full relative">
              <div>
                <label className="font-semibold">Search staff</label>
                <Input
                  label="text"
                  type="text"
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
              <ul className="mt-6 h-[150px] overflow-y-scroll">
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
                          src={
                            user.image?.url === undefined
                              ? profile
                              : user.image?.url
                          }
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
            <div className="mt-6 w-full">
              <label className="font-semibold text-18px">
                Admin Permission
              </label>
              <Select
                onChange={(e) => setSelectedPermission(e.target.value)}
                mt={1}
                py={2}
                h={"50px"}
                fontWeight={"500"}
                value={selectedPermission}
              >
                {permission?.map((item) => (
                  <option key={item._id} value={item._id}>
                    {item.name}
                  </option>
                ))}
              </Select>
            </div>
          </div>
        </form>
      </ModalWrapper>
    </div>
  );
};

export default AddAdmin;
