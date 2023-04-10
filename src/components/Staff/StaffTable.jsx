import React from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Td,
  TableContainer,
  Checkbox,
} from "@chakra-ui/react";


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
            {currentPosts?.map((item) => (
              <Tr key={item?._id}>
                <Td>
                  <Checkbox
                    isChecked={checkedItems[item?._id]}
                    className="accent-primary"
                    onChange={(e) =>
                      setCheckedItems([e.target.checked, checkedItems[item?._id]])
                    }
                  >
                    {" "}
                  </Checkbox>
                </Td>
                <Td>
                  <a
                    href={item?.transaction_url}
                    target="_blank"
                    rel="noreferrer"
                    className="underline"
                  >
                    {item?._id}
                  </a>
                </Td>
                <Td>USD {item?.salary}</Td>
                <Td>{item?.payment_date}</Td>
                <Td>{item?.remark}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default StaffTable;
