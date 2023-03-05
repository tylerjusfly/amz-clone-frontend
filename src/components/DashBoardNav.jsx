import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import '../assets/css/navuser.css';
import { selectUser } from '../features/users/userSlice';
import { hasAccessToAdminTabs } from '../permissions/admin';

const DashBoardNav = () => {
  const activeNavStyle = {
    fontWeight: 'bold',
    textDecoration: 'underline',
    color: '#161616',
  };

  const setNavToActive = ({ isActive }) => {
    return isActive ? activeNavStyle : null;
  };

  const user = useSelector(selectUser);

  return (
    <nav className="navbar">
      <img src="https://kitpro.site/demed/wp-content/uploads/sites/47/2021/10/logo-demed.png" height="40px" alt="" />
      <ul>
        <NavLink to="." end style={setNavToActive}>
          Home
        </NavLink>
        {hasAccessToAdminTabs(user.roles) && (
          <NavLink to="category" style={setNavToActive}>
            Category
          </NavLink>
        )}

        <NavLink to="my-product" style={setNavToActive}>
          My Products
        </NavLink>
        <NavLink to="/my-product" style={setNavToActive}>
          Blog
        </NavLink>
        <NavLink to="/" style={setNavToActive}>
          Contact
        </NavLink>
      </ul>
    </nav>
  );
};

export default DashBoardNav;
