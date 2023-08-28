import { Pressable, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../../constant/color";

function OutlinedButton({icon, children, ...props }) {
  return (
    <Pressable
      style={({ pressed }) => [styles.button,icon === 'map' && {borderColor: "#bbbfdc"}, pressed && styles.pressed]}
      // onPress={onPress}
      {...props}
    >
      <Ionicons
        style={styles.icon}
        name={icon}
        size={18}
        color={icon === 'map'? "#bbbfdc" : Colors.primary500}
      />
      <Text style={[styles.text, icon === 'map' && {color: "#bbbfdc"}]}>{children}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    margin: 4,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: Colors.primary500,
  },
  pressed: {
    opacity: 0.7,
  },
  text: {
    color: Colors.primary500,
  },
  icon: {
    marginRight: 6,
  },
});

export default OutlinedButton;
