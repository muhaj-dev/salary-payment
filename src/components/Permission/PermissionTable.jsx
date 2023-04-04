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
import Edit from "../../assets/Edit.svg";
import { BsThreeDotsVertical } from "react-icons/bs";
import download from "../../assets/download.svg";
import Iicon from "../../assets/Iicon.svg";
import EditPermission from "./EditPermission";

const table = [
  {
    id: 1,
    head: "Admin name",
  },
  {
    id: 2,
    head: "Permission",
  },
  {
    id: 3,
    head: "Audit log",
  },
  {
    id: 4,
    head: "Action",
  },
];

const PermissionTable = ({ currentPosts }) => {
  const [checkedItems, setCheckedItems] = React.useState([false, false]);
  const allChecked = checkedItems.every(Boolean);
  const isIndeterminate = checkedItems.some(Boolean) && !allChecked;

  const adminPermit = currentPosts?.filter((employee) => employee.permission);
  // console.log(adminPermit);
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
            {adminPermit?.map((item) => (
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
                <Td>{item.full_name}</Td>
                <Td>
                  <p>{item.permission.name} </p>
                </Td>
                <Td>
                  <span className="flex gap-2 bg-[#F7F7F7] w-fit rounded-md">
                    <EditPermission
                      audit={item.audit}
                      userId={item._id}
                      permissionId={item.permission._id}
                    />
                  </span>
                </Td>
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
                          <span>Delete</span>
                        </div>
                        <img src={Iicon} alt="" />
                      </MenuItem>
                      <MenuItem
                        //   onClick={() => alert("Kagebunshin")}
                        fontWeight="semi-bold"
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

export default PermissionTable;
