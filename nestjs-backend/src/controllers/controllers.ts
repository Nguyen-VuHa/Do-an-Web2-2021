import { AdminActorController } from './admin-actor.controller';
import { AdminAuthController } from './admin-auth.controller';
import { AdminCategoryController } from './admin-category.controller';
import { AdminCinemaController } from './admin-cinema.controller';
import { AdminDirectorController } from './admin-director.controller';
import { AdminFileSystemController } from './admin-file-system.controller';
import { AdminMovieController } from './admin-movie.controller';
import { AdminScreenController } from './admin-screen.controller';
import { AdminShowtimeController } from './admin-showtime.controller';
import { AdminUserController } from './admin-user.controller';
import { AuthController } from './auth.controller';
import { CinemaController } from './cinema.controller';
import { MovieController } from './movie.controller';
import { ShowtimeController } from './showtime.controller';

const ADMIN_CONTROLLERS = [
  AdminAuthController,
  AdminUserController,
  AdminCategoryController,
  AdminDirectorController,
  AdminActorController,
  AdminMovieController,
  AdminFileSystemController,
  AdminCinemaController,
  AdminScreenController,
  AdminShowtimeController,
];

const CLIENT_CONTROLLERS = [MovieController, CinemaController, ShowtimeController];

const CONTROLLERS = [AuthController, ...ADMIN_CONTROLLERS, ...CLIENT_CONTROLLERS];

export default CONTROLLERS;
