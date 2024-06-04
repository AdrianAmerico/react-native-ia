export const sentiments = {
  "P+": {
    emoji: "😁",
    name: "Muito Positivo",
  },
  p: {
    emoji: "😊",
    name: "Positivo",
  },
  NEU: {
    emoji: "😐",
    name: "Neutro",
  },
  N: {
    emoji: "😕",
    name: "Negativo",
  },
  "N+": {
    emoji: "😡",
    name: "Muito Negativo",
  },
  NONE: {
    emoji: "🤔",
    name: "Indefinido",
  },
};

export type Sentiment = keyof typeof sentiments;
