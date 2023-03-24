import React, { useState, useEffect } from "react";
import StaffHoc from "../components/Staff/StaffHoc";
import Pagination from "../common/Pagination";
import StaffLog from "../components/Staff/StaffLog";
import StaffTable from "../components/Staff/StaffTable";
import useFetch from "../components/API/useFetch";

// const body = [
//   {
//     id: 1,
//     paymentID: "10233233",
//     salary: "$800.00",
//     date: "Saturday, 11 March",
//     note: "You did great",
//   },
//   {
//     id: 2,
//     paymentID: "1023344",
//     salary: "$800.00",
//     date: "Saturday, 11 March",
//     note: "You did great",
//   },
//   {
//     id: 3,
//     paymentID: "10233233",
//     salary: "$800.00",
//     date: "Saturday, 11 March",
//     note: "You did great",
//   },
//   {
//     id: 4,
//     paymentID: "1023344",
//     salary: "$800.00",
//     date: "Saturday, 11 March",
//     note: "You did great",
//   },
//   {
//     id: 5,
//     paymentID: "10233233",
//     salary: "$800.00",
//     date: "Saturday, 11 March",
//     note: "You did great",
//   },
//   {
//     id: 6,
//     paymentID: "1023344",
//     salary: "$800.00",
//     date: "Saturday, 11 March",
//     note: "You did great",
//   },
//   {
//     id: 7,
//     paymentID: "10233233",
//     salary: "$800.00",
//     date: "Saturday, 11 March",
//     note: "You did great",
//   },
//   {
//     id: 8,
//     paymentID: "1023344",
//     salary: "$800.00",
//     date: "Saturday, 11 March",
//     note: "You did great",
//   },
//   {
//     id: 9,
//     paymentID: "10233233",
//     salary: "$800.00",
//     date: "Saturday, 11 March",
//     note: "You did great",
//   },
//   {
//     id: 10,
//     paymentID: "1023344",
//     salary: "$800.00",
//     date: "Saturday, 11 March",
//     note: "You did great",
//   },
// ];

const StaffDashboard = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(5);

  const userDetails = localStorage.getItem("user_details");
  const user = JSON.parse(userDetails);

  const { data, pending, error } = useFetch(
    "https://lorchain-api.onrender.com/records/user/" + user._id
  );

  // Get current posts
  const list = data;

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = list?.slice(indexOfFirstPost, indexOfLastPost);

  //Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const paginateFront = () => setCurrentPage(currentPage + 1);
  const paginateBack = () => setCurrentPage(currentPage - 1);

  return (
    <div className="w-full bg-white rounded-[10px] p-6 mt-14">
      <StaffLog />
      <br />
      <br />

      {pending && (
        <div className="text-primary italic text-center bg-[red-500] font-bold text-[20px]">
          Loading...
        </div>
      )}
      {error && (
        <div className="text-primary italic text-center bg-[red-500] font-bold text-[20px]">
          There is an error in the server. pls check back later...
        </div>
      )}
      {currentPosts && <StaffTable currentPosts={currentPosts} />}
      <Pagination
        postsPerPage={postsPerPage}
        totalPosts={data?.length}
        currentPage={currentPage}
        paginateBack={paginateBack}
        paginateFront={paginateFront}
        paginate={paginate}
      />
    </div>
  );
};

export default StaffHoc(StaffDashboard);
