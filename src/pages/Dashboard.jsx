import React, {useState} from 'react'
import ActivityLog from '../components/ActivityLog'
import ActivityTable from '../components/ActivityTable'
import Card from '../components/Card'
import PageHoc from '../components/PageHoc'
import Pagination from '../common/Pagination'
import useFetch from "../components/API/useFetch";


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
  ]

const Dashboard = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(5);

  // const userDetails = localStorage.getItem("user_details");
  // const user = JSON.parse(userDetails);

  const { data, pending, error } = useFetch(
    "https://lorchain-api.onrender.com/activities"
  );

console.log(data)
  // Get current posts
  const list = data

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = list?.slice(indexOfFirstPost, indexOfLastPost);

  //Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const paginateFront = () => setCurrentPage(currentPage + 1);
  const paginateBack = () => setCurrentPage(currentPage - 1);

  return (
    <div className='w-full bg-white rounded-[10px] p-6 mt-14'>
     <ActivityLog />
     <br />
     {pending && (
        <div className=" italic my-20 text-center bg-[red-500] font-semibold text-[20px]">
          Loading...
        </div>
      )}
      {error && (
        <div className=" italic text-center bg-[red-500] font-semibold text-[18px]">
          There is an error in the server. pls check back later...
        </div>
      )}
     <ActivityTable currentPosts={currentPosts} />
     {!pending && <Pagination
        postsPerPage={postsPerPage} 
        totalPosts={data?.length} 
        currentPage={currentPage}
        paginateBack={paginateBack}
        paginateFront={paginateFront}
        paginate={paginate} 
      />}
      
    </div>
  )
}

export default PageHoc(Dashboard)