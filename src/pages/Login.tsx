import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setUser } from '../store/slices/authSlice';
import { ChefHat } from 'lucide-react';
import { login } from '../asset/globalAPI';

// import userBackground from '../asset/image/Seller-Bg.png';
// import adminBackground from '../asset/image/Admin-Bg.png';
// import hrBackground from '../asset/image/Admin-Bg.png';

// Import images
import adminBg from "../asset/image/Admin-Bg.png"; // Adjust the path based on your folder structure
import sellerBg from "../asset/image/Seller-Bg.png"; // Adjust the path based on your folder structure

const Login = () => {
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState<'admin' | 'seller'>('seller'); // Default to admin
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async(e: React.FormEvent) => {
    e.preventDefault();
    // Mock login - replace with actual API call
    const user = {
      mobileNumber: mobile,
      password: password,
      role:userType, 
    };
    try {
      const response = await login(user)
      console.log("responseeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee", response);
      if (response.status === 200) {
        // Swal.fire({
        //   icon: "success",
        //   title: "Task data fetched successfully",
        //   showConfirmButton: false,
        //   timer: 500,
        // });
        // setTasks(response.data);
      }
    }
    catch (err) {
      console.log("errrrrrrrrrrrrrrrrrrrrrrrrrr", err);
    }
    finally {
      // Toggle the trigger state to invoke useEffect
      // setTrigger(prev => !prev);
    }
    console.log("hiii hello" ,user)
    dispatch(setUser(user));
    navigate('/dashboard');
  };

  return (
    <div
      className={`min-h-screen flex items-center justify-center ${userType === 'admin'
          ? `bg-[url(${adminBg})] bg-cover`
          : `bg-[url(${sellerBg})] bg-cover`
        }`}
    >
      <div
        className={`relative p-8 rounded-lg shadow-lg w-full max-w-md ${userType === 'admin' ? 'bg-green-100' : 'bg-orange-100'
          }`}
      >
        {/* User Type Toggle */}
        <div className="absolute top-2 right-2">
          <label className="flex items-center space-x-2 cursor-pointer">
            <span className="text-sm font-medium text-gray-700">
              {userType === 'admin' ? 'Admin' : 'Seller'}
            </span>
            <div className="relative inline-block w-12 h-6">
              <input
                type="checkbox"
                checked={userType === 'admin'}
                onChange={(e) =>
                  setUserType(e.target.checked ? 'admin' : 'seller')
                }
                className="opacity-0 w-0 h-0"
              />
              <span
                className={`absolute inset-0 bg-gray-300 rounded-full transition ${userType === 'admin' ? 'bg-green-500' : 'bg-gray-500'
                  }`}
              ></span>
              <span
                className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transform transition ${userType === 'admin' ? 'translate-x-6' : 'translate-x-0'
                  }`}
              ></span>
            </div>
          </label>
        </div>

        <div className="flex items-center justify-center mb-8">
          <ChefHat size={40} className="text-orange-500" />
        </div>
        <h1 className="text-2xl font-bold text-center mb-8">
          {userType === 'admin' ? 'Food Admin Portal' : 'Seller Portal'}
        </h1>
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Mobile Number
            </label>
            <input
              type="text"
              pattern="\d{10}"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
              required
              placeholder="Enter 10-digit mobile number"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
              required
              placeholder="Password must be character"

            />
          </div>
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
          >
            Sign in
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
