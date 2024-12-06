export interface IResponse<T> {
  statusCode: number;
  error: string;
  message: string;
  data?: T;
}

export interface IOject<T> {
  [key: string]: T
}