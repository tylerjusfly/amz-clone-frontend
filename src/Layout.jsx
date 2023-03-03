import React from 'react';

import { Outlet } from 'react-router-dom';
import Header from './components/Header';

const Layout = () => {
  return (
    <>
      <Header />
      <div className="page-content-wrapper ">
        <div className="content " style={{ paddingTop: '40px' }}>
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default Layout;
