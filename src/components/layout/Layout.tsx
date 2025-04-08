import React from 'react';
import { Outlet,useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
// import axios from 'axios';
import { useDispatch } from 'react-redux';
import { logout } from '../../store/slices/authSlice'; // Import the logout action
import Swal from 'sweetalert2';

const Layout = () => {
  const navigate = useNavigate();  // Hook to navigate programmatically
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.auth);

  const handleLogout = async () => {
    const userRequest = {
      status: "logout",
      // ip_address: ip
    }
    console.log("the user details", userRequest);
   
          Swal.fire({
                  icon: 'success',
                  title: 'You have Logged out',
                  showConfirmButton: false,
                  timer: 500,
                });
        dispatch(logout());  // Dispatch the logout action
        localStorage.removeItem('token'); 
        navigate('/login');  // Navigate to the login page
    
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <main className={`flex-1 p-4 ml-64`} style={{ marginLeft: '16rem' }}> {/* Adjust margin as needed */}
      <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">      
              Welcome to {user?.role ? user.role.charAt(0).toUpperCase() + user.role.slice(1).toLowerCase() : "Unknown"} Dashboard
          </h1>
          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
          >
            Logout
          </button>
        </div>
        {/* Main Content goes here */}
        {/* <h1 className="text-2xl font-bold">Welcome to the Admin Dashboard</h1> */}
        {/* Add other content here */}
        <Outlet />
      </main>
      
    </div>
  );
};

export default Layout;