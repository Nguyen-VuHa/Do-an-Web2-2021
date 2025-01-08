import { IResponse } from "~/types/common.type";
import axiosInstance from "./axios.config";
import { IMovie, IMovieDetail, IMovieInfo } from "~/types/movie.type";

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

export const apiFetchMovieDetail = async (
  movie_id: string,
): Promise<IResponse<IMovieDetail>> => {
  const path = `/movie/${movie_id}`;
  return axiosInstance.get(path);
};
