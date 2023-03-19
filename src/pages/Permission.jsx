import React, { useState } from "react";
import PermissionHoc from "../components/Permission/PermissiomHoc";
import PermissionLog from "../components/Permission/PermissionLog";
import Pagination from "../common/Pagination";
import PermissionTable from "../components/Permission/PermissionTable";

const body = [
  {
    id: 1,
    name: "Daniel Moses",
    permission: "HR Permissions",
    audit: "Jan 21, 2:19pm",
  },
  {
    id: 2,
    name: "Daniel Moses",
    permission: "HR Permissions",
    audit: "Jan 21, 2:19pm",
  },
  {
    id: 3,
    name: "Daniel Moses",
    permission: "HR Permissions",
    audit: "Jan 21, 2:19pm",
  },
  {
    id: 4,
    name: "Daniel Moses",
    permission: "HR Permissions",
    audit: "Jan 21, 2:19pm",
  },
  {
    id: 5,
    name: "Daniel Moses",
    permission: "HR Permissions",
    audit: "Jan 21, 2:19pm",
  },
  {
    id: 6,
    name: "Daniel Moses",
    permission: "HR Permissions",
    audit: "Jan 21, 2:19pm",
  },
  {
    id: 7,
    name: "Daniel Moses",
    permission: "HR Permissions",
    audit: "Jan 21, 2:19pm",
  },
  {
    id: 8,
    name: "Daniel Moses",
    permission: "HR Permissions",
    audit: "Jan 21, 2:19pm",
  },
  {
    id: 9,
    name: "Daniel Moses",
    permission: "HR Permissions",
    audit: "Jan 21, 2:19pm",
  },
  {
    id: 10,
    name: "Daniel Moses",
    permission: "HR Permissions",
    audit: "Jan 21, 2:19pm",
  },
];

const Permission = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(5);

  // Get current posts
  const list = body;

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = list.slice(indexOfFirstPost, indexOfLastPost);

  //Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const paginateFront = () => setCurrentPage(currentPage + 1);
  const paginateBack = () => setCurrentPage(currentPage - 1);

  return (
    <div className="bg-white px-8 mt-16 py-8">
      <PermissionLog />
      <br />
      <PermissionTable currentPosts={currentPosts} />
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

export default PermissionHoc(Permission);
