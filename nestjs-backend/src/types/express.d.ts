import { IJWTUserInfo } from 'src/core/types/user.type';

declare global {
  namespace Express {
    interface Request {
      user: IJWTUserInfo; // Thêm thuộc tính user vào Request
    }
  }
}
