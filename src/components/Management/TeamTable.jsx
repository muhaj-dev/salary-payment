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
    head: "Team",
  },
  {
    id: 2,
    head: "Staffs",
  },
  {
    id: 3,
    head: "Agg Salary",
  },
  {
    id: 4,
    head: "Total paid",
  },
  {
    id: 5,
    head: "Date Created",
  },
  {
    id: 6,
    head: "Action",
  },
];

const TeamTable = ({ TeamcurrentPosts }) => {
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
                  isIndeterminate={isIndeterminate}
                  className="accent-primary"
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
            {TeamcurrentPosts?.map((item) => (
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
                <Td>{item.team}</Td>

                <Td>
                  <span className="bg-[#F7F7F7] px-3 py-1 rounded-md">
                    {item.staff}
                  </span>
                </Td>
                <Td>{item.agrsalary}</Td>
                <Td>{item.total}</Td>
                <Td>{item.dateCreated}</Td>
                <Td>
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
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default TeamTable;
