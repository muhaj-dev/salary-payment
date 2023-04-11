import React, { useState } from "react";
import PermissionHoc from "../components/Permission/PermissiomHoc";
import PermissionLog from "../components/Permission/PermissionLog";
import { Spinner } from "@chakra-ui/react";
import Pagination from "../common/Pagination";
import PermissionTable from "../components/Permission/PermissionTable";
import useFetch from "../components/API/useFetch";


const Permission = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(8);

  const { data, pending, error } = useFetch(
    `${process.env.REACT_APP_LORCHAIN_API}/users`,

  );

  // Get current posts
  const list = data?.filter(item => item.permission !== null);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = list?.slice(indexOfFirstPost, indexOfLastPost);

  //Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const paginateFront = () => setCurrentPage(currentPage + 1);
  const paginateBack = () => setCurrentPage(currentPage - 1);

  return (
    <div className="bg-white px-8 mt-16 py-8">
      <PermissionLog />
      <br />
      { currentPosts?.length === 0 ? (
        <div className="text-primary font-semibold mt-20 text-[18px] itallic text-center">
          You have no records
        </div>
      ) : (
      
      <PermissionTable currentPosts={currentPosts} />
      )}
      
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
      <div className="flex justify-end">

      <Pagination
        postsPerPage={postsPerPage}
        totalPosts={data?.length}
        currentPage={currentPage}
        paginateBack={paginateBack}
        paginateFront={paginateFront}
        paginate={paginate}
      />
      </div>
    </div>
  );
};

export default PermissionHoc(Permission);
