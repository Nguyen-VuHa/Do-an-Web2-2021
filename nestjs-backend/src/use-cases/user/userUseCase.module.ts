import { Module } from '@nestjs/common';
import { UserUseCases } from './user.useCase';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/core/entities/user.entity';
import { UserService } from './user.service';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UserService, UserUseCases],
  exports: [UserService, UserUseCases],
})
export class UserUseCaseModule {}
