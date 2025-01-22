import { IObject, IResponse, IResponsePagintaion } from "~/types/common.type";
import { INotify } from "~/types/notify.type";
import axiosInstance from "./axios.config";

export const apiFetchNotifyList = async (
  params: IObject<any>,
): Promise<IResponse<IResponsePagintaion<INotify[]>>> => {
  const path = "/notify/list";
  return axiosInstance.get(path, {
    params,
  });
};

export const apiUpdateNotifyStatus = async (): Promise<IResponse<boolean>> => {
  const path = "/notify/status";
  return axiosInstance.put(path, {});
};
