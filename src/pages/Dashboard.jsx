import React, { useState } from "react";
import ActivityLog from "../components/ActivityLog";
import ActivityTable from "../components/ActivityTable";
import PageHoc from "../components/PageHoc";
import Pagination from "../common/Pagination";
import useFetch from "../components/API/useFetch";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const Dashboard = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(8);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);
  const [isCalendar, setIsCalendar] = useState(false);

  const { data, pending, error } = useFetch(
    `${process.env.REACT_APP_LORCHAIN_API}/activities`
  );

  const generatePDF = () => {
    // Get the table element
    const table = document.getElementById("table-to-pdf");

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
      doc.save("Activity.pdf");
    });
  };

  // Get current posts

  const handleSearch = (event) => {
    const value = event.target.value.toLowerCase();
    setSearchTerm(value);
    const results = data?.filter(
      (post) =>
        post?.user?.full_name.toLowerCase().includes(value) ||
        post?.user?.email.toLowerCase().includes(value)
    );
    setFilteredData(results);
  };

  const handleSelect = (event) => {
    const value = event.target.value;
    setSelectedUser(value);

    const results = data?.filter(
      (post) => post?.user.full_name.toLowerCase() === value.toLowerCase()
    );
    setFilteredData(results);
  };

  const handleDateClick = (date) => {
    const filteredArray = data?.filter((item) => {
      const startDate = new Date(item.time).toDateString();
      return startDate === date?.toDateString();
    });
    setSelectedDate(filteredArray);
  };

  const uniqueUsers = [...new Set(data?.map((post) => post?.user?.full_name))];

  const allUsers = [{ label: "All", value: "" }].concat(
    uniqueUsers?.map((user) => ({ label: user, value: user }))
  );

  let list = data;
  if (searchTerm) {
    list = filteredData;
  } else if (selectedUser) {
    list = list?.filter((post) => post?.user.full_name === selectedUser);
  } else if (selectedDate) {
    list = selectedDate;
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
        handleDateClick={handleDateClick}
        setSelectedDate={setSelectedDate}
        isCalendar={isCalendar}
        setIsCalendar={setIsCalendar}
        // handleDownloadPDF={handleDownloadPDF}
        generatePDF={generatePDF}
        // onButtonClick={onButtonClick}
      />

      <br />

      <ActivityTable currentPosts={currentPosts} />
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
