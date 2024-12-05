import {
  BadRequestException,
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { SignInSystemAccountDTO, SignUpSystemAccountDTO } from 'src/core/dtos/admin-auth.dto';
import { IResponse } from 'src/core/types/common';
import { AdminAuthUseCases } from 'src/use-cases/(admin)/auth/admin-auth.usecase';

@Controller('admin/auth')
export class AdminAuthController {
  constructor(private readonly adminAuthUseCase: AdminAuthUseCases) {}

  @Post('sign-up')
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
  async signUpAccount(@Body() data: SignUpSystemAccountDTO): Promise<IResponse<any>> {
    return this.adminAuthUseCase.signUpAccount(data);
  }

  @Post('sign-in')
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
  async signInAccount(@Body() data: SignInSystemAccountDTO): Promise<IResponse<any>> {
    return this.adminAuthUseCase.signInAccount(data);
  }
}
