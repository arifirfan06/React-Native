import { Text, Image, View, StyleSheet } from "react-native";
import Title from "../components/ui/Title";
import Color from "../constants/color";
import PrimaryBtn from "../components/ui/PrimaryBtn";
const GameOver = ({ rounds, userNumber, onRestart }) => {
  return (
    <View style={styles.rootCtn}>
      <Title>Game Is Over</Title>
      <View style={styles.ImgCtn}>
        <Image
          style={styles.img}
          source={require("../assets/images/success.png")}
        />
      </View>
      <Text style={styles.summaryText}>
        Your phone need <Text style={styles.highlight}>{rounds}</Text> round to
        guess the number <Text style={styles.highlight}>{userNumber}</Text>
      </Text>
      <PrimaryBtn whenPress={onRestart}>Start New Game</PrimaryBtn>
    </View>
  );
};

const styles = StyleSheet.create({
  summaryText: {
    fontFamily: "open-sans",
    fontSize: 24,
    textAlign: "center",
    marginVertical: 24,
  },
  highlight: {
    fontFamily: "open-Bo",
    color: Color.primary500,
  },
  rootCtn: {
    flex: 1,
    padding: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  ImgCtn: {
    width: 300,
    height: 300,
    borderRadius: 150,
    borderWidth: 3,
    borderColor: Color.primaryRipple,
    overflow: "hidden",
    margin: 36,
  },
  img: {
    width: "100%",
    height: "100%",
  },
});

export default GameOver;
