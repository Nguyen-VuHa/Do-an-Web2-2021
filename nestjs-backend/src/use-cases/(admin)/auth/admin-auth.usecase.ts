import { BadRequestException, Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { ERROR_CODE_DUPLICATE_UNIQUE } from 'src/constants/errors';
import {
  CreateUserSystemResponseDto,
  SignInSystemAccountDTO,
  SignUpSystemAccountDTO,
} from 'src/core/dtos/admin-auth.dto';
import { SystemUser } from 'src/core/entities/system-user.entity';
import { ISignInResponse } from 'src/core/types/auth.type';
import { IResponse } from 'src/core/types/common';
import { SystemUserService } from 'src/services/system-user/system-user.service';
import { comparePasswords, hashPassword } from 'src/utils/bcrypt';
import { stringToDate } from 'src/utils/convert';
import { generateTokens } from 'src/utils/jwt';

@Injectable()
export class AdminAuthUseCases {
  constructor(private readonly systemUserService: SystemUserService) {}

  async signUpAccount(data: SignUpSystemAccountDTO): Promise<IResponse<any>> {
    try {
      const passwordHash = await hashPassword(data.password);

      const userData = new SystemUser();

      userData.email = data.email;
      userData.fullname = data.fullName;
      userData.password = passwordHash;
      userData.phone_number = data.phoneNumber;
      userData.birth_day = stringToDate(data.birthDate);

      const userCreate = await this.systemUserService.createUserSystem(userData);

      const userResponse = plainToClass(CreateUserSystemResponseDto, userCreate, {
        excludeExtraneousValues: true,
      });

      const response: IResponse<any> = {
        statusCode: 200,
        error: null,
        message: 'Tạo mới người dùng thành công',
        data: userResponse,
      };
      return response;
    } catch (error) {
      let errorResponse: any;
      if (error.code === ERROR_CODE_DUPLICATE_UNIQUE) {
        // mã lỗi trùng lặp trong database
        // PostgreSQL code for unique violation
        errorResponse = 'Email đăng ký đã tồn tại';
      } else {
        errorResponse = error;
      }

      throw new BadRequestException({
        statusCode: 400,
        message: 'Tạo người dùng không thành công.',
        errors: errorResponse,
      });
    }
  }

  async signInAccount(data: SignInSystemAccountDTO): Promise<IResponse<ISignInResponse>> {
    try {
      const user = await this.systemUserService.getUserSystemByEmail(data.email);

      if (!user) {
        throw new Error('Email hoặc mật khẩu không hợp lệ.');
      }

      const isPasswordCompare = await comparePasswords(data.password, user.password);

      if (!isPasswordCompare) {
        throw new Error('Email hoặc mật khẩu không hợp lệ.');
      }

      const payloadToken = {
        user_id: user.user_id,
        email: user.email,
        fullname: user.fullname,
      };

      const accessSecret = process.env.JWT_ACCESS_SECRET;
      const refreshSecret = process.env.JWT_REFRESH_SECRET;

      const { accessToken, refreshToken } = generateTokens(
        payloadToken,
        accessSecret,
        refreshSecret
      );

      const userResponse = plainToClass(CreateUserSystemResponseDto, user, {
        excludeExtraneousValues: true,
      });

      const dataResponse: ISignInResponse = {
        accessToken,
        refreshToken,
        user: userResponse,
      };

      const response: IResponse<ISignInResponse> = {
        statusCode: 200,
        error: null,
        message: 'Đăng nhập thành công.',
        data: dataResponse,
      };

      return response;
    } catch (error) {
      throw new BadRequestException({
        statusCode: 400,
        message: 'Đăng nhập không thành công.',
        errors: error.message,
      });
    }
  }
}
