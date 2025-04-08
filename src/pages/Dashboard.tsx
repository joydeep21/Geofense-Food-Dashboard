import React from 'react';
// import { useSelector } from 'react-redux';
// import { RootState } from '../store/store';
import { BarChart, Users, ShoppingBag, DollarSign } from 'lucide-react';

const Dashboard = () => {
  // const { user } = useSelector((state: RootState) => state.auth);

  const stats = [
    {
      title: 'Total Sales',
      value: '$12,345',
      icon: <DollarSign className="text-green-500" size={24} />,
    },
    {
      title: 'Active Users',
      value: '1,234',
      icon: <Users className="text-blue-500" size={24} />,
    },
    {
      title: 'Products',
      value: '456',
      icon: <ShoppingBag className="text-purple-500" size={24} />,
    },
    {
      title: 'Orders Today',
      value: '89',
      icon: <BarChart className="text-orange-500" size={24} />,
    },
  ];

  return (
    <div>
      {/* <h1 className="text-2xl font-bold mb-8">Welcome to {user?.role.charAt(0).toUpperCase() + user?.role.slice(1).toLowerCase()} Dashboard</h1> */}
      {/* <h1 className="text-2xl font-bold mb-8">
        Welcome to {user?.role ? user.role.charAt(0).toUpperCase() + user.role.slice(1).toLowerCase() : "Unknown"} Dashboard
      </h1> */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-lg shadow-sm border border-gray-100"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-gray-500 text-sm">{stat.title}</h3>
              {stat.icon}
            </div>
            <p className="text-2xl font-semibold">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <h2 className="text-lg font-semibold mb-4">Recent Orders</h2>
          <p className="text-gray-500">Order chart will go here</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <h2 className="text-lg font-semibold mb-4">Popular Products</h2>
          <p className="text-gray-500">Products chart will go here</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;