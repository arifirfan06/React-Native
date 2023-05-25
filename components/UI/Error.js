import { View, Text, StyleSheet} from "react-native";
import { GlobalStyles } from "../../constant/styles";
import Button from "./Button";
function ErrorOverlay({message}) {
  return (
    <View style={styles.container}>
      <Text style={[styles.text,styles.title]}>An error occured!</Text>
      <Text style={styles.text}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 24,
        backgroundColor: GlobalStyles.colors.primary600
    },
    text: {
        color: 'black',
        textAlign: 'center',
        marginBottom: 8,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
})

export default ErrorOverlay