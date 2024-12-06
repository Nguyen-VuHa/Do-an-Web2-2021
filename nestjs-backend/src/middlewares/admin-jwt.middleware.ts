import { HttpException, HttpStatus, Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import { IJWTUserInfo } from 'src/core/types/user.type';

@Injectable()
export class VerifyUserSystemMiddleware implements NestMiddleware {
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
