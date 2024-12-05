import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SystemUserService } from './system-user.service';
import { SystemUser } from 'src/core/entities/system-user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SystemUser])],
  providers: [SystemUserService],
  exports: [SystemUserService],
})
export class SystemUserServiceModule {}
