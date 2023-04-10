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
import { BsThreeDotsVertical } from "react-icons/bs";
import download from "../../assets/download.svg";
import Edit from "../../assets/Edit.svg";
import Iicon from "../../assets/Iicon.svg";
import arrowDown from '../../assets/arrowDown.svg';


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
    head: "Tax paid",
    // img: arrowDown,

  },
  {
    id: 5,
    head: "Total tax",
    // img: arrowDown,

  },
  {
    id: 6,
    head: "Salary",
    // img: arrowDown,

  },
  {
    id: 7,
    head: "Status",
  },
  {
    id: 8,
    head: "Action",
  },
];

const TaxTable = ({ TeamcurrentPosts }) => {
  const [checkedItems, setCheckedItems] = React.useState([false, false]);

  const allChecked = checkedItems.every(Boolean);
  const isIndeterminate = checkedItems.some(Boolean) && !allChecked;
  return (
    <div>
      <TableContainer>
        <Table variant="simple" id='tax-table'>
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
                  <Td  key={item.id}>
                  <span className="flex gap-2 items-center ">
                  {item.head}
                  {item.img === arrowDown ? <img src={item?.img} alt="" /> : ""}
                  </span>
                </Td>
              ))}
            </Tr>
          </Thead>
          <Tbody>
            {TeamcurrentPosts?.map((item) => (
              <Tr key={item._id}>
                <Td>
                  <Checkbox
                    isChecked={checkedItems[item._id]}
                    className="accent-primary"
                    onChange={(e) =>
                      setCheckedItems([e.target.checked, checkedItems[item._id]])
                    }
                  >
                    {" "}
                  </Checkbox>
                </Td>
                <Td className="underline">#{item._id}</Td>
                <Td>{item.user.full_name}</Td>
                <Td>
                  <span className="bg-[#F7F7F7] px-3 py-1 rounded-md">
                    {item.user.job_role}
                  </span>
                </Td>
                <Td>{item.tax}</Td>
                <Td>{item.userTotalTax}</Td>
                <Td>{item.salary}</Td>
                <Td>{item.is_paid === true ? "Paid" : "Not paid"}</Td>
                <Td>
                    <Menu bg="primary">
                      <MenuButton
                        as={Button}
                        bg="transparent"
                        _hover={{ bg: "transparent" }}
                      >
                        <BsThreeDotsVertical className="cursor-pointerml-auto text-[grey]" />
                      </MenuButton>
                      <MenuList>
                        <MenuItem
                          //   onClick={() => alert("Kagebunshin")}
                          fontWeight="semi-bold"
                          
                          display="flex"
                          justifyContent={"space-between"}
                        >
                          <div className="flex gap-2">
                            <img src={Edit} alt="" />
                            <span>Edit</span>
                          </div>
                          <img src={Iicon} alt="" />
                        </MenuItem>
                        {/* <MenuItem
                          //   onClick={() => alert("Kagebunshin")}
                          fontWeight="semi-bold"
                          
                        >
                          <div className="flex gap-2">
                            <img src={download} alt="" />
                            <span>Payment history</span>
                          </div>
                        </MenuItem> */}
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

export default TaxTable;
