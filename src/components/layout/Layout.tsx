import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';

const Layout = () => {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <main className={`flex-1 p-4 ml-64`} style={{ marginLeft: '16rem' }}> {/* Adjust margin as needed */}
        {/* Main Content goes here */}
        {/* <h1 className="text-2xl font-bold">Welcome to the Admin Dashboard</h1> */}
        {/* Add other content here */}
        <Outlet />
      </main>
      
    </div>
  );
};

export default Layout;