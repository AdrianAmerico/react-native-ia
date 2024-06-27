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

  async postSentiments(formData: SentimentsParams): Promise<SentimentResponse> {
    const HTTPResponse = await this.httpPostClient.post({
      url: this.url,
      body: formData,
      config: {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
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
