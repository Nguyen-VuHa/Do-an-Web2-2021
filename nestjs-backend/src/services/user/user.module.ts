import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/core/entities/user.entity';
import { UserService } from './user.service';
import { UserPhoto } from 'src/core/entities/user-photo.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, UserPhoto])],
  providers: [UserService],
  exports: [UserService],
})
export class UserServiceModule {}
