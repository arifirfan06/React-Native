import { View, Text, StyleSheet } from "react-native";
import { Colors } from "../constant/color";
import Button from "../components/UI/Button";
import { TextInput } from "react-native";
import { useState } from "react";
import axios from "axios";
import * as LocalAuthentication from 'expo-local-authentication';

function Auth({ onPress, question }) {
  const [enteredAnswer, setEnteredAnswer] = useState("");
  const [inputEmail, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [modeIsLogin, setMode] = useState(true);
  function changeHandler(text) {
    setEnteredAnswer(text);
  }
  function emailChangeHandler(text) {
    setEmail(text);
    console.log(text);
  }
  function bioScan() {
    LocalAuthentication.authenticateAsync().then(data => console.log('res bio', data))
  }
  async function submitHandler() {
    if (!inputEmail.includes("@")) {
      return setMessage("Pastikan menggunakan @ pada email");
    }
    if (enteredAnswer.length < 8) {
      return setMessage("panjang password minimal 8 karakter");
    }
    try {
      const enterUrl =
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAAFRXm7fY0YkyUW_sAkhxGwJdb_3Ldw5M";
      const body = {
        email: inputEmail,
        password: enteredAnswer,
        returnSecureToken: true,
      };
      const response = await axios.post(enterUrl, body);
      console.log("success", response);
      setMessage("Login Success");
      onPress("idontknow");
    } catch (err) {
      console.log(err);
      setMessage(err.response.data.error.message);
    }
    console.log("submitted");
  }
  async function regisHandler() {
    if (!inputEmail.includes("@")) {
      return setMessage("Pastikan menggunakan @ pada email");
    }
    if (enteredAnswer.length < 8) {
      return setMessage("panjang password minimal 8 karakter");
    }
    try {
      const enterUrl =
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAAFRXm7fY0YkyUW_sAkhxGwJdb_3Ldw5M';
      const body = {
        email: inputEmail,
        password: enteredAnswer,
        returnSecureToken: true,
      };
      const response = await axios.post(enterUrl, body);
      console.log(response)
      setMessage("Register Success");
    } catch (err) {
        setMessage(err.response.data.error.message);
    }
    console.log("submitted");
  }
  return (
    // <View style={styles.ctn}>
    //   <View style={styles.main}>
    //     <Text style={styles.text}>{question}</Text>
    //     <TextInput
    //       style={styles.input}
    //       secureTextEntry
    //       onChangeText={changeHandler}
    //       value={enteredAnswer}
    //     />
    //     <Button onPress={() => onPress(enteredAnswer)}>Enter</Button>
    //   </View>
    // </View>
    <View style={styles.ctn}>
      <View style={styles.main}>
        <Text style={styles.text}>Email</Text>
        <TextInput
          style={styles.input}
          onChangeText={emailChangeHandler}
          value={inputEmail}
          inputMode="email"
        />
        <Text style={styles.text}>Password</Text>
        <TextInput
          style={styles.input}
          secureTextEntry
          onChangeText={changeHandler}
          value={enteredAnswer}
        />
        <Text style={styles.text}>{message}</Text>
        {modeIsLogin ? (
          <Button onPress={submitHandler}>Login</Button>
        ) : (
          <Button onPress={regisHandler}>Register</Button>
        )}
        {modeIsLogin ? (
          <Button onPress={() => setMode(c => !c)}>Belum punya akun</Button>
        ) : (
          <Button onPress={() => setMode(c => !c)}>Sudah punya akun</Button>
        )}
        <Button onPress={bioScan}>Fingerprint</Button>
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
