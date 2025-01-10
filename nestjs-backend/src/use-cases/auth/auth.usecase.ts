import { BadRequestException, Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { ERROR_CODE_DUPLICATE_UNIQUE } from 'src/constants/errors';
import {
  CreateUserResponseDto,
  RefreshTokenResponseDTO,
  SignInAccountDTO,
  SignUpAccountDTO,
} from 'src/core/dtos/auth.dto';
import { User } from 'src/core/entities/user.entity';
import { ISignInResponse } from 'src/core/types/auth.type';
import { IResponse } from 'src/core/types/common';
import { IJWTUserInfo } from 'src/core/types/user.type';
import { UserService } from 'src/services/user/user.service';
import { comparePasswords, hashPassword } from 'src/utils/bcrypt';
import { stringToDate } from 'src/utils/convert';
import { generateTokens } from 'src/utils/jwt';

@Injectable()
export class AuthUseCases {
  constructor(private readonly userSevice: UserService) {}

  async signUpAccount(data: SignUpAccountDTO): Promise<IResponse<string>> {
    try {
      const passwordHash = await hashPassword(data.password);

      const userData = new User();

      userData.email = data.email;
      userData.fullname = data.fullname;
      userData.password = passwordHash;
      userData.phone_number = data.phone_number;
      userData.birth_day = stringToDate(data.birth_date);

      await this.userSevice.createUser(userData);

      const response: IResponse<any> = {
        statusCode: 200,
        error: null,
        message: 'Đăng ký thành viên thành công.',
        data: '',
      };
      return response;
    } catch (error) {
      let errorResponse: any;
      if (error.code === ERROR_CODE_DUPLICATE_UNIQUE) {
        // mã lỗi trùng lặp trong database
        // PostgreSQL code for unique violation
        errorResponse = 'Email đăng ký đã tồn tại.';
      } else {
        errorResponse = error;
      }

      throw new BadRequestException({
        statusCode: 400,
        message: 'Đăng ký thành viên thất bại.',
        error: errorResponse,
      });
    }
  }

  async signInAccount(data: SignInAccountDTO): Promise<IResponse<ISignInResponse>> {
    try {
      const user = await this.userSevice.getUserByEmail(data.email);

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

      const userResponse = plainToClass(CreateUserResponseDto, user, {
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
        error: error.message,
      });
    }
  }

  async refreshToken(user: IJWTUserInfo): Promise<IResponse<RefreshTokenResponseDTO>> {
    const userInfo: IJWTUserInfo = {
      user_id: user.user_id,
      email: user.email,
      fullname: user.fullname,
    };

    const accessSecret = process.env.JWT_ACCESS_SECRET;
    const refreshSecret = process.env.JWT_REFRESH_SECRET;

    const { accessToken, refreshToken } = generateTokens(userInfo, accessSecret, refreshSecret);

    const response: IResponse<RefreshTokenResponseDTO> = {
      statusCode: 200,
      error: null,
      message: 'Cập nhật token thành công.',
      data: {
        access_token: accessToken,
        refresh_token: refreshToken,
      },
    };

    return response;
  }
}
