import { createBrowserRouter } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import ProtectedRoute from '../components/auth/ProtectedRoute';
import Login from '../pages/Login';
import LeaveApply from '../pages/LeaveApply';
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
            <LeaveApply />
          </ProtectedRoute>
        ),
      },
      {
        path: 'foods',
        element: (
          <ProtectedRoute allowedRoles={['seller']}>
            <LeaveApply />
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