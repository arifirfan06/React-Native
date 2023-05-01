import { View, Text, Pressable, StyleSheet } from "react-native";
import Color from '../../constants/color'

const PrimaryBtn = ({ children, whenPress }) => {
  const pressHandler = () => {};

  return (
    // adding ripple effect can be complicated because it need restyling and restructuring
    <View style={styles.outerContainer}>
      <Pressable
        onPress={whenPress}
        android_ripple={{ color: Color.primaryRipple }}
        style={({pressed}) => pressed ? [styles.pressed, styles.innerContainer] : styles.innerContainer}
      >
        <Text style={styles.btnText}>{children}</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  // this used for fixing styling issue in ripple effect, move pressable inside View and add separate container with inner and outer
  outerContainer: {
    borderRadius: 20,
    margin: 5,
    overflow: "hidden",
  },
  innerContainer: {
    backgroundColor: Color.primary500,
    paddingVertical: 8,
    paddingHorizontal: 16,
    elevation: 3,
  },
  btnText: {
    color: "white",
    textAlign: "center",
  },
  pressed: {
    opacity: 0.7,

  },
});

export default PrimaryBtn;
