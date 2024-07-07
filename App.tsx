import { StatusBar } from "expo-status-bar";
import { Home } from "./src/screens/home";
import "reflect-metadata";

export default function App() {
  return (
    <>
      <StatusBar style="dark" backgroundColor="transparent" translucent />

      <Home />
    </>
  );
}
