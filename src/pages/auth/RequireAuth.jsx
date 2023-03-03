import { useLocation, Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectUserToken } from '../../features/users/userSlice';

import React from 'react';

const RequireAuth = () => {
  const token = useSelector(selectUserToken);
  // const token = localStorage.getItem('authenticated');
  const location = useLocation();

  return token ? <Outlet /> : <Navigate to="/" state={{ from: location }} replace />;
};

export default RequireAuth;
