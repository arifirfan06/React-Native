import { Text, View, StyleSheet } from "react-native";

function Subtitle({children}) {
  return (
    <View style={styles.subCtn}>
      <Text style={styles.subtitle}>{children}</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  subtitle: {
    color: "#e2b497",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  subCtn: {
    marginHorizontal: 12,
    marginVertical: 4,
    borderBottomWidth: 2,
    borderBottomColor: "#e2b497",
    padding: 6,
  },
});
export default Subtitle;
