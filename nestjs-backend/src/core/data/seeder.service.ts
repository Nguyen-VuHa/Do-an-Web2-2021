import { Injectable } from '@nestjs/common';
import { UserSeeder } from './user.seeder';
import { CinemaSeeder } from './cinema.seeder';
import { MovieSeeder } from './movie.seeder';

@Injectable()
export class SeederService {
  constructor(
    private readonly userSeeder: UserSeeder,
    private readonly cinemaSeeder: CinemaSeeder,
    private readonly movieSeeder: MovieSeeder
  ) {}

  async run() {
    // await this.userSeeder.seed();
    await this.cinemaSeeder.seed();
    await this.movieSeeder.seed();
    console.log('All Seeders have run successfully');
  }
}
