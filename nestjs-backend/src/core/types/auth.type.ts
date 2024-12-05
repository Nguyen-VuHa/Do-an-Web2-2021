import { CreateUserResponseDto } from '../dtos/auth.dto';

export interface ISignInResponse {
  accessToken: string;
  refreshToken: string;
  user: CreateUserResponseDto;
}
