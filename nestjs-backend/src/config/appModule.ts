import { AdminAuthUseCaseModule } from 'src/use-cases/(admin)/auth/adminAuthUseCase.module';
import { AdminMovieMetaUseCaseModule } from 'src/use-cases/(admin)/movie-meta/adminMovieMetaUseCase.module';
import { AdminMovieUseCaseModule } from 'src/use-cases/(admin)/movie/adminMovieUseCase.module';
import { AdminUserUseCaseModule } from 'src/use-cases/(admin)/user/adminUserUseCase.module';
import { AuthUseCaseModule } from 'src/use-cases/auth/authUseCase.module';

const ADMIN_APPMODULES = [
  AdminAuthUseCaseModule,
  AdminUserUseCaseModule,
  AdminMovieMetaUseCaseModule,
  AdminMovieUseCaseModule,
];

const APPMODULES = [AuthUseCaseModule, ...ADMIN_APPMODULES];

export default APPMODULES;
