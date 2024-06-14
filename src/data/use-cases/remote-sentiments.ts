import { Sentiments, SentimentsParams } from "@/domain/use-cases";
import { HttpPostClient, HttpStatusCode } from "../protocols/http";
import { InvalidCredentialsError, UnexpectedError } from "@/domain/errors";
import { SentimentResponse } from "@/types";

export class RemoteSentiments implements Sentiments {
  constructor(
    private readonly url: string,
    private readonly httpPostClient: HttpPostClient<
      SentimentsParams,
      SentimentResponse
    >
  ) {}

  async postSentiments(params: SentimentsParams): Promise<SentimentResponse> {
    const HTTPResponse = await this.httpPostClient.post({
      url: this.url,
      body: params,
    });

    switch (HTTPResponse.statusCode) {
      case HttpStatusCode.ok:
        return HTTPResponse.body;

      case HttpStatusCode.unauthorized:
        throw new InvalidCredentialsError();

      default:
        throw new UnexpectedError();
    }
  }
}
