import React from "react";
import {
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
    head: "Payment ID",
  },
  {
    id: 2,
    head: "Salary",
  },
  {
    id: 3,
    head: "Date",
  },
  {
    id: 4,
    head: "Note",
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
            {currentPosts?.map((item, index) => (
              <Tr key={index}>
                <Td>
                  <Checkbox
                    isChecked={checkedItems[index]}
                    className="accent-primary"
                    onChange={(e) =>
                      setCheckedItems([e.target.checked, checkedItems[index]])
                    }
                  >
                    {" "}
                  </Checkbox>
                </Td>
                <Td>
                  <a
                    href={item.transaction_url}
                    target="_blank"
                    rel="noreferrer"
                    className="underline"
                  >
                    {item._id}
                  </a>
                </Td>
                <Td>USD {item.salary}</Td>
                <Td>{item.payment_date}</Td>
                <Td>{item.remark}</Td>
                {/* <Td>
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
                          <span>Payslip </span>
                        </div>
                      </MenuItem>
                    </MenuList>
                  </Menu>
                </Td> */}
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default StaffTable;
