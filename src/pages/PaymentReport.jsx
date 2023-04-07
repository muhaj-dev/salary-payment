import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import PageHoc from "../components/PageHoc";
import { Spinner } from "@chakra-ui/react";
import Pagination from "../common/Pagination";
import PaymentTable from "../components/Report/PaymentTable";
import useFetch from "../components/API/useFetch";
import RepoLog from "../components/Report/RepoLog";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";


const PaymentReport = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const navigate = useNavigate();

  const { data, pending, error } = useFetch(
    `${process.env.REACT_APP_LORCHAIN_API}/records`,

  );

  const generatePDF = () => {
    // Get the table element
    const table = document.getElementById("payment-table");

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
      doc.save("Payment.pdf");
    });
  };

  // Get current posts

  let list = data?.records;
  if (searchTerm) {
    list = filteredData;
  }
  
  const handleSearch = (event) => {
    const value = event.target.value.toLowerCase();
    setSearchTerm(value);
    const results = list?.filter(
      (post) =>
      post?.user.full_name.toLowerCase().includes(value) 
    );
    setFilteredData(results);
  };



  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = list?.slice(indexOfFirstPost, indexOfLastPost);

  //Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const paginateFront = () => setCurrentPage(currentPage + 1);
  const paginateBack = () => setCurrentPage(currentPage - 1);

  return (
    <div className="w-full bg-white rounded-[10px] p-6 mt-14">
      <RepoLog generatePDF={generatePDF} searchTerm={searchTerm} handleSearch={handleSearch} placeholder={"Search with name"} />
      <br />
      <div className=" w-[97%] mx-auto flex gap-3 tablet:gap-4 items-center ">
        <p
          className={
            "text-[20px] border-b-2 border-primary font-semibold cursor-pointer py-[17px] px-4  text-[#7D0BFE] "
          }
        >
          Payment History
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
        totalPosts={data?.length}
        currentPage={currentPage}
        paginateBack={paginateBack}
        paginateFront={paginateFront}
        paginate={paginate}
      />
    </div>
  );
};

export default PageHoc(PaymentReport);
