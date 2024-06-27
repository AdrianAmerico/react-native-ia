import { AxiosRequestConfig } from "axios";
import { HTTPResponse } from "./http-response";

export type HttpPostClientParams<T> = {
  url: string;
  body?: T;
  config?: AxiosRequestConfig
};

export interface HttpPostClient<T, R> {
  post(params: HttpPostClientParams<T>): Promise<HTTPResponse<R>>;
}
