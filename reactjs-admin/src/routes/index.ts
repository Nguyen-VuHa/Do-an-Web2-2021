import { lazy } from 'react';

const MovieManagement = lazy(
  () => import('src/pages/MovieManagement/MovieManagement.tsx'),
);
const MovieEditer = lazy(() => import('src/pages/MovieEditer/MovieEditer'));
const MovieExtension = lazy(
  () => import('src/pages/MovieExtension/MovieExtension.Main'),
);
const MovieDetail = lazy(
  () => import('src/pages/MovieDetail/MovieDetail.Main'),
);
const FileSystem = lazy(() => import('src/pages/FileSystem/FileSystem.Main'));
const CinemaManagement = lazy(
  () => import('src/pages/CinemaManagement/CinemaManagement.Main'),
);
const CinemaEditer = lazy(
  () => import('src/pages/CinemaEditer/CinemaEditer.Main'),
);
const CinemaDetail = lazy(
  () => import('src/pages/CinemaDetail/CinemaDetail.Main'),
);
const CinemaExtension = lazy(
  () => import('src/pages/CinemaExtension/CinemaExtension.Main'),
);
const ScreenManagement = lazy(
  () => import('src/pages/ScreenManagement/ScreenManagement.Main'),
);
const ScreenEditer = lazy(
  () => import('src/pages/ScreenEditer/ScreenEditer.Main'),
);
const ScreenDetail = lazy(
  () => import('src/pages/ScreenDetail/ScreenDetail.Main'),
);
const ShowtimeManagement = lazy(
  () => import('src/pages/ShowtimeManagement/ShowtimeManagement.Main'),
);
const ShowtimeEditer = lazy(
  () => import('src/pages/ShowtimeEditer/ShowtimeEditer.Main'),
);
const ShowtimeDetail = lazy(
  () => import('src/pages/ShowtimeDetail/ShowtimeDetail.Main'),
);
const ShowtimeExtension = lazy(
  () => import('src/pages/ShowtimeExtension/ShowtimeExtension.Main'),
);

const Profile = lazy(() => import('../pages/Profile'));

const coreRoutes = [
  {
    path: '/movies',
    title: 'Movie Management',
    component: MovieManagement,
  },
  {
    path: '/movies/create',
    title: 'Create Movie',
    component: MovieEditer,
  },
  {
    path: '/movies/update/:movie_id',
    title: 'Update Movie',
    component: MovieEditer,
  },
  {
    path: '/movies/detail/:movie_id',
    title: 'Detail Movie',
    component: MovieDetail,
  },
  {
    path: '/movies/extension',
    title: 'Movie Extension',
    component: MovieExtension,
  },
  {
    path: '/file-system',
    title: 'File System',
    component: FileSystem,
  },
  {
    path: '/cinema',
    title: 'Cinema Management',
    component: CinemaManagement,
  },
  {
    path: '/cinema/create',
    title: 'Create Cinema',
    component: CinemaEditer,
  },
  {
    path: '/cinema/update/:slug',
    title: 'Update Cinema',
    component: CinemaEditer,
  },
  {
    path: '/cinema/detail/:slug',
    title: 'Detail Cinema',
    component: CinemaDetail,
  },
  {
    path: '/cinema/extension',
    title: 'Cinema Extension',
    component: CinemaExtension,
  },
  {
    path: '/screen',
    title: 'Screen Management',
    component: ScreenManagement,
  },
  {
    path: '/screen/create',
    title: 'Create Screen',
    component: ScreenEditer,
  },
  {
    path: '/screen/update/:screen_id',
    title: 'Update Screen',
    component: ScreenEditer,
  },
  {
    path: '/screen/detail/:screen_id',
    title: 'Detail Screen',
    component: ScreenDetail,
  },
  {
    path: '/showtime',
    title: 'Showtime Management',
    component: ShowtimeManagement,
  },
  {
    path: '/showtime/create',
    title: 'Create Showtime',
    component: ShowtimeEditer,
  },
  {
    path: '/showtime/update/:showtime_id',
    title: 'Update Showtime',
    component: ShowtimeEditer,
  },
  {
    path: '/showtime/detail/:showtime_id',
    title: 'Detail Showtimne',
    component: ShowtimeDetail,
  },
  {
    path: '/showtime/extension',
    title: 'Showtime Extension',
    component: ShowtimeExtension,
  },

  {
    path: '/profile',
    title: 'Profile',
    component: Profile,
  },
];

const routes = [...coreRoutes];
export default routes;
