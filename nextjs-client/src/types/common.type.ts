import { MOVIE_COMING_SOON, MOVIE_NOW_SHOWING } from "~/constants/movie";

export interface IResponse<T> {
  statusCode: number;
  error: unknown;
  message: string;
  data?: T;
}

export interface IObject<T> {
  [key: string]: T;
}

export interface IProcessToAPI {
  status: "success" | "error";
  message: string;
}

export const MovieTypeEnum = {
  MOVIE_COMING_SOON,
  MOVIE_NOW_SHOWING,
} as const;
