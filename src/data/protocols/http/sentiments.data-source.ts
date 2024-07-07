import { SentimentResponse } from "@/types";

export type SentimentsParams = FormData;

export interface SentimentsDataSource {
  postSentiments(text: SentimentsParams): Promise<SentimentResponse>;
}
