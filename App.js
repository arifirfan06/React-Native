import { StyleSheet, ImageBackground, SafeAreaView } from "react-native";
import StartGame from "./screens/StartGame";
import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import GameScreen from "./screens/GameScreen";
import Color from "./constants/color";
import GameOver from "./screens/GameOver";
import { useFonts } from "expo-font";
import AppLoading from "expo-app-loading";
import { StatusBar } from "expo-status-bar";

export default function App() {
  const [userNumber, setUserNumber] = useState(null);
  const [gameOver, setGameOver] = useState(false);
  const [currentRound, setRound] = useState(0);

  const [fontsLoaded] = useFonts({
    "open-sans": require("./assets/fonts/OpenSans-Regular.ttf"),
    "open-Bo": require("./assets/fonts/OpenSans-Bold.ttf"),
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  function setGame(rounds) {
    setGameOver(true);
    setRound(rounds);
  }

  const startNewGame = () => {
    setUserNumber(null);
    setRound(0);
    setGameOver(false);
  };

  let screen = <StartGame theNumber={(number) => setUserNumber(number)} />;

  if (userNumber) {
    screen = <GameScreen userInput={userNumber} makeItOver={setGame} />;
  }

  if (gameOver && userNumber) {
    screen = (
      <GameOver
        userNumber={userNumber}
        rounds={currentRound}
        onRestart={startNewGame}
      />
    );
  }

  return (
    <>
      <StatusBar style="light"/>
      <LinearGradient
        colors={[Color.mainLinear, Color.secondLinear]}
        style={styles.mainBg}
      >
        <ImageBackground
          source={require("./assets/images/backgroundDice.png")}
          resizeMode="cover"
          style={styles.mainBg}
          imageStyle={styles.bgImg}
        >
          <SafeAreaView style={styles.mainBg}>{screen}</SafeAreaView>
        </ImageBackground>
      </LinearGradient>
    </>
  );
}

const styles = StyleSheet.create({
  mainBg: {
    flex: 1,
  },
  bgImg: {
    opacity: 0.2,
  },
});
