import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { notifyError, notifySuccess } from '../../services/notify';
import waitingGif from '../../assets/images/waiting.gif';
import { useDispatch } from 'react-redux';
import { setUserCredentials } from '../../features/users/userSlice';
import { request } from '../../services/utilities';

import jwt from 'jwt-decode';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [waiting, setWaiting] = useState(false);
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');

  const onLogin = async (e) => {
    e.preventDefault();
    const values = { email: userName, password };
    try {
      setWaiting(true);
      const rs = await request('auth/signin', 'POST', false, values);
      console.log(rs);

      if (rs.type === 'Success') {
        // Decode JWT
        // const { result } = rs;

        // const decoded = jwt(result.access_token);

        // // SetCookies
        // cookies.set('AMZCOOKIE', result, {
        //   expires: new Date(decoded.exp * 1000),
        // });

        localStorage.setItem('amzClone', JSON.stringify(rs.result));
        dispatch(setUserCredentials({ user: rs.result }));
        notifySuccess('Login successful');
        setWaiting(false);
        navigate('/home');
      } else {
        notifyError(rs.message);
        console.log(rs.message);
        setWaiting(false);
      }
    } catch (error) {
      notifyError(error.message || 'Login failed');
      console.log(error);
      setWaiting(false);
    }
  };

  return (
    <div className="container">
      <div className="login-container bg-white">
        <div className="col-xl-6 col-lg-6 ">
          <div className="card">
            <div className="card-header ">
              <img src="/assets/login-lock.svg" alt="logo" width="48" height="48" />
            </div>
            {/* Card Body Added */}
            <div className="card-body">
              <h2 className="p-t-20">
                Get Started <br /> with your Dashboard
              </h2>
              <p className="mw-80 m-t-5">Sign in to your account</p>

              <form onSubmit={onLogin}>
                <div className="row">
                  <div className="col-md-12">
                    <div className="form-group form-group-default">
                      <label>Email</label>
                      <input
                        type="email"
                        className="form-control"
                        name="email"
                        placeholder="example@address.com"
                        required=""
                        aria-required="true"
                        onChange={(e) => {
                          setUserName(e.target.value);
                        }}
                      />
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-12">
                    <div className="form-group form-group-default">
                      <label>Password</label>
                      <input
                        type="password"
                        className="form-control"
                        name="password"
                        placeholder="Minimum of 4 characters."
                        required=""
                        aria-required="true"
                        onChange={(e) => {
                          setPassword(e.target.value);
                        }}
                      />
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-6 no-padding sm-p-l-10">
                    <div className="form-check">
                      <input type="checkbox" value="1" id="checkbox1" />
                      <label htmlFor="checkbox1">Remember me</label>
                    </div>
                  </div>
                  <div className="col-md-6 d-flex align-items-center justify-content-end">
                    <button aria-label="" className="btn btn-primary btn-lg m-t-10" type="submit">
                      {waiting ? <img src={waitingGif} alt="" /> : 'Sign in'}
                    </button>
                  </div>
                </div>
                <div className="m-b-5 m-t-30">
                  <a href="#" className="normal">
                    Lost your password?
                  </a>
                </div>
                <div>
                  <Link to="/" className="normal">
                    Not a member yet? Signup now.
                  </Link>
                </div>
              </form>
              <div className="pull-bottom sm-pull-bottom">
                <div className="m-b-30 p-r-80 sm-m-t-20 sm-p-r-15 sm-p-b-20 clearfix">
                  <div className="col-sm-9 no-padding m-t-10">
                    <p className="small-text normal hint-text">
                      ©2019-2020 All Rights Reserved. Pages® is a registered trademark of Revox Ltd.
                      <a href="">Cookie Policy</a>, <a href=""> Privacy and Terms</a>.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
