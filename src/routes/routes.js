import React from 'react'
import { Route, Routes } from 'react-router-dom';
import AdminLogin from '../pages/AdminLogin';
import Dashboard from '../pages/Dashboard';
import Login from '../pages/Login';
import Managment from '../pages/Managment';
import Permission from '../pages/Permission';
import Report from '../pages/Report';
import StaffDashboard from '../pages/StaffDashboard';

const CreateRoutes = () => {
  return (
    <div className='relative'>
      <div>
        <Routes>
          <Route path='/' element={<Login />}></Route>
          <Route path='/login' element={<Login />}></Route>
          <Route path='/admin/login' element={<AdminLogin />}></Route>
          <Route path='/admin/dashboard' element={<Dashboard />}></Route>
          <Route path='/user/dashboard' element={<StaffDashboard />}></Route>
          <Route path='/managment' element={<Managment />}></Route>
          <Route path='/report' element={<Report />}></Route>
          <Route path='/permission' element={<Permission />}></Route>
        </Routes>

      </div>
    </div>
  )
}

export default CreateRoutes;