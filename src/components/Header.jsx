import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import PageBreadCrumb from './PageBreadCrumb';

const Header = () => {
  return (
    <div className="d-flex flex-column w-100">
      <PageBreadCrumb>
        <Link to="/login" className="breadcrumb-item active">
          Login
        </Link>
        <Link to="/home" className="breadcrumb-item">
          DashBoard
        </Link>
      </PageBreadCrumb>
    </div>
  );
};

export default Header;
