import {
  View,
  Text,
  StyleSheet,
  Alert,
  FlatList,
  Dimensions,
  useWindowDimensions,
} from "react-native";
import Title from "../components/ui/Title";
import { useEffect, useState } from "react";
import NUmberCtn from "../components/game/NumberContainer";
import PrimaryBtn from "../components/ui/PrimaryBtn";
import Card from "../components/ui/Card";
import GuideText from "../components/ui/guideText";
import { Ionicons } from "@expo/vector-icons";
import Color from "../constants/color";
import GuessLog from "../components/game/GuessLog";

const generateNumber = (min, max, expected) => {
  const randomNumber = Math.floor(Math.random() * (max - min)) + min;
  if (randomNumber === expected) {
    return generateNumber(min, max, expected);
  } else {
    return randomNumber;
  }
};

let minBoundary = 1;
let maxBoundary = 100;

const GameScreen = ({ userInput, makeItOver }) => {
  const initGuess = generateNumber(1, 100, userInput);
  const [currentGuess, setGuess] = useState(initGuess);
  const [guessRound, setRound] = useState([initGuess]);

  const { width } = useWindowDimensions();
  useEffect(() => {
    if (currentGuess === userInput) {
      makeItOver(guessRound.length);
    }
  }, [currentGuess, userInput, makeItOver]);

  useEffect(() => {
    minBoundary = 1;
    maxBoundary = 100;
  }, []);

  function nextNumberHandler(direction) {
    if (
      (direction == "lower" && currentGuess < userInput) ||
      (direction == "higher" && currentGuess > userInput)
    ) {
      Alert.alert("Liar!", "Please be honest...", [
        { text: "Sorry", style: "cancel" },
      ]);
      return;
    }
    if (direction == "lower") {
      maxBoundary = currentGuess;
    } else {
      minBoundary = currentGuess + 1;
    }
    console.log(minBoundary, maxBoundary);
    const randomNumber = generateNumber(minBoundary, maxBoundary, currentGuess);
    setGuess(randomNumber);
    setRound((current) => [randomNumber, ...current]);
  }

  const guessRoundLength = guessRound.length;

  let content = (
    <>
      <NUmberCtn>{currentGuess}</NUmberCtn>
      <Card>
        <GuideText extraStyle={styles.guideStyle}>Higher or Lower?</GuideText>

        <View style={styles.buttons}>
          <View style={styles.button}>
            <PrimaryBtn whenPress={nextNumberHandler.bind(this, "lower")}>
              <Ionicons name="md-remove" size={24} color={"white"} />
            </PrimaryBtn>
          </View>
          <View style={styles.button}>
            <PrimaryBtn whenPress={nextNumberHandler.bind(this, "higher")}>
              <Ionicons name="md-add" size={24} color={"white"} />
            </PrimaryBtn>
          </View>
        </View>
      </Card>
    </>
  );

  if (width > 500) {
    content = (
      <>
        <View style={styles.btnCtnLandscape}>
          <View style={styles.button}>
            <PrimaryBtn whenPress={nextNumberHandler.bind(this, "lower")}>
              <Ionicons name="md-remove" size={24} color={"white"} />
            </PrimaryBtn>
          </View>
          <NUmberCtn>{currentGuess}</NUmberCtn>
          <View style={styles.button}>
            <PrimaryBtn whenPress={nextNumberHandler.bind(this, "higher")}>
              <Ionicons name="md-add" size={24} color={"white"} />
            </PrimaryBtn>
          </View>
        </View>
      </>
    );
  }

  return (
    <View style={styles.screen}>
      <Title>This is Game Screen</Title>
      {content}
      <View style={styles.listCtn}>
        {/* {guessRound.map(guessR => <Text key={guessR}>{guessR}</Text>)} */}
        <FlatList
          data={guessRound}
          keyExtractor={(item) => item}
          renderItem={(itemData) => (
            <>
              {/* <Text> length {guessRoundLength} and index {itemData.index}</Text> */}
              <GuessLog
                roundNumber={guessRoundLength - itemData.index}
                guess={itemData.item}
              />
            </>
          )}
        />
      </View>
    </View>
  );
};
// Be carefull with using dimension make sure to know your target screen resolution
// const deviceWidth = Dimensions.get('window').width

const styles = StyleSheet.create({
  btnCtnLandscape: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  guideStyle: {
    marginBottom: 12,
  },
  screen: {
    flex: 1,
    padding: 20,
    alignItems: "center",
  },
  button: {
    flex: 1,
  },
  buttons: {
    flexDirection: "row",
  },
  listCtn: {
    flex: 1,
    padding: 16,
  },
});

export default GameScreen;
