import { useState } from "react";
import { SentimentsParams } from "@/domain/use-cases";
import { Sentiment, SentimentObject } from "../sentiments/sentiments";
import { RemoteHttpPostClient } from "./http-post-client";
import { SentimentAdaper } from "@/data/adapter/sentiments.adapter";

export const useRemoteSentiments = () => {
  const [score, setScore] = useState<SentimentObject>(null);
  const [isLoading, setIsLoading] = useState(false);

  const postSentiments = async (formData: SentimentsParams) => {
    try {
      setIsLoading(true);

      const sentiments = new Sentiment(
        new SentimentAdaper(new RemoteHttpPostClient())
      );

      const response = await sentiments.postSentiments(formData);

      setScore(response);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return { score, isLoading, postSentiments };
};
