export interface IResponse<T> {
  statusCode: number;
  error: unknown;
  message: string;
  data?: T;
}

export interface IObject<T> {
  [key: string]: T;
}
