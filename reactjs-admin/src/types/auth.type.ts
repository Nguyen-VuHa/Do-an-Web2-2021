import { IUserInfo } from "./user.type";

export interface IPayloadSignIn {
  email: string;
  password: string;
}


export interface IResponseSignIn {
  accessToken: string,
  refreshToken: string,
  user: IUserInfo
}