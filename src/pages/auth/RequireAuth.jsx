import { useLocation, Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectUserToken } from '../../features/users/userSlice';

import React from 'react';
import DashBoardNav from '../../components/DashBoardNav';

const RequireAuth = () => {
  const token = useSelector(selectUserToken);
  const location = useLocation();

  return token ? (
    <>
      <DashBoardNav />
      <Outlet />
    </>
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default RequireAuth;
