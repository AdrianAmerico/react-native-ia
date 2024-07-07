import { SentimentsParams } from "@/domain/use-cases";
import { RemoteHttpPostClient } from "@/domain/use-cases/http-post-client";
import { SentimentResponse } from "@/types";
import { API_URL } from "@env";

export const postSentiments = async (formData: FormData) => {
  const httpPostClient = new RemoteHttpPostClient<
    SentimentsParams,
    SentimentResponse
  >();

  return await httpPostClient.post({
    url: API_URL,
    body: formData,
    config: {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    },
  });
};
