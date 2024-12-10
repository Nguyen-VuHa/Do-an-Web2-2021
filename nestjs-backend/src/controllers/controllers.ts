import { AdminAuthController } from './admin-auth.controller';
import { AdminCategoryController } from './admin-category.controller';
import { AdminDirectorController } from './admin-director.controller';
import { AdminUserController } from './admin-user.controller';
import { AuthController } from './auth.controller';

const ADMIN_CONTROLLERS = [
  AdminAuthController,
  AdminUserController,
  AdminCategoryController,
  AdminDirectorController,
];

const CONTROLLERS = [AuthController, ...ADMIN_CONTROLLERS];

export default CONTROLLERS;
