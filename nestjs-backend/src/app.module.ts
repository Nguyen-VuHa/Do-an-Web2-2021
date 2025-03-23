import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import APPMODULES from './config/appModule';
import { databaseConfig } from './config/database';
import CONTROLLERS from './controllers/controllers';
import ENTITIES from './core/entities/entities';
import { VerifyUserAdminSystemMiddleware } from './middlewares/admin-jwt.middleware';
import {
  VerifyRefreshTokenUserClientMiddleware,
  VerifyUserClientMiddleware,
} from './middlewares/client-jwt.middleware';
import { BullModule } from '@nestjs/bullmq';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    ConfigModule.forRoot({
      isGlobal: true, // Đảm bảo ConfigModule có thể dùng toàn app
    }),
    BullModule.forRoot({
      connection: {
        host: process.env.REDIS_HOST,
        port: Number(process.env.REDIS_PORT),
        username: process.env.REDIS_USERNAME,
        password: process.env.REDIS_PASSWORD,
      },
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
    consumer
      .apply(VerifyUserAdminSystemMiddleware)
      .forRoutes({ path: 'admin/user/info', method: RequestMethod.GET });

    consumer
      .apply(VerifyUserClientMiddleware)
      .forRoutes(
        { path: 'user/*', method: RequestMethod.ALL },
        { path: 'notify/*', method: RequestMethod.ALL },
        { path: 'booking/ticket', method: RequestMethod.POST }
      );

    consumer
      .apply(VerifyRefreshTokenUserClientMiddleware)
      .forRoutes({ path: 'auth/token/refresh', method: RequestMethod.POST });
  }
}
