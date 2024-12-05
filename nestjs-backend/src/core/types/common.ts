// pagination.interface.ts
export interface IPagination<T> {
  data: T[]; // Dữ liệu trả về
  total: number; // Tổng số bản ghi
  page: number; // Trang hiện tại
  limit: number; // Số bản ghi mỗi trang
}

export enum SortType {
  DESC = 'DESC',
  ASC = 'ASC',
}

export interface IResponse<T> {
  statusCode: number;
  error: string;
  message: string;
  data?: T;
}
