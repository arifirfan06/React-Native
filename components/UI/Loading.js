import { View, ActivityIndicator, StyleSheet } from "react-native";
import { GlobalStyles } from "../../constant/styles";
function LoadingOverlay() {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="black" />
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
    }
})

export default LoadingOverlay