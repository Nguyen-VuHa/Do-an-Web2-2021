export interface IResponse<T> {
  statusCode: number;
  errors: any;
  message: string;
  data?: T;
}

export interface IOject<T> {
  [key: string]: T
}