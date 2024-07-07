import { SentimentsDataSource } from "../use-cases";
import { sentimentsList } from "./sentiment-list";

export class Sentiment {
  constructor(private dataSource: SentimentsDataSource) {}

  public postSentiments = async (formData: FormData) => {
    const response = await this.dataSource.postSentiments(formData);

    return sentimentsList[response.score_tag];
  };
}

export interface SentimentObject {
  emoji: string;
  name: string;
}
