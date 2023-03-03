import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import PageContainer from '../../components/PageContainer';
import { notifyError, notifySuccess } from '../../services/notify';
import { request } from '../../services/utilities';

import waitingGif from '../../assets/images/waiting.gif';
import { setUserCredentials } from '../../features/users/userSlice';

const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [waiting, setWaiting] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const submitForm = async (e) => {
    e.preventDefault();
    const values = { email, password };
    try {
      setWaiting(true);
      const rs = await request('auth/signup', 'POST', false, values);
      console.log(rs);

      if (rs.type === 'Success') {
        localStorage.setItem('authenticated', rs.access_token);
        localStorage.setItem('user', JSON.stringify(rs.user));
        notifySuccess('user Registered');
        setWaiting(false);
        dispatch(setUserCredentials({ user: rs.user, access_token: rs.access_token }));
        navigate('/home');
      } else {
        notifyError(rs.message);
        console.log('ERR WAS CALLED FROM ELSE');
        console.log('ERR', rs?.message);
        setWaiting(false);
      }
    } catch (error) {
      notifyError(error.message || 'an error occurred');
      console.log('ERR WAS CALLED FROM HERE');
      setWaiting(false);
    }
  };

  return (
    <PageContainer className="container">
      <div className="row">
        <div className="col-xl-6 col-lg-6 ">
          <div className="card">
            <div className="card-header ">
              <div className="card-title">Modern Layout.</div>
            </div>
            <div className="card-body">
              <h2 className="mw-80">Get started with your account.</h2>
              <p className="fs-16 mw-80 m-b-40">
                Find your people. Engage your customers. Build your brand. Do it all with Page's UI Framework Platform. Already have an account?
                <a href="#">Log in</a>
              </p>
              <form onSubmit={submitForm}>
                {/* <div className="row clearfix">
                  <div className="col-xl-6">
                    <div className="form-group form-group-default">
                      <label>First name</label>
                      <input
                        type="text"
                        className="form-control"
                        name="firstName"
                        required=""
                        aria-required="true"
                        onChange={(e) => {
                          setFirstname(e.target.value);
                        }}
                      />
                    </div>
                  </div>
                  <div className="col-xl-6">
                    <div className="form-group form-group-default">
                      <label>Last name</label>
                      <input type="text" className="form-control" name="lastName" required="" aria-required="true" />
                    </div>
                  </div>
                </div> */}
                {/* <div className="row">
                  <div className="col-md-12">
                    <div className="form-group form-group-default input-group">
                      <div className="form-input-group">
                        <label>Pages username</label>
                        <input type="text" className="form-control" name="website" placeholder="http://pages-ui.com/projectname" required="" aria-required="true" />
                      </div>
                      <div className="input-group-append ">
                        <span className="input-group-text">@pages.com</span>
                      </div>
                    </div>
                  </div>
                </div> */}

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
                          setEmail(e.target.value);
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
                <div className="clearfix"></div>
                <div className="row m-t-25">
                  <div className="col-xl-6 p-b-10">
                    <p className="small-text hint-text">
                      By clicking the "Get Started!" button, you are creating a Pages account, and you agree to Pages's
                      <a href="#">Terms of Use</a> and <a href="#">Privacy Policy</a>.
                    </p>
                  </div>
                  <div className="col-xl-6">
                    <button aria-label="" className="btn btn-primary pull-right btn-lg btn-block" type="submit">
                      {waiting ? <img src={waitingGif} alt="" /> : 'Get Started'}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </PageContainer>
  );
};

export default Signup;
