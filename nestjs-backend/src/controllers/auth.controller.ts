import {
  BadRequestException,
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { SignUpAccountDTO } from 'src/core/dtos/auth.dto';
import { IResponse } from 'src/core/types/common';
import { AuthUseCases } from 'src/use-cases/auth/auth.usecase';

@Controller('auth')
export class AuthController {
  constructor(private authUseCase: AuthUseCases) {}

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
          errors: validationErrors,
        });
      },
    })
  )
  async signUpAccount(@Body() data: SignUpAccountDTO): Promise<IResponse<any>> {
    return this.authUseCase.signUpAccount(data);
  }
}
