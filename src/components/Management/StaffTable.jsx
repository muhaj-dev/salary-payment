import React from "react";
import {
  Box,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Checkbox,
} from "@chakra-ui/react";
import { BsThreeDots } from "react-icons/bs";
import download from "../../assets/download.svg";
import Edit from "../../assets/Edit.svg";
import Iicon from "../../assets/Iicon.svg";

const table = [
  {
    id: 1,
    head: "User ID",
  },
  {
    id: 2,
    head: "Staff name",
  },
  {
    id: 3,
    head: "Role",
  },
  {
    id: 4,
    head: "Date Stated",
  },
  {
    id: 5,
    head: "End date",
  },
  {
    id: 6,
    head: "Salary",
  },
  {
    id: 7,
    head: "Action",
  },
];

const StaffTable = ({ currentPosts }) => {
  const [checkedItems, setCheckedItems] = React.useState([false, false]);

  const allChecked = checkedItems.every(Boolean);
  const isIndeterminate = checkedItems.some(Boolean) && !allChecked;
  return (
    <div>
      <TableContainer>
        <Table variant="simple">
          <Thead>
            <Tr className="font-[500] text-[18px]">
              <Td>
                <Checkbox
                  isChecked={allChecked}
                  className="accent-primary"
                  isIndeterminate={isIndeterminate}
                  onChange={(e) =>
                    setCheckedItems([e.target.checked, e.target.checked])
                  }
                >
                  {" "}
                </Checkbox>
              </Td>
              {table?.map((item) => (
                <Td key={item.id}>{item.head}</Td>
              ))}
            </Tr>
          </Thead>
          <Tbody>
            {currentPosts?.map((item) => (
              <Tr key={item.id}>
                <Td>
                  <Checkbox
                    isChecked={checkedItems[item.id]}
                    className="accent-primary"
                    onChange={(e) =>
                      setCheckedItems([e.target.checked, checkedItems[item.id]])
                    }
                  >
                    {" "}
                  </Checkbox>
                </Td>
                <Td>{item.user}</Td>
                <Td display={"flex"} gap={2} alignItems="center">
                  <img className="h-[45px]" src={item.img} alt="" />
                  <div>
                    <p className="font-semibold text-[16px]">{item.name}</p>
                    <div className="flex gap-2">
                      <p>{item.email} -</p>
                      <p className="underline"> {item.position}</p>
                    </div>
                  </div>
                </Td>
                <Td>
                  <span className="bg-[#F7F7F7] px-3 py-1 rounded-md">
                    {item.role}
                  </span>
                </Td>
                <Td>{item.dateStated}</Td>
                <Td>{item.dateEnded}</Td>
                <Td>{item.salary}</Td>
                <Td>
                  <Menu bg="primary">
                    <MenuButton
                      as={Button}
                      bg="transparent"
                      _hover={{ bg: "transparent" }}
                    >
                      <BsThreeDots className="cursor-pointerml-auto text-[grey]" />
                    </MenuButton>
                    <MenuList>
                      <MenuItem
                        //   onClick={() => alert("Kagebunshin")}
                        fontWeight="semi-bold"
                        _hover={{ color: "red" }}
                        display="flex"
                        justifyContent={"space-between"}
                      >
                        <div className="flex gap-2">
                          <img src={Edit} alt="" />
                          <span>Edit</span>
                        </div>
                        <img src={Iicon} alt="" />
                      </MenuItem>
                      <MenuItem
                        //   onClick={() => alert("Kagebunshin")}
                        fontWeight="semi-bold"
                        _hover={{ color: "red" }}
                      >
                        <div className="flex gap-2">
                          <img src={download} alt="" />
                          <span>Payment history</span>
                        </div>
                      </MenuItem>
                    </MenuList>
                  </Menu>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default StaffTable;
