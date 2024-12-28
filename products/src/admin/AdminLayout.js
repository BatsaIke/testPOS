import React from 'react';
import { Outlet, useLocation } from 'react-router-dom'; // Outlet renders the child routes
import Sidebar from './side-bar/Sidebar';
import Homepage from '../components/home/Homepage'; // Import the Homepage component
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const AdminLayout = () => {
  const location = useLocation(); // Get the current location
  const { token } = useSelector((state) => state.auth);

  // If the user is not logged in, redirect to login page
  if (!token) {
    return <Navigate to="/login" />;
  }

  return (
    <div>
      <Sidebar />
      <div className="admin-content">
        {/* Render Homepage if the route is exactly '/admin' */}
        {location.pathname === '/admin' ? <Homepage /> : <Outlet />}
      </div>
    </div>
  );
};

export default AdminLayout;
