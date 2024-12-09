import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import ENTITIES from './core/entities/entities';
import { databaseConfig } from './config/database';
import { AuthController } from './controllers/auth.controller';
import { AuthUseCaseModule } from './use-cases/auth/authUseCase.module';
import { AdminAuthUseCaseModule } from './use-cases/(admin)/auth/adminAuthUseCase.module';
import { AdminAuthController } from './controllers/admin-auth.controller';
import { AdminUserController } from './controllers/admin-user.controller';
import { AdminUserUseCaseModule } from './use-cases/(admin)/user/adminUserUseCase.module';
import { VerifyUserSystemMiddleware } from './middlewares/admin-jwt.middleware';
import { AdminCategoryController } from './controllers/admin-category.controller';
import { AdminCategoryUseCaseModule } from './use-cases/(admin)/category/adminCategoryUseCase.module';

@Module({
  imports: [
    AuthUseCaseModule,
    AdminAuthUseCaseModule,
    AdminUserUseCaseModule,
    AdminCategoryUseCaseModule,
    ConfigModule.forRoot({
      isGlobal: true, // Đảm bảo ConfigModule có thể dùng toàn app
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: databaseConfig,
    }),
    TypeOrmModule.forFeature(ENTITIES),
  ],
  controllers: [AuthController, AdminAuthController, AdminUserController, AdminCategoryController],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    // Áp dụng `MyCustomMiddleware` cho `GET` request trên 'api/users'
    consumer
      .apply(VerifyUserSystemMiddleware)
      .forRoutes({ path: 'admin/user/info', method: RequestMethod.GET });
  }
}
