import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import PageHoc from "../components/PageHoc";
import Pagination from "../common/Pagination";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import PaymentTable from "../components/Report/PaymentTable";
import TaxTable from "../components/Report/TaxTable";
import RepoLog from "../components/Report/RepoLog";

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

const PaymentReport = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const navigate = useNavigate();

  // Get current posts

  let list = body;
  if (searchTerm) {
    list = filteredData;
  }
  
  const handleSearch = (event) => {
    const value = event.target.value.toLowerCase();
    setSearchTerm(value);
    const results = list?.filter(
      (post) =>
      post.name.toLowerCase().includes(value) 
    );
    setFilteredData(results);
  };



  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = list.slice(indexOfFirstPost, indexOfLastPost);

  //Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const paginateFront = () => setCurrentPage(currentPage + 1);
  const paginateBack = () => setCurrentPage(currentPage - 1);

  return (
    <div className="w-full bg-white rounded-[10px] p-6 mt-14">
      <RepoLog searchTerm={searchTerm} handleSearch={handleSearch} placeholder={"Search with name"} />
      <br />
      <div className=" w-[97%] mx-auto flex gap-3 tablet:gap-4 items-center ">
        <p
          className={
            "text-[20px] border-b-2 border-primary font-semibold cursor-pointer py-[17px] px-4  text-[#7D0BFE] "
          }
        >
          Permission History
        </p>
        <p
          className={
            "rounded text-[20px] font-semibold cursor-pointer py-[17px] px-4  "
          }
          onClick={() => {
            navigate("/tax/report");
          }}
        >
          Tax Summary
        </p>
      </div>
      <br />

      <PaymentTable currentPosts={currentPosts} />
      <Pagination
        postsPerPage={postsPerPage}
        totalPosts={body.length}
        currentPage={currentPage}
        paginateBack={paginateBack}
        paginateFront={paginateFront}
        paginate={paginate}
      />
    </div>
  );
};

export default PageHoc(PaymentReport);
