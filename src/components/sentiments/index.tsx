import { Text, View } from "react-native";
import { styles } from "./styles";
import { Sentiment, sentiments } from "@/utils";

interface SentimentsProps {
  score: Sentiment;
}

export const Sentiments = ({ score }: SentimentsProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.emoji}>{sentiments[score ?? "NONE"]?.emoji}</Text>

      <Text style={styles.sentiment}>{sentiments[score ?? "NONE"]?.name}</Text>
    </View>
  );
};
