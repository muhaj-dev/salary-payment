import React from "react";
import { Button } from "@chakra-ui/react";
import leftArrow from "../assets/leftArrow.svg";
import Greaterthan from "../assets/Greaterthan.svg";
import { Select } from "@chakra-ui/react";


// import { rightArrow, leftArrow } from '../../assets';
const Pagination = ({
  currentPage,
  postsPerPage,
  totalPosts,
  paginate,
  paginateFront,
  paginateBack,
}) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="flex justify-between  mt-14">
      <div className="flex gap-2 items-center mr-4">
        <p className="font-semibold ">Show</p>
        <div className="w-[60px]">
        <Select fontWeight={"500"} placeholder="5">
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>
          <option value="10">10</option>
        </Select>
        </div>
      </div>
      <div className="py-2 flex w-fit ">
        <div className="flex">
          <nav
            className="mx-auto relative z-0 inline-flex shadow-sm "
            aria-label="Pagination"
          >
            <Button
              onClick={() => {
                paginateBack();
              }}
              isDisabled={currentPage === 1}
              bg="white"
              border={"2px solid #B9BBBE"}
              fontSize="14px"
              href="!#"
              className="relative inline-flex mr-3 items-center  px-1 py-1 font-semibold  hover:opacity-50"
            >
              <span className="inline-flex">
                <img className="mr-2" src={leftArrow} alt="a" />
                Prev
              </span>
            </Button>

            <div className="flex flex-wrap gap-2 mx-auto">
              {pageNumbers.map((number) => (
                <span key={number} className="mx-1">
                  <Button
                    onClick={() => {
                      paginate(number);
                    }}
                    bg="white"
                    fontSize="14px"
                    border={"2px solid #B9BBBE"}
                    // href="#"
                    className={
                      currentPage === number
                        ? "bg-yellow rounded-md  text-[black] hover:opacity-50 relative inline-flex items-center px-3 py-2 text-sm font-medium"
                        : "   hover:opacity-50 relative inline-flex items-center px-1 py-1 font-medium"
                    }
                  >
                    {number}
                  </Button>
                </span>
              ))}
            </div>
            <Button
              onClick={() => {
                paginateFront();
              }}
              bg="white"
              fontSize="14px"
              border={"2px solid #B9BBBE"}
              isDisabled={currentPage === pageNumbers.length}
              href="!#"
              className="relative inline-flex items-center ml-3 px-1 py-1 font-semibold  hover:opacity-50"
            >
              <span className="inline-flex">
                Next
                <img className="ml-2" src={Greaterthan} alt="a" />
              </span>
            </Button>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Pagination;
