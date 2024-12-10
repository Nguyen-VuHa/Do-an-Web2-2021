import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Actor } from 'src/core/entities/actor.entity';
import { ActorService } from './actor.service';

@Module({
  imports: [TypeOrmModule.forFeature([Actor])],
  providers: [ActorService],
  exports: [ActorService],
})
export class ActorServiceModule {}
