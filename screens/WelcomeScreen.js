import { StyleSheet, Text, View } from "react-native";
import axios from "axios";
import { AuthCtx } from "../store/authCtx";
import { useEffect, useState, useContext } from "react";

function WelcomeScreen() {
  const [message, setMessage] = useState('')
  const {token} = useContext(AuthCtx)
  useEffect(() => {
    // used to fetch protected data with uid/token
    async function fetchProtected() {
      const response = await axios.get(
        `https://expense-app-react-native-default-rtdb.asia-southeast1.firebasedatabase.app/protected.json?auth=${token}`
      );
      console.log(response.data)
      setMessage(response.data)
    }
    fetchProtected()
  }, [token]);

  return (
    <View style={styles.rootContainer}>
      <Text style={styles.title}>Welcome!</Text>
      <Text>You authenticated successfully!</Text>
      <Text>{message}</Text>
    </View>
  );
}

export default WelcomeScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 32,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
  },
});
