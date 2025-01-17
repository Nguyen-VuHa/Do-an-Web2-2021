import { HttpException, HttpStatus, Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import { IJWTUserInfo } from 'src/core/types/user.type';

@Injectable()
export class VerifyUserClientMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const token = req.headers['authorization']?.split(' ')[1];

    if (!token) {
      throw new HttpException('Access Denied: Invalid credentials', HttpStatus.UNAUTHORIZED);
    }

    try {
      // Giải mã JWT Token và lấy thông tin người dùng từ payload
      const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET); // Dùng secret key để verify token
      req.user = decoded as IJWTUserInfo; // Thêm thông tin người dùng vào request object
      next(); // Tiếp tục xử lý
    } catch (err: any) {
      console.log(err);
      throw new HttpException('Access Denied: Invalid credentials', HttpStatus.UNAUTHORIZED);
    }
  }
}

@Injectable()
export class VerifyRefreshTokenUserClientMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const token = req.headers['authorization']?.split(' ')[1];

    if (!token) {
      throw new HttpException('Access Denied: Invalid credentials', HttpStatus.UNAUTHORIZED);
    }

    try {
      // Giải mã JWT Token và lấy thông tin người dùng từ payload
      const decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET); // Dùng secret key để verify token
      req.user = decoded as IJWTUserInfo; // Thêm thông tin người dùng vào request object
      next(); // Tiếp tục xử lý
    } catch (err: any) {
      console.log(err);

      if (err.name === 'TokenExpiredError') {
        // Token đã hết hạn
        throw new HttpException('Access Denied: Token has expired', HttpStatus.UNAUTHORIZED);
      } else if (err.name === 'JsonWebTokenError') {
        // Token không hợp lệ
        throw new HttpException('Access Denied: Invalid token', HttpStatus.FORBIDDEN);
      } else {
        // Lỗi khác
        throw new HttpException('Access Denied: Unable to process token', HttpStatus.FORBIDDEN);
      }
    }
  }
}
