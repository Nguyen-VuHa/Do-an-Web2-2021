export interface IResponse<T> {
  statusCode: number;
  error: any;
  message: string;
  data?: T;
}

export interface IOject<T> {
  [key: string]: T;
}

export interface ISelectOption {
  value: any;
  label: string;
}
