import { Text, View } from "react-native";
import { SentimentObject } from "@/domain/sentiments/sentiments";
import { styles } from "./styles";

interface SentimentsProps {
  score: SentimentObject;
}

export const Sentiments = ({ score }: SentimentsProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.emoji}>{score.emoji}</Text>

      <Text style={styles.sentiment}>{score.name}</Text>
    </View>
  );
};
