import { Suspense, lazy, useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

import ECommerce from './pages/Dashboard/ECommerce';
import SignIn from './pages/Authentication/SignIn';
import SignUp from './pages/Authentication/SignUp';
import Loader from './common/Loader';
import routes from './routes';
import PrivateRoute from './routes/PrivateRoute';
import RedirectToHome from './routes/RedirectRoute';

const DefaultLayout = lazy(() => import('./layout/DefaultLayout'));

function App() {
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <>
      <Toaster
        position="top-right"
        reverseOrder={false}
        containerClassName="overflow-auto"
      />
      
        <Routes>
          <Route element={<RedirectToHome />}>
            <Route path="/auth/signin" element={<SignIn />} />
            <Route path="/auth/signup" element={<SignUp />} />
          </Route>
           {/* Bọc Route DefaultLayout bằng PrivateRoute */}
          <Route element={<PrivateRoute />}>
            <Route element={<DefaultLayout />}>
              <Route index element={<ECommerce />} />
              
              {/* Các route bảo vệ với PrivateRoute */}
              {routes.map((route, index) => {
                const { path, component: Component } = route;
                return (
                  <Route
                    key={index}
                    path={path}
                    element={
                      <Suspense fallback={<Loader />}>
                        <Component />
                      </Suspense>
                    }
                  />
                );
              })}
            </Route>
          </Route>
        </Routes>
    </>
  );
}

export default App;
