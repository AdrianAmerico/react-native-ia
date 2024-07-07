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
import { API_KEY } from "@env";
import { useRemoteSentiments } from "@/domain/use-cases/remote-sentiments";
import "reflect-metadata";

export const Home = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const { score, postSentiments } = useRemoteSentiments();

  const handleSendMessage = async () => {
    try {
      setIsLoading(true);

      const formData = new FormData();

      formData.append("key", API_KEY);
      formData.append("txt", message);
      formData.append("lang", "pt");

      await postSentiments(formData);
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
