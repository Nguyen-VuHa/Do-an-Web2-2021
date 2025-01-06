import { IResponse } from "~/types/common.type";
import axiosInstance from "./axios.config";
import { ICinema } from "~/types/cinema.type";

export const apiFetchCinemas = async (): Promise<IResponse<ICinema[]>> => {
  const path = "/cinema";
  return axiosInstance.get(path);
};
