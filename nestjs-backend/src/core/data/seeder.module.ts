import { Module } from '@nestjs/common';
import { UserSeeder } from './user.seeder';
import { CinemaSeeder } from './cinema.seeder';
import { SeederService } from './seeder.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import ENTITIES from '../entities/entities';
import { MovieSeeder } from './movie.seeder';

@Module({
  imports: [TypeOrmModule.forFeature(ENTITIES)],
  providers: [SeederService, UserSeeder, CinemaSeeder, MovieSeeder],
})
export class SeederModule {}
