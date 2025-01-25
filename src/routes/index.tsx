import { createBrowserRouter } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import ProtectedRoute from '../components/auth/ProtectedRoute';
import AddResturent from '../pages/AddResturent';
import Foods from '../pages/Food';
import FoodDetails from '../pages/FoodDetails';
import Auth from '../pages/Auth';
import Dashboard from '../pages/Dashboard';
import Products from '../pages/Products';
import Users from '../pages/Users';
import Unauthorized from '../pages/Unauthorized';

export const router = createBrowserRouter([
  {
    path: '/login',
    element: <Auth />,
  },
  {
    path: '/unauthorized',
    element: <Unauthorized />,
  },
  {
    path: '/',
    element: (
      <ProtectedRoute>
        <Layout />
      </ProtectedRoute>
    ),
    children: [
      {
        path: 'dashboard',
        element: (
          <ProtectedRoute allowedRoles={['admin', 'seller']}>
            <Dashboard />
          </ProtectedRoute>
        ),
      },
      {
        path: 'addresturent',
        element: (
          <ProtectedRoute allowedRoles={['admin', 'seller']}>
            <AddResturent />
          </ProtectedRoute>
        ),
      },
      {
        path: 'foods',
        element: (
          <ProtectedRoute allowedRoles={['seller']}>
            <Foods/>
          </ProtectedRoute>
        ),
      },
      {
        path: 'food/foodDetails/:id',
        element: (
          <ProtectedRoute allowedRoles={['seller']}>
            <FoodDetails />
          </ProtectedRoute>
        ),
      },
      {
        path: 'users',
        element: (
          <ProtectedRoute allowedRoles={['admin', 'seller']}>
            <Users />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);