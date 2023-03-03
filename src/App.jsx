import { lazy, Suspense } from 'react';

import { Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

// import Signup from './pages/Signup';
const Signup = lazy(() => import('./pages/auth/Signup'));
import Layout from './Layout';
import Category from './pages/admin/Category';
import RequireAuth from './pages/auth/RequireAuth';
import Dashboard from './pages/Dashboard';
import Splash from './services/Splash';

function App() {
  return (
    <div>
      <ToastContainer autoClose={3500} />
      <Suspense fallback={<Splash />}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Signup />} />

            {/* Protected Routes */}
            <Route element={<RequireAuth />}>
              <Route path="home" element={<Dashboard authed={false} />} />
              {/* <Route path="category" element={<Category />} /> */}
            </Route>
          </Route>
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
