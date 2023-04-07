import React, { useState, useEffect } from "react";
import StaffHoc from "../components/Staff/StaffHoc";
import Pagination from "../common/Pagination";
import StaffLog from "../components/Staff/StaffLog";
import { Spinner } from "@chakra-ui/react";
import StaffTable from "../components/Staff/StaffTable";
import useFetch from "../components/API/useFetch";
import { useAuth } from "../components/API/AuthContext";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const StaffDashboard = () => {
  const {  user } = useAuth();

  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(5);

  // const userDetails = localStorage.getItem("user_details");
  // const user = JSON.parse(userDetails);

  const { data, pending, error } = useFetch(
    `${process.env.REACT_APP_LORCHAIN_API}/records/user/${user._id}`,

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
      <StaffLog generatePDF={generatePDF}/>
      <br />
      <br />

      {currentPosts && <StaffTable currentPosts={currentPosts} />}
      {pending && (
        <div className="text-primary italic text-center bg-[red-500] font-bold text-[20px]">
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
        <div className="text-primary italic text-center bg-[red-500] font-bold text-[20px]">
          There is an error in the server. pls check back later...
        </div>
      )}
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
