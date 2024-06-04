import { useState } from "react";
import {
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { styles } from "./styles";
import { Sentiments } from "../../components/sentiments";
import { Sentiment } from "../../utils/sentiments";
import axios from "axios";
import { SentimentResponse } from "../../types";
import { API_KEY } from "@env";

export const Home = () => {
  const [score, setScore] = useState<Sentiment | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSendMessage = async () => {
    try {
      setIsLoading(true);

      const formData = new FormData();

      formData.append("key", API_KEY);
      formData.append("txt", message);
      formData.append("lang", "pt");

      const response = await axios.post<SentimentResponse>(
        "https://api.meaningcloud.com/sentiment-2.1",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setScore(response.data.score_tag);
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mensagem</Text>

      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Digite sua mensagem..."
          onChangeText={setMessage}
          multiline
        />

        <TouchableOpacity
          style={styles.button}
          activeOpacity={0.7}
          disabled={isLoading}
          onPress={handleSendMessage}
        >
          {isLoading ? (
            <ActivityIndicator color={"#fff"} />
          ) : (
            <Text>
              <FontAwesome name="send" size={24} color="#fff" />
            </Text>
          )}
        </TouchableOpacity>
      </View>

      {score && <Sentiments score={score} />}
    </View>
  );
};
