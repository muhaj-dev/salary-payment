import React, { useState, useEffect } from "react";
import ActivityLog from "../components/ActivityLog";
import ActivityTable from "../components/ActivityTable";
import Card from "../components/Card";
import PageHoc from "../components/PageHoc";
import Pagination from "../common/Pagination";
import useFetch from "../components/API/useFetch";
import {
  Table,
  Thead,
  Tbody,
 Select,
  Th,
  Td,
  TableContainer,
  Checkbox,
} from "@chakra-ui/react";
const body = [
  {
    id: 1,
    user: "10233233",
    name: "Daniel Moses",
    email: "daniel.lorchain@gmail.com",
    position: "Super Admin",
    date: "10:08pm - Feb 3, 2023",
    action: "Login",
  },
  {
    id: 2,
    user: "1023344",
    name: "Daniel Moses",
    email: "daniel.lorchain@gmail.com",
    position: "Super Admin",
    date: "10:08pm - Feb 3, 2023",
    action: "Login",
  },
  {
    id: 3,
    user: "10233233",
    name: "Daniel Moses",
    email: "daniel.lorchain@gmail.com",
    position: "Super Admin",
    date: "10:08pm - Feb 3, 2023",
    action: "Login",
  },
  {
    id: 4,
    user: "1023344",
    name: "Daniel Moses",
    email: "daniel.lorchain@gmail.com",
    position: "Super Admin",
    date: "10:08pm - Feb 3, 2023",
    action: "Login",
  },
  {
    id: 5,
    user: "10233233",
    name: "Daniel Moses",
    email: "daniel.lorchain@gmail.com",
    position: "Super Admin",
    date: "10:08pm - Feb 3, 2023",
    action: "Login",
  },
  {
    id: 6,
    user: "1023344",
    name: "Daniel Moses",
    email: "daniel.lorchain@gmail.com",
    position: "Super Admin",
    date: "10:08pm - Feb 3, 2023",
    action: "Login",
  },
  {
    id: 7,
    user: "10233233",
    name: "Daniel Moses",
    email: "daniel.lorchain@gmail.com",
    position: "Super Admin",
    date: "10:08pm - Feb 3, 2023",
    action: "Login",
  },
  {
    id: 8,
    user: "1023344",
    name: "Daniel Moses",
    email: "daniel.lorchain@gmail.com",
    position: "Super Admin",
    date: "10:08pm - Feb 3, 2023",
    action: "Login",
  },
  {
    id: 9,
    user: "10233233",
    name: "Daniel Moses",
    email: "daniel.lorchain@gmail.com",
    position: "Super Admin",
    date: "10:08pm - Feb 3, 2023",
    action: "Login",
  },
  {
    id: 10,
    user: "1023344",
    name: "Daniel Moses",
    email: "daniel.lorchain@gmail.com",
    position: "Super Admin",
    date: "10:08pm - Feb 3, 2023",
    action: "Login",
  },
];

const Dashboard = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");

  // const userDetails = localStorage.getItem("user_details");
  // const user = JSON.parse(userDetails);

  const { data, pending, error } = useFetch(
    "https://lorchain-api.onrender.com/activities"
  );

  // useEffect(() => {
  //   const options = data?.map((post) => ({
  //     value: post.user.full_name,
  //     label: post.user.full_name,
  //   }));
  //   setUserOptions(options);
  // }, [data]);

  console.log(data);
  // Get current posts

  // const uniqueUsers = Array.from(
  //   new Set(data?.map((post) => post.user.full_name))
  // );
  const handleSearch = (event) => {
    const value = event.target.value.toLowerCase();
    setSearchTerm(value);
    const results = data?.filter(
      (post) =>
        post.user.full_name.toLowerCase().includes(value) ||
        post.user.email.toLowerCase().includes(value)
    );
    setFilteredData(results);
  };


  // const handleSelect = (event) => {
  //   setSelectedUser(event.target.value);
  //   setSearchTerm(event.target.value);
  // };

  const handleSelect = (event) => {
    const value = event.target.value;
    // setSearchTerm(value);
    setSelectedUser(value);

    const results = data?.filter(
      (post) => post.user.full_name.toLowerCase() === value.toLowerCase()
    );
    setFilteredData(results);
  };

  const uniqueUsers = [
    ...new Set(data?.map((post) => post.user.full_name)),
  ];
  
  const allUsers = [{ label: "All", value: "" }].concat(
    uniqueUsers.map((user) => ({ label: user, value: user }))
  );


  // const list = searchTerm ? filteredData : selectedUser ? filteredData : data;

  let list = data;
  if (searchTerm) {
    list = filteredData;
  }
  if (selectedUser) {
    list = list.filter((post) => post.user.full_name === selectedUser);
  }

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = list?.slice(indexOfFirstPost, indexOfLastPost);

  //Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const paginateFront = () => setCurrentPage(currentPage + 1);
  const paginateBack = () => setCurrentPage(currentPage - 1);

  return (
    <div className="w-full bg-white rounded-[10px] p-6 mt-14">
      <ActivityLog 
        searchTerm={searchTerm} 
        handleSearch={handleSearch} 
        selectedUser={selectedUser}
        handleSelect={handleSelect}
        allUsers={allUsers}
      />
      <br />
    
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
      <ActivityTable currentPosts={currentPosts} />
      {!pending && (
        <Pagination
          postsPerPage={postsPerPage}
          totalPosts={list?.length}
          currentPage={currentPage}
          paginateBack={paginateBack}
          paginateFront={paginateFront}
          paginate={paginate}
        />
      )}
    </div>
  );
};

export default PageHoc(Dashboard);
