import { AdminActorController } from './admin-actor.controller';
import { AdminAuthController } from './admin-auth.controller';
import { AdminCategoryController } from './admin-category.controller';
import { AdminDirectorController } from './admin-director.controller';
import { AdminMovieController } from './admin-movie.controller';
import { AdminUserController } from './admin-user.controller';
import { AuthController } from './auth.controller';

const ADMIN_CONTROLLERS = [
  AdminAuthController,
  AdminUserController,
  AdminCategoryController,
  AdminDirectorController,
  AdminActorController,
  AdminMovieController,
];

const CONTROLLERS = [AuthController, ...ADMIN_CONTROLLERS];

export default CONTROLLERS;
