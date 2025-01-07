import { IResponse } from "~/types/common.type";
import axiosInstance from "./axios.config";
import { ICinema, ICinemaDetail } from "~/types/cinema.type";

export const apiFetchCinemas = async (): Promise<IResponse<ICinema[]>> => {
  const path = "/cinema";
  return axiosInstance.get(path);
};

export const apiFetchCinemaDetail = async (
  slug: string,
): Promise<IResponse<ICinemaDetail>> => {
  const path = `/cinema/${slug}`;
  return axiosInstance.get(path);
};

export const apiFetchCinemaArea = async (): Promise<IResponse<string[]>> => {
  const path = `/cinema/area/list`;
  return axiosInstance.get(path);
};
