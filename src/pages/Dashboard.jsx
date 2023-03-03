import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectUser, checklogged } from '../features/users/userSlice';
import Card from '../components/Card';
import PageContainer from '../components/PageContainer';
import Category from './admin/Category';
import PageBreadCrumb from '../components/PageBreadCrumb';

const Dashboard = ({ authed }) => {
  const user = useSelector(selectUser);

  console.log('userObj', user);

  return (
    <PageContainer>
      <Card type="social-card">
        <div className="circle" data-toggle="tooltip" title="" data-container="body" data-original-title="Label"></div>
        <div className="card-header clearfix">
          <div className="user-pic">
            <img
              alt="Profile"
              width="33"
              height="33"
              data-src-retina="/assets/img/profiles/8x.jpg"
              data-src="/assets/img/profiles/8.jpg"
              src="https://www.rollingstone.com/wp-content/uploads/2018/06/rs-tupac-eb46d22a-5043-425a-9981-e93a95a70e65.jpg?w=1024"
            />
          </div>
          <h5>{user?.email}</h5>
          <h6 className="d-flex align-items-center">
            Shared a Tweet
            <span className="location semi-bold d-flex align-items-center">
              <i className="pg-icon">map</i> SF, California
            </span>
          </h6>
        </div>
        <div className="card-description">
          <p>
            What you think, you become. What you feel, you attract. What you imagine, you create - Buddha. <a href="#">#quote</a>
          </p>
          <div className="via">via Twitter</div>
        </div>
      </Card>

      {/* <Category /> */}
      <div className="d-flex flex-column w-100">
        <PageBreadCrumb>
          <Link to="/category" className="breadcrumb-item active">
            Category
          </Link>
          <Link to="#" className="breadcrumb-item">
            DashBoard
          </Link>
        </PageBreadCrumb>
      </div>
    </PageContainer>
  );
};

export default Dashboard;
