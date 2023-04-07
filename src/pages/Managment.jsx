import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import MangLog from "../components/Management/MangLog";
import PageHoc from "../components/PageHoc";
import { Spinner } from "@chakra-ui/react";
import Pagination from "../common/Pagination";
import StaffTable from "../components/Management/StaffTable";
import useFetch from "../components/API/useFetch";


const Managment = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [postsPerPage] = useState(8);
  const navigate = useNavigate();

  const { data, pending, error } = useFetch(
    `${process.env.REACT_APP_LORCHAIN_API}/users`,

  );
  // console.log(data)

  // Get current posts

  const handleSearch = (event) => {
    const value = event.target.value.toLowerCase();
    setSearchTerm(value);
    const results = data?.filter(
      (post) =>
      post.full_name.toLowerCase().includes(value) 
    );
    setFilteredData(results);
  };
  let list = data;
  if (searchTerm) {
    list = filteredData;
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
      <MangLog searchTerm={searchTerm} handleSearch={handleSearch} placeholder={"Search with Staff name"} />
    
      <br />

      <div className=" w-[97%] mx-auto flex gap-3 tablet:gap-4 items-center ">
        <p
          className={
            "text-[20px] border-b-2 border-primary font-semibold cursor-pointer py-[17px] px-4  text-[#7D0BFE] "
          }
        >
          Staffs
        </p>
        <p
          className={
            "rounded text-[20px] font-semibold cursor-pointer py-[17px] px-4  "
          }
          onClick={() => {
            navigate("/management/teams");
          }}
        >
          Teams
        </p>
      </div>
      <br />

      <StaffTable currentPosts={currentPosts} />
      {pending && (
        <div className=" italic my-20 text-center bg-[red-500] font-semibold text-[20px]">
           <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="#662483"
            size="xl"
          />
        </div>
      )}
      {error && (
        <div className=" italic my-20 text-center bg-[red-500] font-semibold text-[20px]">
          There is an error in the server. pls check back later...
        </div>
      )}
      <Pagination
        postsPerPage={postsPerPage}
        totalPosts={list?.length}
        currentPage={currentPage}
        paginateBack={paginateBack}
        paginateFront={paginateFront}
        paginate={paginate}
      />
    </div>
  );
};

export default PageHoc(Managment);
