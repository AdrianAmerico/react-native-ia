import { SentimentResponse } from "@/types";

export interface SentimentsParams {
  text: string;
}

export interface Sentiments {
  postSentiments(text: SentimentsParams): Promise<SentimentResponse>;
}
