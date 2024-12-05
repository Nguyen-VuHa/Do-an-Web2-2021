import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import ENTITIES from './core/entities/entities';
import { databaseConfig } from './config/database';
import { AuthController } from './controllers/auth.controller';
import { AuthUseCaseModule } from './use-cases/auth/authUseCase.module';
import { AdminAuthUseCaseModule } from './use-cases/(admin)/auth/adminAuthUseCase.module';
import { AdminAuthController } from './controllers/admin-auth.controller';

@Module({
  imports: [
    AuthUseCaseModule,
    AdminAuthUseCaseModule,
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
  controllers: [AuthController, AdminAuthController],
})
export class AppModule {}
