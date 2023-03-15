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
  ]

const ActivityTable = ({currentPosts}) => {
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
                    onChange={(e) =>
                      setCheckedItems([e.target.checked, checkedItems[item.id]])
                    }
                  >
                    {" "}
                  </Checkbox>
                </Td>
                <Td>{item.user}</Td>
                <Td>
                  <p className="font-semibold text-[16px] mb-2">{item.name}</p>
                  <div className="flex gap-2">
                    <p>{item.email}</p>
                    <p> - {item.position}</p>
                  </div>
                </Td>
                <Td>{item.date}</Td>
                <Td>{item.action}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default ActivityTable;
