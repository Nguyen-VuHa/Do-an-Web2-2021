import { IResponse } from "~/types/common.type";
import axiosInstance from "./axios.config";
import { IShowtimeByCinema } from "~/types/showtime.type";

export const apiFetchShowtimeByCinema = async (
  slug: string,
): Promise<IResponse<IShowtimeByCinema[]>> => {
  const path = `/showtime/by-cinema/${slug}`;
  return axiosInstance.get(path);
};
