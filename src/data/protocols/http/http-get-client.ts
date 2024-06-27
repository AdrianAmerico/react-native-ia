import { AxiosRequestConfig } from "axios";
import { HTTPResponse } from "./http-response";

export type HttpGetClientParams = {
  url: string;
  config?: AxiosRequestConfig;
};

export interface HTTPGetClient<T> {
  get(params: HttpGetClientParams): Promise<HTTPResponse<T>>;
}
