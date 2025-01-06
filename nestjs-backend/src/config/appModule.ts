import { DataSeederServiceModule } from 'src/core/data/data-seeder.module';
import { RedisServiceModule } from 'src/services/redis/redis.module';
import { AdminAuthUseCaseModule } from 'src/use-cases/(admin)/auth/adminAuthUseCase.module';
import { AdminCinemaUseCaseModule } from 'src/use-cases/(admin)/cinema/cinemaUseCase.module';
import { AdminFileSystemUseCaseModule } from 'src/use-cases/(admin)/file-system/fileSystemUseCase.module';
import { AdminMovieMetaUseCaseModule } from 'src/use-cases/(admin)/movie-meta/adminMovieMetaUseCase.module';
import { AdminMovieUseCaseModule } from 'src/use-cases/(admin)/movie/adminMovieUseCase.module';
import { AdminScreenUseCaseModule } from 'src/use-cases/(admin)/screen/screenUseCase.module';
import { AdminShowtimeUseCaseModule } from 'src/use-cases/(admin)/showtime/showtimeUseCase.module';
import { AdminUserUseCaseModule } from 'src/use-cases/(admin)/user/adminUserUseCase.module';
import { AuthUseCaseModule } from 'src/use-cases/auth/authUseCase.module';
import { CinemaUseCaseModule } from 'src/use-cases/cinema/cinemaUseCase.module';
import { MovieUseCaseModule } from 'src/use-cases/movie/movieUseCase.module';

const SEEDER_MODULES = [DataSeederServiceModule];

const ADMIN_APPMODULES = [
  AdminAuthUseCaseModule,
  AdminUserUseCaseModule,
  AdminMovieMetaUseCaseModule,
  AdminMovieUseCaseModule,
  AdminFileSystemUseCaseModule,
  AdminCinemaUseCaseModule,
  AdminScreenUseCaseModule,
  AdminShowtimeUseCaseModule,
];

const THIRD_PARTY_MODULES = [RedisServiceModule];

const CLIENT_MODULES = [AuthUseCaseModule, MovieUseCaseModule, CinemaUseCaseModule];

const APPMODULES = [
  ...ADMIN_APPMODULES,
  ...CLIENT_MODULES,
  ...THIRD_PARTY_MODULES,
  ...SEEDER_MODULES,
];

export default APPMODULES;
