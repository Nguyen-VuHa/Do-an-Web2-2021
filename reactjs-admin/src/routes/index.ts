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

const Calendar = lazy(() => import('../pages/Calendar'));
const Chart = lazy(() => import('../pages/Chart'));
const FormElements = lazy(() => import('../pages/Form/FormElements'));
const FormLayout = lazy(() => import('../pages/Form/FormLayout'));
const Profile = lazy(() => import('../pages/Profile'));
const Settings = lazy(() => import('../pages/Settings'));
const Tables = lazy(() => import('../pages/Tables'));
const Alerts = lazy(() => import('../pages/UiElements/Alerts'));
const Buttons = lazy(() => import('../pages/UiElements/Buttons'));

const coreRoutes = [
  {
    path: '/movies',
    title: 'Movie Management',
    component: MovieManagement,
  },
  {
    path: '/movies/create',
    title: 'Movie Create',
    component: MovieEditer,
  },
  {
    path: '/movies/update/:movie_id',
    title: 'Movie Update',
    component: MovieEditer,
  },
  {
    path: '/movies/detail/:movie_id',
    title: 'Movie Detail',
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
    title: 'Cinema Create',
    component: CinemaEditer,
  },
  {
    path: '/cinema/update/:slug',
    title: 'Cinema Edit',
    component: CinemaEditer,
  },

  {
    path: '/cinema/detail/:slug',
    title: 'Cinema Detail',
    component: CinemaDetail,
  },
  {
    path: '/calendar',
    title: 'Calender',
    component: Calendar,
  },
  {
    path: '/profile',
    title: 'Profile',
    component: Profile,
  },
  {
    path: '/forms/form-elements',
    title: 'Forms Elements',
    component: FormElements,
  },
  {
    path: '/forms/form-layout',
    title: 'Form Layouts',
    component: FormLayout,
  },
  {
    path: '/tables',
    title: 'Tables',
    component: Tables,
  },
  {
    path: '/settings',
    title: 'Settings',
    component: Settings,
  },
  {
    path: '/chart',
    title: 'Chart',
    component: Chart,
  },
  {
    path: '/ui/alerts',
    title: 'Alerts',
    component: Alerts,
  },
  {
    path: '/ui/buttons',
    title: 'Buttons',
    component: Buttons,
  },
];

const routes = [...coreRoutes];
export default routes;
