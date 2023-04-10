import React from "react";
import arrowDown from "../../assets/arrowDown.svg";
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

const table = [
  {
    id: 1,
    head: "Payment ID",
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
    // img: arrowDown,
  },
  {
    id: 5,
    head: "status",
  },
  {
    id: 6,
    head: "Salary",
    // img: arrowDown,
  },
  {
    id: 7,
    head: "Total Paid",
    // img: arrowDown,
  },
  {
    id: 8,
    head: "Action",
  },
];

const PaymentTable = ({ currentPosts }) => {
  const [checkedItems, setCheckedItems] = React.useState([false, false]);

  const allChecked = checkedItems.every(Boolean);
  const isIndeterminate = checkedItems.some(Boolean) && !allChecked;

  function formatDate(dateString) {
    const date = new Date(dateString);
    const options = {
      weekday: "long",
      year: "numeric",
      month: "short",
      day: "numeric",
    };
    return date.toLocaleDateString("en-US", options);
  }

  return (
    <div>
      <TableContainer>
        <Table variant="simple" id='payment-table'>
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
                <Td key={item.id}>
                  <span className="flex gap-2 items-center justify-center">
                    {item.head}
                    {item.img === arrowDown ? (
                      <img src={item?.img} alt="" />
                    ) : (
                      ""
                    )}
                  </span>
                </Td>
              ))}
            </Tr>
          </Thead>
          <Tbody>
            {currentPosts?.map((item) => (
              <Tr key={item._id}>
                <Td>
                  <Checkbox
                    isChecked={checkedItems[item._id]}
                    className="accent-primary"
                    onChange={(e) =>
                      setCheckedItems([
                        e.target.checked,
                        checkedItems[item._id],
                      ])
                    }
                  >
                    {" "}
                  </Checkbox>
                </Td>
                <Td>
                <a href={item.transaction_url} target='_blank'  rel="noreferrer"  className="underline">
                  #{item._id}
                  </a>
                </Td>
                <Td>
                  <p className="font-semibold text-[16px]">
                    {item.user.full_name}
                  </p>

                  <a href={item.transaction_url} target='_blank'  rel="noreferrer"  className="underline">
                    {item?.address?.slice(0, 4)}...
                    {item?.address?.slice(-3, item?.address.length)}
                  </a>
                </Td>
                <Td>
                  <span className="bg-[#F7F7F7] px-3 py-1 rounded-md">
                    {item.user.job_role}
                  </span>
                </Td>
                <Td> {formatDate(item.createdAt)}</Td>
                <Td>{item.isPaid === false ? "Not paid" : "Paid"}</Td>
                <Td>{item.salary}</Td>
                <Td>{item.userTotalSalary}</Td>
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

export default PaymentTable;
