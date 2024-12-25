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

export interface IPagination {
  _page: number;
  _page_size: number;
  total?: number;
}

export interface IObject<T> {
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
