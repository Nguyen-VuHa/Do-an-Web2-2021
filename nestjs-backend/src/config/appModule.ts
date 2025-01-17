import { DataSeederServiceModule } from 'src/core/data/data-seeder.module';
import { RedisServiceModule } from 'src/services/redis/redis.module';
import { StatusServiceModule } from 'src/services/status/status.module';
import { AdminAuthUseCaseModule } from 'src/use-cases/(admin)/auth/adminAuthUseCase.module';
import { AdminCinemaUseCaseModule } from 'src/use-cases/(admin)/cinema/cinemaUseCase.module';
import { AdminFileSystemUseCaseModule } from 'src/use-cases/(admin)/file-system/fileSystemUseCase.module';
import { AdminMovieMetaUseCaseModule } from 'src/use-cases/(admin)/movie-meta/adminMovieMetaUseCase.module';
import { AdminMovieUseCaseModule } from 'src/use-cases/(admin)/movie/adminMovieUseCase.module';
import { AdminScreenUseCaseModule } from 'src/use-cases/(admin)/screen/screenUseCase.module';
import { AdminShowtimeUseCaseModule } from 'src/use-cases/(admin)/showtime/showtimeUseCase.module';
import { AdminUserUseCaseModule } from 'src/use-cases/(admin)/user/adminUserUseCase.module';
import { AuthUseCaseModule } from 'src/use-cases/auth/authUseCase.module';
import { BookingUseCaseModule } from 'src/use-cases/booking/bookingUseCase.module';
import { CinemaUseCaseModule } from 'src/use-cases/cinema/cinemaUseCase.module';
import { MovieUseCaseModule } from 'src/use-cases/movie/movieUseCase.module';
import { ShowtimeUseCaseModule } from 'src/use-cases/showtime/showtimeUseCase.module';
import { UserUseCaseModule } from 'src/use-cases/user/userUseCase.module';
import { GlobalHttpModule } from './axios';

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

const CUSTOM_MODULES = [StatusServiceModule, GlobalHttpModule];

const CLIENT_MODULES = [
  AuthUseCaseModule,
  MovieUseCaseModule,
  CinemaUseCaseModule,
  ShowtimeUseCaseModule,
  UserUseCaseModule,
  BookingUseCaseModule,
];

const APPMODULES = [
  ...ADMIN_APPMODULES,
  ...CLIENT_MODULES,
  ...THIRD_PARTY_MODULES,
  ...CUSTOM_MODULES,
  ...SEEDER_MODULES,
];

export default APPMODULES;
