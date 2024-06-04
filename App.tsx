import { StatusBar } from "expo-status-bar";
import { Home } from "./src/screens/home";

export default function App() {
  return (
    <>
      <StatusBar style="dark" backgroundColor="transparent" translucent />

      <Home />
    </>
  );
}
