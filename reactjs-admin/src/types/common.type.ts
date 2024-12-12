export interface IResponse<T> {
  statusCode: number;
  error: any;
  message: string;
  data?: T;
}

export interface IResponsePagintaion<T> {
  page: number;
  limit: number;
  total: number;
  list: T;
}

export interface IOject<T> {
  [key: string]: T;
}

export interface ISelectOption {
  value: any;
  label: string;
}

export type ColorVariant =
  | 'primary'
  | 'success'
  | 'danger'
  | 'warning'
  | 'violet'
  | 'purple'
  | 'pink'
  | 'rose'
  | 'cyan'
  | 'sky';
