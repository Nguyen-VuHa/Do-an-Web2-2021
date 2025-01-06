import { IResponse } from "~/types/common.type";
import axiosInstance from "./axios.config";
import { IMovie, IMovieInfo } from "~/types/movie.type";

export const apiFetchMovieTopWeek = async (): Promise<
  IResponse<IMovieInfo>
> => {
  const path = "/movie/top-week";
  return axiosInstance.get(path);
};

export const apiFetchMovies = async (): Promise<IResponse<IMovie>> => {
  const path = "/movie";
  return axiosInstance.get(path);
};
