import { Sentiment } from "../utils/sentiments";

export interface SentimentResponse {
  agreement: string;
  confidence: string;
  irony: string;
  model: string;
  score_tag: Sentiment;
  sentence_list: SentenceList[];
  sentimented_concept_list: any[];
  sentimented_entity_list: any[];
  status: Status;
  subjectivity: string;
}

export interface SentenceList {
  agreement: string;
  bop: string;
  confidence: string;
  endp: string;
  inip: string;
  score_tag: string;
  segment_list: SegmentList[];
  sentimented_concept_list: any[];
  sentimented_entity_list: any[];
  text: string;
}

export interface SegmentList {
  agreement: string;
  confidence: string;
  endp: string;
  inip: string;
  polarity_term_list: PolarityTermList[];
  score_tag: string;
  segment_type: string;
  text: string;
}

export interface PolarityTermList {
  confidence: string;
  endp: string;
  inip: string;
  score_tag: string;
  text: string;
}

export interface Status {
  code: string;
  msg: string;
  credits: string;
  remaining_credits: string;
}
