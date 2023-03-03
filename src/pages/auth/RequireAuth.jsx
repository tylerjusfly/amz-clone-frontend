import { useLocation, Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectUserToken } from '../../features/users/userSlice';

import React from 'react';

const RequireAuth = () => {
  const token = useSelector(selectUserToken);
  const location = useLocation();

  console.log('tokenauth', token);

  return token ? <Outlet /> : <Navigate to="/login" state={{ from: location }} replace />;
};

export default RequireAuth;
