import React, { useState } from "react";
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

const PermissionModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [checkedItems, setCheckedItems] = useState({});

  const handleChange = (event) => {
    const { name, checked } = event.target;
    setCheckedItems({ ...checkedItems, [name]: checked });
  };

  const AdminCheckbox = [
    { id: 1, label: "Read" },
    { id: 2, label: "Edit" },
    { id: 3, label: "Delete" },
    { id: 4, label: "Create" },
  ];

  const HRCheckbox = [
    { id: 1, label: "Read" },
    { id: 2, label: "Edit" },
    { id: 3, label: "Delete" },
    { id: 4, label: "Create" },
  ];

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
        <form className=" py-6">
          <div className="flex justify-between ">
            <p className="font-[500] text-[22px]">Permissions</p>
            <button className="px-5 py-1 text-white bg-primary h-fit border-2 border-primary rounded-lg">
              Save
            </button>
          </div>

          <div className="mt-10">
            <Accordion allowToggle>
              <AccordionItem>
                <h2>
                  <AccordionButton bg="#F7F7F7">
                    <Box as="span" flex="1" textAlign="left">
                      Super Admin
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>
                  <div className="flex flex-col">
                    {AdminCheckbox.map((item) => (
                      <label
                        key={item.id}
                        className="inline-flex justify-between items-center mt-3"
                      >
                        <span className="ml-2 text-gray-700">{item.label}</span>
                        <input
                          type="checkbox"
                          name={item.label}
                          className="form-checkbox accent-primary h-5 w-5 text-gray-600 transition duration-150 ease-in-out"
                          checked={checkedItems[item.label]}
                          onChange={handleChange}
                        />
                      </label>
                    ))}
                  </div>
                </AccordionPanel>
              </AccordionItem>

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
