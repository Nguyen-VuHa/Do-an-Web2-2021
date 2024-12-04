import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import ENTITIES from './core/entities/entities';
import { SeederModule } from './core/data/seeder.module';
import { UserUseCaseModule } from './use-cases/user/userUseCase.module';
import { UserController } from './controllers/user.controller';
import { databaseConfig } from './config/database';

@Module({
  imports: [
    SeederModule,
    UserUseCaseModule,
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
  controllers: [UserController],
})
export class AppModule {}
