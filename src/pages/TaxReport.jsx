import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import PageHoc from "../components/PageHoc";
import Pagination from "../common/Pagination";
import TaxTable from "../components/Report/TaxTable";
import RepoLog from "../components/Report/RepoLog";
import useFetch from "../components/API/useFetch";


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
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const navigate = useNavigate();

  const { data, pending, error } = useFetch(
    `${process.env.REACT_APP_LORCHAIN_API}/records`
  );

// console.log(data)
  
  let teamList = data;
  if (searchTerm) {
      teamList = filteredData;
    }

  const handleSearch = (event) => {
    const value = event.target.value.toLowerCase();
    setSearchTerm(value);
    const results = teamList?.filter((post) =>
    post?.user?.full_name.toLowerCase().includes(value)
    );
    setFilteredData(results);
};

// Get current posts

const indexOfLastPost = currentPage * postsPerPage;
const indexOfFirstPost = indexOfLastPost - postsPerPage;
// const currentPosts = teamList?.slice(indexOfFirstPost, indexOfLastPost);
  const TeamcurrentPosts = teamList?.records?.slice(indexOfFirstPost, indexOfLastPost);

  //Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const paginateFront = () => setCurrentPage(currentPage + 1);
  const paginateBack = () => setCurrentPage(currentPage - 1);

  return (
    <div className="w-full bg-white rounded-[10px] p-6 mt-14">
      <RepoLog
        searchTerm={searchTerm}
        handleSearch={handleSearch}
        placeholder={"Search with name"}
      />

      <br />
      <div className=" w-[97%] mx-auto flex gap-3 tablet:gap-4 items-center ">
        <p
          className={
            "rounded text-[20px] font-semibold cursor-pointer py-[17px] px-4  "
          }
          onClick={() => {
            navigate("/payment/report");
          }}
        >
          Payment History
        </p>
        <p
          className={
            "text-[20px] border-b-2 border-primary font-semibold cursor-pointer py-[17px] px-4  text-[#7D0BFE] "
          }
        >
          Tax Summary
        </p>
      </div>
      <br />

      <TaxTable TeamcurrentPosts={TeamcurrentPosts} />
      {pending && (
        <div className=" italic my-20 text-center bg-[red-500] font-semibold text-[20px]">
          Loading...
        </div>
      )}
      {error && (
        <div className=" italic my-20 text-center bg-[red-500] font-semibold text-[20px]">
          There is an error in the server. pls check back later...
        </div>
      )}
      <Pagination
        postsPerPage={postsPerPage}
        totalPosts={teamList?.length}
        currentPage={currentPage}
        paginateBack={paginateBack}
        paginateFront={paginateFront}
        paginate={paginate}
      />
    </div>
  );
};

export default PageHoc(Report);
