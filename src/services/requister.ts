import { AxiosRequestConfig } from "axios";
import { myAxios } from "../hooks/useAxios";


export function requester(url: string, options?: AxiosRequestConfig) {
    return myAxios(url, options)
      .then(res => res.data)
      .catch(error => Promise.reject(error?.response?.data?.message ?? "Error"))
  }