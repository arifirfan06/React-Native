import { View, Text, StyleSheet } from "react-native";
import { Colors } from "../constant/color";
import Button from "../components/UI/Button";
import { TextInput } from "react-native";
import { useState } from "react";

function Auth({ onPress, question }) {
  const [enteredAnswer, setEnteredAnswer] = useState('')
  function changeHandler(text) {
    setEnteredAnswer(text)
  }
  return (
    <View style={styles.ctn}>
      <View style={styles.main}>
        <Text style={styles.text}>{question}</Text>
        <TextInput
          style={styles.input}
          secureTextEntry
          onChangeText={changeHandler}
          value={enteredAnswer}
        />
        <Button onPress={() => onPress(enteredAnswer)}>Enter</Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  ctn: {
    flex: 1,
    backgroundColor: Colors.gray700,
    justifyContent: "center",
  },
  text: {
    color: Colors.primary200,
  },
  main: {
    marginHorizontal: 30,
  },
  input: {
    marginVertical: 8,
    marginHorizontal: 4,
    padding: 5,
    fontSize: 16,
    borderBottomColor: Colors.primary700,
    borderBottomWidth: 2,
    backgroundColor: Colors.primary100,
    borderRadius: 4,
  },
});

export default Auth;
