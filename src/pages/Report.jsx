import React, { useState } from "react";
import MangLog from "../components/Management/MangLog";
import PageHoc from "../components/PageHoc";
import Pagination from "../common/Pagination";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import PaymentTable from "../components/PaymentTable";
import TaxTable from "../components/TaxTable";
import RepoLog from "../components/RepoLog";

const body = [
  {
    id: 1,
    user: "10233233",
    name: "Moses Samuel",
    status: "Paid",
    wallet: "0x1725...5d8136",
    role: "Product Designer",
    total: "USD $5400.00",
    dateStated: "Saturday, 11 March ",
    salary: "USD $5800.00",
  },
  {
    id: 2,
    user: "1023344",
    name: "Daniel Moses",
    status: "Paid",
    wallet: "0x1725...5d8136",
    role: "Product Designer",
    total: "USD $5400.00",
    dateStated: "Saturday, 11 March ",
    salary: "USD $5800.00",
  },
  {
    id: 3,
    user: "10233233",
    name: "Daniel Moses",
    status: "Paid",
    wallet: "0x1725...5d8136",
    role: "Product Designer",
    total: "USD $5400.00",
    dateStated: "Saturday, 11 March ",
    salary: "USD $5800.00",
  },
  {
    id: 4,
    user: "1023344",
    name: "Daniel Moses",
    status: "Paid",
    wallet: "0x1725...5d8136",
    role: "Product Designer",
    total: "USD $5400.00",
    dateStated: "Saturday, 11 March ",
    salary: "USD $5800.00",
  },
  {
    id: 5,
    user: "10233233",
    name: "Daniel Moses",
    status: "Paid",
    wallet: "0x1725...5d8136",
    role: "Product Designer",
    total: "USD $5400.00",
    dateStated: "Saturday, 11 March ",
    salary: "USD $5800.00",
  },
  {
    id: 6,
    user: "1023344",
    name: "Daniel Moses",
    status: "Paid",
    wallet: "0x1725...5d8136",
    role: "Product Designer",
    total: "USD $5400.00",
    dateStated: "Saturday, 11 March ",
    salary: "USD $5800.00",
  },
  {
    id: 7,
    user: "10233233",
    name: "Daniel Moses",
    status: "Paid",
    wallet: "0x1725...5d8136",
    role: "Product Designer",
    total: "USD $5400.00",
    dateStated: "Saturday, 11 March ",
    salary: "USD $5800.00",
  },
  {
    id: 8,
    user: "1023344",
    name: "Daniel Moses",
    status: "Paid",
    wallet: "0x1725...5d8136",
    role: "Product Designer",
    total: "USD $5400.00",
    dateStated: "Saturday, 11 March ",
    salary: "USD $5800.00",
  },
  {
    id: 9,
    user: "10233233",
    name: "Daniel Moses",
    status: "Paid",
    wallet: "0x1725...5d8136",
    role: "Product Designer",
    total: "USD $5400.00",
    dateStated: "Saturday, 11 March ",
    salary: "USD $5800.00",
  },
  {
    id: 10,
    user: "1023344",
    name: "Daniel Moses",
    status: "Paid",
    wallet: "0x1725...5d8136",
    role: "Product Designer",
    total: "USD $5400.00",
    dateStated: "Saturday, 11 March ",
    salary: "USD $5800.00",
  },
];

const Teambody = [
  {
    id: 1,
    user: "1029333",
    staff: "Mosses Samuel",
    role: "Product Designer",
    taxPaid: "USD $40.00",
    totalTax: "$400.00",
    salary: "USD $5400.00",
    status: "Paid",
  },
  {
    id: 2,
    user: "1029333",
    staff: "Mosses Samuel",
    role: "Product Designer",
    taxPaid: "USD $40.00",
    totalTax: "$400.00",
    salary: "USD $5400.00",
    status: "Paid",
  },
  {
    id: 3,
    
    user: "1029333",
    staff: "Mosses Samuel",
    role: "Product Designer",
    taxPaid: "USD $40.00",
    totalTax: "$400.00",
    salary: "USD $5400.00",
    status: "Paid",
  },
  {
    id: 4,
    
    user: "1029333",
    staff: "Mosses Samuel",
    role: "Product Designer",
    taxPaid: "USD $40.00",
    totalTax: "$400.00",
    salary: "USD $5400.00",
    status: "Paid",
  },
  {
    id: 5,
    
    user: "1029333",
    staff: "Mosses Samuel",
    role: "Product Designer",
    taxPaid: "USD $40.00",
    totalTax: "$400.00",
    salary: "USD $5400.00",
    status: "Paid",
  },
  {
    id: 6,
    
    user: "1029333",
    staff: "Mosses Samuel",
    role: "Product Designer",
    taxPaid: "USD $40.00",
    totalTax: "$400.00",
    salary: "USD $5400.00",
    status: "Paid",
  },
  {
    id: 7,
    
    user: "1029333",
    staff: "Mosses Samuel",
    role: "Product Designer",
    taxPaid: "USD $40.00",
    totalTax: "$400.00",
    salary: "USD $5400.00",
    status: "Paid",
  },
  {
    id: 8,
    
    user: "1029333",
    staff: "Mosses Samuel",
    role: "Product Designer",
    taxPaid: "USD $40.00",
    totalTax: "$400.00",
    salary: "USD $5400.00",
    status: "Paid",
  },
  {
    id: 9,
    
    user: "1029333",
    staff: "Mosses Samuel",
    role: "Product Designer",
    taxPaid: "USD $40.00",
    totalTax: "$400.00",
    salary: "USD $5400.00",
    status: "Paid",
  },
  {
    id: 10,
    
    user: "1029333",
    staff: "Mosses Samuel",
    role: "Product Designer",
    taxPaid: "USD $40.00",
    totalTax: "$400.00",
    salary: "USD $5400.00",
    status: "Paid",
  },
];

const Report = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(5);

  // Get current posts
  const list = body;
  const teamList = Teambody;

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = list.slice(indexOfFirstPost, indexOfLastPost);
  const TeamcurrentPosts = teamList.slice(indexOfFirstPost, indexOfLastPost);

  //Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const paginateFront = () => setCurrentPage(currentPage + 1);
  const paginateBack = () => setCurrentPage(currentPage - 1);

  return (
    <div className="w-full bg-white rounded-[10px] p-6 mt-14">
      <RepoLog />
      <br />
      <Tabs pos={"relative"} bg="#fff" p="12px" rounded="sm" mt={4}>
        <TabList
          border="2px solid bgLight"
          className="overflow-x-auto overflow-y-hidden h-fit"
        >
          <Tab
            mr={{ md: "0", lg: "4" }}
            h="fit-content"
            fontSize={"18px"}
            fontWeight="600"
            _selected={{ color: "#7D0BFE", borderBottom: "2px solid #7D0BFE" }}
          >
            Payment History
          </Tab>
          <Tab
            mr={{ md: "0", lg: "4" }}
            h="fit-content"
            fontSize={"18px"}
            fontWeight="600"
            _selected={{ color: "#7D0BFE", borderBottom: "2px solid #7D0BFE" }}
          >
            Tax Summary
          </Tab>
        </TabList>

        <TabPanels mt="20px">
          <TabPanel>
            <PaymentTable currentPosts={currentPosts} />
            <Pagination
              postsPerPage={postsPerPage}
              totalPosts={body.length}
              currentPage={currentPage}
              paginateBack={paginateBack}
              paginateFront={paginateFront}
              paginate={paginate}
            />
          </TabPanel>
          <TabPanel>
            <TaxTable TeamcurrentPosts={TeamcurrentPosts} /> 
            <Pagination
              postsPerPage={postsPerPage}
              totalPosts={Teambody.length}
              currentPage={currentPage}
              paginateBack={paginateBack}
              paginateFront={paginateFront}
              paginate={paginate}
            /> 
          </TabPanel>
        </TabPanels>
      </Tabs>
    </div>
  );
};

export default PageHoc(Report);
