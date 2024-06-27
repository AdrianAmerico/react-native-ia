import { SentimentResponse } from "@/types";

export type SentimentsParams = FormData;

export interface Sentiments {
  postSentiments(text: SentimentsParams): Promise<SentimentResponse>;
}
