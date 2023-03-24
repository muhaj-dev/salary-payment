import React from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
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
  },
  {
    id: 4,
    head: "Action",
  },
];

const ActivityTable = ({ currentPosts }) => {
  const [checkedItems, setCheckedItems] = React.useState([false, false]);

  const dateStr = "2023-02-03T22:08:00.000Z";
  const dateObj = new Date(dateStr);

  const timeString = dateObj.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "numeric",
  });
  const dateString = dateObj.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
  const formattedDate = `${timeString.toLowerCase()} - ${dateString}`;

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
              <Tr key={item.user._id}>
                <Td>
                  <Checkbox
                    isChecked={checkedItems[item.user._id]}
                    className="accent-primary"
                    onChange={(e) =>
                      setCheckedItems([
                        e.target.checked,
                        checkedItems[item.user._id],
                      ])
                    }
                  >
                    {" "}
                  </Checkbox>
                </Td>
                <Td>{item.user._id}</Td>
                <Td>
                  <p className="font-semibold text-[16px] mb-2">
                    {item.user.full_name}
                  </p>
                  <div className="flex gap-2">
                    {/* <a href={`mailto:${item.user.email}`}>{item.user.email}</a> */}
                    <Link
                      to="#"
                      className="underline"
                      onClick={(e) => {
                        window.location.href = `mailto:${item.user.email}`;
                        e.preventDefault();
                      }}
                    >
                      {item.user.email}
                    </Link>
                    <p> - {item.position}</p>
                  </div>
                </Td>
                <Td>{formattedDate}</Td>
                <Td>{item.ip}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default ActivityTable;
