import { HttpPostClient, HttpPostClientParams } from "@/data/protocols/http";
import { HTTPResponse, HttpStatusCode } from "../protocols/http/http-response";
import { SentimentResponse } from "@/types";

export class HttpPostClientSpy<T, R> implements HttpPostClient<T, R> {
  url?: string;
  body?: T;
  response: HTTPResponse<R> = {
    statusCode: HttpStatusCode.ok,
  };

  async post(params: HttpPostClientParams<T>): Promise<HTTPResponse<R>> {
    this.url = params.url;
    this.body = params.body;

    return Promise.resolve(this.response);
  }
}
