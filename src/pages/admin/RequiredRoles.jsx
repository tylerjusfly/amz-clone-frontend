import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { selectUser } from '../../features/users/userSlice';
import { hasAccess } from '../../permissions/admin';

const RequiredRoles = ({ requiredRole }) => {
  const user = useSelector(selectUser);

  const location = useLocation();

  return hasAccess(user.roles, requiredRole) ? <Outlet /> : <Navigate to="/home" state={{ from: location }} replace />;
};

export default RequiredRoles;
