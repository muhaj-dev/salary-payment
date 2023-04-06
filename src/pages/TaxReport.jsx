import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import PageHoc from "../components/PageHoc";
import Pagination from "../common/Pagination";
import TaxTable from "../components/Report/TaxTable";
import RepoLog from "../components/Report/RepoLog";
import useFetch from "../components/API/useFetch";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const Report = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const navigate = useNavigate();

  const { data, pending, error } = useFetch(
    `${process.env.REACT_APP_LORCHAIN_API}/records`
  );

  const generatePDF = () => {
    // Get the table element
    const table = document.getElementById("tax-table");

    // Use html2canvas to create a canvas from the table
    html2canvas(table).then((canvas) => {
      // Create a new PDF document
      const doc = new jsPDF();

      // Add the canvas to the PDF document
      const imgData = canvas.toDataURL("image/png");
      const imgProps = doc.getImageProperties(imgData);
      const pdfWidth = doc.internal.pageSize.getWidth() - 20;
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      doc.addImage(imgData, "PNG", 10, 10, pdfWidth, pdfHeight);

      // Save the PDF document
      doc.save("Tax.pdf");
    });
  };
  
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
        generatePDF={generatePDF}
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
