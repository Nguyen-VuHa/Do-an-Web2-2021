import {
  BadRequestException,
  Body,
  Controller,
  Post,
  Req,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import {
  RefreshTokenResponseDTO,
  SignInAccountDTO,
  SignUpAccountDTO,
  VerifyAccountDTO,
} from 'src/core/dtos/auth.dto';
import { ISignInResponse } from 'src/core/types/auth.type';
import { IResponse } from 'src/core/types/common';
import { IJWTUserInfo } from 'src/core/types/user.type';
import { AuthUseCases } from 'src/use-cases/auth/auth.usecase';

@Controller('auth')
export class AuthController {
  constructor(private readonly authUseCase: AuthUseCases) {}

  @Post('/sign-up')
  @UsePipes(
    new ValidationPipe({
      transform: true, // Chuyển đổi dữ liệu (nếu cần)
      exceptionFactory: (errors) => {
        // Tùy chỉnh lỗi trả về
        const validationErrors = errors.map((error) => ({
          field: error.property,
          constraints: error.constraints,
        }));
        return new BadRequestException({
          statusCode: 400,
          message: 'Dữ liệu không hợp lệ',
          error: validationErrors,
        });
      },
    })
  )
  async signUpAccount(@Body() data: SignUpAccountDTO): Promise<IResponse<string>> {
    return this.authUseCase.signUpAccount(data);
  }

  @Post('/sign-in')
  @UsePipes(
    new ValidationPipe({
      transform: true, // Chuyển đổi dữ liệu (nếu cần)
      exceptionFactory: (errors) => {
        // Tùy chỉnh lỗi trả về
        const validationErrors = errors.map((error) => ({
          field: error.property,
          constraints: error.constraints,
        }));
        return new BadRequestException({
          statusCode: 400,
          message: 'Dữ liệu không hợp lệ',
          error: validationErrors,
        });
      },
    })
  )
  async signInAccount(@Body() data: SignInAccountDTO): Promise<IResponse<ISignInResponse>> {
    return this.authUseCase.signInAccount(data);
  }

  @Post('token/refresh')
  async refreshToken(
    @Req() req: Request & { user: IJWTUserInfo }
  ): Promise<IResponse<RefreshTokenResponseDTO>> {
    const { user } = req;
    return this.authUseCase.refreshToken(user);
  }

  @Post('verify')
  @UsePipes(
    new ValidationPipe({
      transform: true, // Chuyển đổi dữ liệu (nếu cần)
      exceptionFactory: (errors) => {
        // Tùy chỉnh lỗi trả về
        const validationErrors = errors.map((error) => ({
          field: error.property,
          constraints: error.constraints,
        }));
        return new BadRequestException({
          statusCode: 400,
          message: 'Dữ liệu không hợp lệ',
          error: validationErrors,
        });
      },
    })
  )
  async verifyToken(@Body() data: VerifyAccountDTO): Promise<IResponse<ISignInResponse>> {
    return this.authUseCase.verifyAccount(data);
  }
}
