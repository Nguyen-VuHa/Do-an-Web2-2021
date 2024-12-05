import { BadRequestException, Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { ERROR_CODE_DUPLICATE_UNIQUE } from 'src/constants/errors';
import { CreateUserResponseDto, SignUpAccountDTO } from 'src/core/dtos/auth.dto';
import { User } from 'src/core/entities/user.entity';
import { IResponse } from 'src/core/types/common';
import { UserService } from 'src/services/user/user.service';
import { hashPassword } from 'src/utils/bcrypt';
import { stringToDate } from 'src/utils/convert';

@Injectable()
export class AuthUseCases {
  constructor(private readonly userSevice: UserService) {}

  async signUpAccount(data: SignUpAccountDTO): Promise<IResponse<any>> {
    try {
      const passwordHash = await hashPassword(data.password);

      const userData = new User();

      userData.email = data.email;
      userData.fullname = data.fullName;
      userData.password = passwordHash;
      userData.phone_number = data.phoneNumber;
      userData.birth_day = stringToDate(data.birthDate);

      const userCreate = await this.userSevice.createUser(userData);

      const userResponse = plainToClass(CreateUserResponseDto, userCreate, {
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
}
