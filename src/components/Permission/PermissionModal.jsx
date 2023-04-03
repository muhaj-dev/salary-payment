import React, { useState, useEffect } from "react";
import {
  useDisclosure,
  Box,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from "@chakra-ui/react";
import ModalWrapper from "../../common/ModalWrapper";
import EditP from "../../assets/EditP.svg";
import { getAllPermissions, updateStaff } from "../../helpers";
import { successToastMessage } from "../../helpers/toast";
import { useAuth } from "../API/AuthContext";

const PermissionModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [checkedItems, setCheckedItems] = useState([]);

  const [permissions, setPermission] = useState([]);
  const { loading, setLoading, setRefresh, refresh } = useAuth();
  const fullPermissionOptions = [
    { id: 1, label: "read" },
    { id: 4, label: "create" },
    { id: 2, label: "edit" },
    { id: 3, label: "delete" },
  ];

  const HRCheckbox = [
    { id: 1, label: "Read" },
    { id: 2, label: "Edit" },
    { id: 3, label: "Delete" },
    { id: 4, label: "Create" },
  ];
  useEffect(() => {
    getAllPermissions()
      .then((data) => {
        setPermission(data);
        const newCheckedItems = data.map((permission) => {
          const checkedRoles = {};
          for (const role of permission.roles) {
            checkedRoles[role] = true;
          }
          return {
            id: permission._id,
            checkedRoles,
          };
        });
        setCheckedItems(newCheckedItems);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [refresh]);

  const handleChange = (event, permissionId) => {
    const { name, checked } = event.target;
    setCheckedItems((prev) => {
      const permissionIndex = prev.findIndex(
        (permission) => permission.id === permissionId
      );
      const permission = prev[permissionIndex];
      const newCheckedRoles = {
        ...permission.checkedRoles,
        [name]: checked,
      };
      return [
        ...prev.slice(0, permissionIndex),
        {
          ...permission,
          checkedRoles: newCheckedRoles,
        },
        ...prev.slice(permissionIndex + 1),
      ];
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    console.log(checkedItems);
  };

  return (
    <div>
      <button
        onClick={onOpen}
        className="flex items-center gap-2 px-5 py-2 h-fit  text-primary border-2 border-primary rounded-lg"
      >
        Permissions
        <img src={EditP} alt="" />
      </button>
      <ModalWrapper
        isOpen={isOpen}
        size={"xl"}
        onOpen={onOpen}
        onClose={onClose}
      >
        <form onSubmit={handleSubmit} className=" py-6">
          <div className="flex justify-between ">
            <p className="font-[500] text-[22px]">Permissions</p>
            <button className="px-5 py-1 text-white bg-primary h-fit border-2 border-primary rounded-lg">
              Save
            </button>
          </div>

          <div className="mt-10">
            <Accordion allowToggle>
              {permissions &&
                permissions?.map((permission) => (
                  <AccordionItem className="mt-2">
                    <h2>
                      <AccordionButton bg="#F7F7F7">
                        <Box as="span" flex="1" textAlign="left">
                          {permission.name}
                        </Box>
                        <AccordionIcon />
                      </AccordionButton>
                    </h2>
                    <AccordionPanel pb={4}>
                      <div className="flex flex-col">
                        {fullPermissionOptions.map((item, index) => (
                          <label
                            key={item.id}
                            className="inline-flex justify-between items-center mt-3"
                          >
                            <span className="ml-2 text-gray-700">
                              {item.label}
                            </span>
                            <input
                              type="checkbox"
                              name={item.label}
                              className="form-checkbox accent-primary h-5 w-5 text-gray-600 transition duration-150 ease-in-out"
                              checked={checkedItems
                                .find(
                                  (permission) =>
                                    permission._id === permission._id
                                )
                                ?.roles?.includes(item.label)}
                              onChange={(e) =>
                                handleChange(e, permission._id, item.label)
                              }
                            />
                          </label>
                        ))}
                      </div>
                    </AccordionPanel>
                  </AccordionItem>
                ))}

              <AccordionItem mt={6} rounded="4xl">
                <h2>
                  <AccordionButton bg="#F7F7F7">
                    <Box flex="1" textAlign="left">
                      <div className=" w-full">
                        <input
                          label="text"
                          type="text"
                          id="search-box"
                          // onChange={handleTeamName}
                          placeholder="Permission Name"
                          mt={1}
                          pl={3}
                        />
                      </div>
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>

                <AccordionPanel pb={4}>
                  <div className="flex flex-col">
                    {HRCheckbox.map((item) => (
                      <label
                        key={item.id}
                        className="inline-flex justify-between items-center mt-3"
                      >
                        <span className="ml-2 text-gray-700">{item.label}</span>
                        <input
                          type="checkbox"
                          name={item.label}
                          className="form-checkbox h-5 w-5 accent-primary text-gray-600 transition duration-150 ease-in-out"
                          checked={checkedItems[item.label]}
                          onChange={handleChange}
                        />
                      </label>
                    ))}
                  </div>
                </AccordionPanel>
              </AccordionItem>
            </Accordion>
          </div>
          <div className="mt-10 w-full">
            <button
              onClick={(e) => {
                e.preventDefault();
                onClose();
              }}
              className="flex w-full justify-center items-center gap-2 px-5 py-3 font-semibold h-fit  text-primary border-2 border-primary rounded-lg"
            >
              Create permission
            </button>
          </div>
        </form>
      </ModalWrapper>
    </div>
  );
};

export default PermissionModal;
