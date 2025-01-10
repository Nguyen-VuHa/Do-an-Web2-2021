import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import APPMODULES from './config/appModule';
import { databaseConfig } from './config/database';
import CONTROLLERS from './controllers/controllers';
import ENTITIES from './core/entities/entities';
import { VerifyUserAdminSystemMiddleware } from './middlewares/admin-jwt.middleware';
import { VerifyUserClientSystemMiddleware } from './middlewares/client-jwt.middleware';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Đảm bảo ConfigModule có thể dùng toàn app
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: databaseConfig,
    }),
    TypeOrmModule.forFeature(ENTITIES),
    ...APPMODULES,
  ],
  controllers: CONTROLLERS,
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    // Áp dụng `VerifyUserSystemMiddleware` cho `GET` request trên 'api/users'
    consumer
      .apply(VerifyUserAdminSystemMiddleware)
      .forRoutes({ path: 'admin/user/info', method: RequestMethod.GET });

    consumer
      .apply(VerifyUserClientSystemMiddleware)
      .forRoutes({ path: '/user/info', method: RequestMethod.GET });
  }
}
