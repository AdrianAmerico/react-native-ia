import { faker } from "@faker-js/faker";
import { SentimentsParams } from "../use-cases/sentiments";
import { SentimentResponse } from "@/types";
import { sentiments } from "@/utils";

export const mockSentiments = (): SentimentsParams => {
  const formData = new FormData();

  formData.append("key", faker.lorem.word());
  formData.append("lang", faker.lorem.word());
  formData.append("txt", faker.lorem.sentence());

  return formData;
};

export const mockSentimentsResponse = (): SentimentResponse => ({
  subjectivity: faker.lorem.word(),
  agreement: faker.lorem.word(),
  confidence: faker.lorem.word(),
  irony: faker.lorem.word(),
  model: faker.lorem.word(),
  score_tag: sentiments.p.name as keyof typeof sentiments,
  sentence_list: [],
  sentimented_concept_list: [],
  sentimented_entity_list: [],
  status: {
    code: faker.lorem.word(),
    credits: faker.string.numeric(),
    msg: faker.lorem.sentence(),
    remaining_credits: faker.string.numeric(),
  },
});
