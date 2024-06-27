import axios from "axios";
import { HttpPostClientParams, HTTPResponse } from "../protocols/http";
import { HTTPGetClient } from "../protocols/http/http-get-client";

export class RemoteHttpGetClient<T> implements HTTPGetClient<T> {
  async get(params: HttpPostClientParams<T>): Promise<HTTPResponse<T>> {
    const response = await axios.get<T>(params.url, params.config);

    return {
      statusCode: response.status,
      body: response.data,
    };
  }
}
