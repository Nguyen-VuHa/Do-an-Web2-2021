import { IResponse } from "~/types/common.type";
import {
  IShowtimeByCinema,
  IShowtimeMovieResponse,
} from "~/types/showtime.type";
import axiosInstance from "./axios.config";

export const apiFetchShowtimeByCinema = async (
  slug: string,
): Promise<IResponse<IShowtimeByCinema[]>> => {
  const path = `/showtime/by-cinema/${slug}`;
  return axiosInstance.get(path);
};

export const apiFetchShowtimeByMovie = async (
  movie_id: string,
): Promise<IResponse<IShowtimeMovieResponse>> => {
  const path = `/showtime/by-movie/${movie_id}`;
  return axiosInstance.get(path);
};
