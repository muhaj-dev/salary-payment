import React from "react";
import arrowDown from '../assets/arrowDown.svg';
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Td,
  TableContainer,
  Checkbox,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";

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
    head: "Time & Date",
    img: arrowDown
  },
  {
    id: 4,
    head: "Action",
  },
];

const ActivityTable = ({ currentPosts }) => {
  const [checkedItems, setCheckedItems] = React.useState([false, false]);

  function formatDate(time) {
    const date = new Date(time);
    const hours = date.getHours() % 12 || 12; // convert to 12-hour format
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const amOrPm = date.getHours() < 12 ? "am" : "pm";
    const month = date.toLocaleString("default", { month: "short" });
    const day = date.getDate();
    const year = date.getFullYear();
    return `${hours}:${minutes} ${amOrPm} - ${month} ${day}, ${year}`;
  }
  const allChecked = checkedItems.every(Boolean);
  const isIndeterminate = checkedItems.some(Boolean) && !allChecked;
  return (
    <div>
      
      <TableContainer>
        <Table variant="simple" id="table-to-pdf" w={'100%'}>
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
                  <span className="flex gap-2 text-[14px]  items-center">
                  {item.head}
                  {item.img === arrowDown ? <img src={item?.img} alt="" /> : ""}
                  </span>
                </Td>
              ))}
            </Tr>
          </Thead>
          <Tbody>
            {currentPosts?.map((item) => (
              <Tr key={item?._id}>
                <Td>
                  <Checkbox
                    isChecked={checkedItems[item?.user?._id]}
                    className="accent-primary"
                    onChange={(e) =>
                      setCheckedItems([
                        e.target.checked,
                        checkedItems[item?.user?._id],
                      ])
                    }
                  >
                    {" "}
                  </Checkbox>
                </Td>
                <Td className=" text-[14px] ">{item?.user?._id}</Td>
                <Td>
                  <p className="font-semibold text-[14px] mb-1">
                    {item?.user?.full_name}
                  </p>
                  <div className="flex gap-2">
                    {/* <a href={`mailto:${item.user.email}`}>{item.user.email}</a> */}
                    <Link
                      to="#"
                      className="underline  text-[14px] "
                      onClick={(e) => {
                        window.location.href = `mailto:${item?.user?.email}`;
                        e.preventDefault();
                      }}
                    >
                      {item.user.email}
                    </Link>
                    <p className=" text-[14px] "> - {item?.permission === null ? "Staff" : "Admin"}</p>
                  </div>
                </Td>
                <Td className=" text-[14px] ">{formatDate(item.time)} </Td>
                <Td className=" text-[14px] ">{item.action}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default ActivityTable;
