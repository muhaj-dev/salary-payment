import React, { useState, useEffect } from "react";
import {
  useDisclosure,
  Box,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  useToast,
} from "@chakra-ui/react";
import ModalWrapper from "../../common/ModalWrapper";
import EditP from "../../assets/EditP.svg";
import {
  getAllPermissions,
  updateStaffPermission,
  createStaffPermission,
} from "../../helpers";
import { successToastMessage, errorToastMessage } from "../../helpers/toast";
import { useAuth } from "../API/AuthContext";

const PermissionModal = () => {
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [checkedItems, setCheckedItems] = useState([]);

  const [checkedNewRoles, setCheckedNewRoles] = useState([]);
  const [permissions, setPermission] = useState([]);
  const [newPermissionName, setNewPermissionName] = useState("");
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
        const newCheckedItems = data
          ? data?.map((permission) => {
              const checkedRoles = {};
              for (const role of permission.roles) {
                checkedRoles[role] = true;
              }
              return {
                id: permission._id,
                checkedRoles,
              };
            })
          : [];
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
      console.log(newCheckedRoles);
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

  const convertData = (data) => {
    const newData = [];

    data.forEach((item) => {
      const roles = [];

      Object.keys(item.checkedRoles).forEach((key) => {
        if (item.checkedRoles[key]) {
          roles.push(key);
        }
      });

      newData.push({
        id: item.id,
        roles,
      });
    });

    return newData;
  };

  const handleSave = (e) => {
    e.preventDefault();
    setLoading(true);
    let isUpdated = false;
    let errorMsg = "";
    let updatePermissionData = convertData(checkedItems);

    updatePermissionData.forEach((data) => {
      updateStaffPermission(data.id, JSON.stringify({ roles: data.roles }))
        .then((data) => {
          isUpdated = true;
        })
        .catch((err) => {
          errorMsg = err.message;
        });
    });
    if (isUpdated) {
      setLoading(false);
      setRefresh(!refresh);
      successToastMessage(toast, "Permission updated successfully");
    } else {
      setLoading(false);
      errorToastMessage(toast, errorMsg);
    }
    onClose();
  };

  const handleCreateChange = (e) => {
    const label = e.target.name;
    const checked = e.target.checked;
    if (checked) {
      // Add label to checkedRoles array
      setCheckedNewRoles((prevCheckedNewRoles) => [
        ...prevCheckedNewRoles,
        label,
      ]);
    } else {
      // Remove label from checkedRoles array
      setCheckedNewRoles((prevCheckedNewRoles) =>
        prevCheckedNewRoles.filter((role) => role !== label)
      );
    }
  };
  const handleCreate = (e) => {
    e.preventDefault();
    setLoading(true);
    if (!newPermissionName)
      return errorToastMessage(toast, "permission name must be set");
    let formData = JSON.stringify({
      name: newPermissionName,
      roles: checkedNewRoles,
    });

    createStaffPermission(formData)
      .then((data) => {
        onClose();
        setLoading(false);
        setRefresh(!refresh);
        successToastMessage(toast, "Permission created successfully");
      })
      .catch((err) => {
        setLoading(false);
        errorToastMessage(toast, err.message);
        onClose();
      });
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
        <form onSubmit={handleSave} className=" py-6">
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
                  <AccordionItem key={permission._id} className="mt-2">
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
                              onChange={(e) =>
                                handleChange(e, permission._id, item.label)
                              }
                              checked={
                                checkedItems.find(
                                  (checkedItem) =>
                                    checkedItem.id === permission._id &&
                                    checkedItem.checkedRoles[item.label]
                                ) || false
                              }
                            />
                          </label>
                        ))}
                      </div>
                    </AccordionPanel>
                  </AccordionItem>
                ))}
            </Accordion>
          </div>
        </form>
        <form onSubmit={handleCreate} className=" py-6">
          <div>
            <Accordion allowToggle>
              <AccordionItem mt={6} rounded="4xl">
                <h2>
                  <AccordionButton bg="#F7F7F7">
                    <Box flex="1" textAlign="left">
                      <div className=" w-full">
                        <input
                          label="text"
                          type="text"
                          id="search-box"
                          onChange={(e) => setNewPermissionName(e.target.value)}
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
                          name={item.label.toLocaleLowerCase()}
                          className="form-checkbox h-5 w-5 accent-primary text-gray-600 transition duration-150 ease-in-out"
                          // checked={checkedRoles[item.label]}
                          onChange={handleCreateChange}
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
              type="submit"
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
