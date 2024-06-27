import axios from "axios";
import {
  HttpPostClient,
  HttpPostClientParams,
  HTTPResponse,
} from "../protocols/http";

export class RemoteHttpPostClient<T, R> implements HttpPostClient<T, R> {
  async post(params: HttpPostClientParams<T>): Promise<HTTPResponse<R>> {
    const response = await axios.post<R>(
      params.url,
      params.body,
      params.config
    );

    return {
      statusCode: response.status,
      body: response.data,
    };
  }
}
