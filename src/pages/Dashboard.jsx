import React, { useEffect, useState } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { selectUser, logOut } from '../features/users/userSlice';
import Card from '../components/Card';
import PageContainer from '../components/PageContainer';
import Category from './admin/Category';
import Button from '../components/Button';
import PageBreadCrumb from '../components/PageBreadCrumb';
import { notifySuccess } from '../services/notify';

const Dashboard = ({ authed }) => {
  const dispatch = useDispatch();

  const user = useSelector(selectUser);

  const LogOutUser = () => {
    dispatch(logOut());
    notifySuccess('Logged out');
  };

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
            What you think, you become. What you feel, you attract. What you imagine, you create - Buddha. <a href="#">{authed}</a>
          </p>
          <div className="via">via Twitter</div>
        </div>

        {/* <Button>LogOut</Button> */}
        <button aria-label="" className="btn btn-danger pull-right" type="submit" onClick={LogOutUser}>
          Log Out
        </button>
      </Card>
    </PageContainer>
  );
};

export default Dashboard;
