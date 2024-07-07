import { SentimentsDataSource, SentimentsParams } from "@/domain/use-cases";
import { RemoteHttpPostClient } from "@/domain/use-cases/http-post-client";
import { SentimentResponse } from "@/types";
import { API_URL } from "@env";

export class SentimentAdaper implements SentimentsDataSource {
  constructor(
    private httpPostClient: RemoteHttpPostClient<
      SentimentsParams,
      SentimentResponse
    >
  ) {}

  async postSentiments(formData: SentimentsParams): Promise<SentimentResponse> {
    const response = await this.httpPostClient.post({
      url: API_URL,
      body: formData,
      config: {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
    });

    return response.body;
  }
}
