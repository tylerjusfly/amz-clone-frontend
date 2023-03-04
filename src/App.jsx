import { lazy, Suspense, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { isAuthenticated, logOut } from './features/users/userSlice';
import moment from 'moment';

// import Signup from './pages/Signup';
const Signup = lazy(() => import('./pages/auth/Signup'));
import Layout from './Layout';
import Login from './pages/auth/Login';
import RequireAuth from './pages/auth/RequireAuth';
import Dashboard from './pages/Dashboard';
import Splash from './services/Splash';

import { useIdleTimer } from 'react-idle-timer';
import { notifySuccess } from './services/notify';
import Category from './pages/admin/Category';
import RequiredRoles from './pages/admin/RequiredRoles';

function App() {
  const dispatch = useDispatch();

  const authenticated = useSelector(isAuthenticated);

  const [remain, setRemaining] = useState(0);
  const onIdle = () => {
    // Do some idle action like log out your user
    if (authenticated) {
      notifySuccess('session expired');
      dispatch(logOut());
    }
  };

  const { isIdle, getRemainingTime } = useIdleTimer({ onIdle, timeout: 3600 * 1000 });

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setRemaining(Math.ceil(getRemainingTime() / 1000));
  //   }, 500);

  //   return () => {
  //     clearInterval(interval);
  //   };
  // });

  return (
    <div>
      <ToastContainer autoClose={3500} />
      <Suspense fallback={<Splash />}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Signup />} />
            <Route path="login" element={<Login />} />
            <Route path="unauth" element={<div>No Access</div>} />
            {/* Protected Routes */}
            <Route path="home" element={<RequireAuth />}>
              <Route index element={<Dashboard authed={remain} />} />

              {/* Admin Routes */}
              <Route element={<RequiredRoles requiredRole={['admin']} />}>
                <Route path="category" element={<Category />} />
              </Route>
            </Route>
          </Route>
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
