import React, { useState, useEffect } from "react";
import ActivityLog from "../components/ActivityLog";
import ActivityTable from "../components/ActivityTable";
import PageHoc from "../components/PageHoc";
// import Pagination from "../common/Pagination";
import { Spinner, Select } from "@chakra-ui/react";
import useFetch from "../components/API/useFetch";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { Pagination } from "antd";

const Dashboard = () => {
  const { data, pending, error } = useFetch(
    `${process.env.REACT_APP_LORCHAIN_API}/activities`
  );

  const [postsPerPage, setPostsPerPage] = useState(8);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [items, setItems] = useState([]);
  const [displayedItems, setDisplayedItems] = useState([]);

  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);
  const [isCalendar, setIsCalendar] = useState(false);

  const handleSelectChange = (e) => {
    setPostsPerPage(parseInt(e.target.value));
  };

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

  // this is the part to make changes

  // let list = [...data]?.reverse();
  let list = data;
  if (searchTerm) {
    list = filteredData;
  } else if (selectedUser) {
    list = list?.filter((post) => post?.user?.full_name === selectedUser);
  } else if (selectedDate) {
    list = selectedDate;
  }

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = list?.slice(indexOfFirstPost, indexOfLastPost);

  //Change page
  // const paginate = (pageNumber) => setCurrentPage(pageNumber);
  // const paginateFront = () => setCurrentPage(currentPage + 1);
  // const paginateBack = () => setCurrentPage(currentPage - 1);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handlePageSizeChange = (current, size) => {
    setItemsPerPage(size);
  };

  useEffect(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    setDisplayedItems(list?.slice(startIndex, endIndex));
  }, [currentPage, itemsPerPage, list]);

  return (
    <div className="relative w-full bg-white rounded-[10px] p-6 mt-14">
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
        generatePDF={generatePDF}
      />

      <br />

      {currentPosts?.length === 0 ? (
        <div className="text-primary font-semibold mt-20 text-[18px] itallic text-center">
          You have no records
        </div>
      ) : (
        <ActivityTable currentPosts={currentPosts} />
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

      <br />
      <br />
      {!pending && (
        // <Pagination
        //   postsPerPage={postsPerPage}
        //   totalPosts={list?.length}
        //   currentPage={currentPage}
        //   paginateBack={paginateBack}
        //   paginateFront={paginateFront}
        //   paginate={paginate}
        // />
        <div className="flex gap-2 flex-wrap justify-start tablet:justify-between ">
          <div className="flex  gap-2 items-center">
            <label htmlFor="posts-per-page" className='font-semibold ' >Show:</label>
            <Select
              id="posts-per-page"
              value={postsPerPage}
              onChange={handleSelectChange}
            >
              <option value="8">8</option>
              <option value="12">12</option>
              <option value="16">16</option>
              <option value="4">20</option>
            </Select>
          </div>

          <Pagination
            defaultCurrent={1}
            currentPage={currentPage}
            total={list?.length}
            pageSize={itemsPerPage}
            onShowSizeChange={handlePageSizeChange}
            onChange={handlePageChange}
          />
        </div>
      )}
    </div>
  );
};

export default PageHoc(Dashboard);
