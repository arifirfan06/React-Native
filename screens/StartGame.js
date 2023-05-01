import { TextInput, View, Text, StyleSheet, Alert } from "react-native";
import PrimaryBtn from "../components/ui/PrimaryBtn";
import { useState } from "react";
import Color from "../constants/color";
import Title from "../components/ui/Title";
import Card from "../components/ui/Card";
import GuideText from "../components/ui/guideText";

const StartGame = ({theNumber}) => {
  const [number, changeNumber] = useState("");

  const changeTextHandler = (event) => {
    changeNumber(event)
  }

  const resetHandler = () => {
    changeNumber('')
  }

  const confirmHandler = () => {
    const chosenNumber = +number
    if (isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99) {
      Alert.alert('Invalid Number', 'Make sure you write correct number between 1 - 99', [{text: 'Okay', style: 'destructive', onPress:resetHandler }] )
      // this return statement to make sure the code execution stop here
      return;
    }
    console.log('number is valid', chosenNumber)
    theNumber(chosenNumber)
  }

  return (
    <View style={styles.rootContainer}>
      <Title>Guess the Number</Title>
    <Card>
      <GuideText>Enter a Number</GuideText>
      <TextInput
        style={styles.numberInput}
        keyboardType="number-pad"
        maxLength={2}
        // this 2 props bellow can be quite helpfull and make ux less annoying
        autoCapitalize="none"
        autoCorrect={false}
        value={number}
        onChangeText={changeTextHandler}
      />
      <View style={styles.buttons}>
        <View style={styles.button}>
          <PrimaryBtn whenPress={resetHandler}>Reset</PrimaryBtn>
        </View>
        <View style={styles.button}>
          <PrimaryBtn whenPress={confirmHandler}>Confirm</PrimaryBtn>
        </View>
      </View>
    </Card>
    </View>
  );
};

export default StartGame;

const styles = StyleSheet.create({

  rootContainer: {
    flex: 1,
    marginTop: 100,
    alignItems: 'center'
  },
  button: {
    flex: 1,
  },
  buttons: {
    flexDirection: "row",
  },
  inputContainer: {
    // flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    marginTop: 40,
    backgroundColor: Color.descCtnColor,
    marginHorizontal: 24,
    borderRadius: 8,
    // android
    elevation: 9,
    // IOS
    shadowColor: "black",
    shadowOffset: { width: 0, height: 4 },
    // how much the shadow expand
    shadowRadius: 6,
    shadowOpacity: 1,
  },
  numberInput: {
    height: 50,
    width: 50,
    textAlign: "center",
    justifyContent: "center",
    fontSize: 32,
    borderBottomColor: Color.accent500,
    // make sure to declare borderBottomWidth to show the customization above
    borderBottomWidth: 3,
    color: Color.accent500,
    marginVertical: 8,
    fontWeight: "bold",
  },
});
