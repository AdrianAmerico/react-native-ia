import { HttpPostClient, HttpPostClientParams } from "@/data/protocols/http";
import { HTTPResponse, HttpStatusCode } from "../protocols/http/http-response";
import { AxiosRequestConfig } from "axios";

export class HttpPostClientSpy<T, R> implements HttpPostClient<T, R> {
  url?: string;
  body?: T;
  config?: AxiosRequestConfig;
  response: HTTPResponse<R> = {
    statusCode: HttpStatusCode.ok,
  };

  async post(params: HttpPostClientParams<T>): Promise<HTTPResponse<R>> {
    this.url = params.url;
    this.body = params.body;
    this.config = params.config;

    return Promise.resolve(this.response);
  }
}
