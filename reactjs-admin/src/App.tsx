import { Suspense, lazy, useEffect, useState } from 'react';
import { Toaster } from 'react-hot-toast';
import { Route, Routes } from 'react-router-dom';

import Loader from './common/Loader';
import SignIn from './pages/Authentication/SignIn';
import ECommerce from './pages/Dashboard/ECommerce';
import routes from './routes';
import PrivateRoute from './routes/PrivateRoute';
import RedirectToHome from './routes/RedirectRoute';
import PageNotFound from './pages/NotFound';

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

        {/* Route bắt tất cả các đường dẫn không khớp */}
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  );
}

export default App;
