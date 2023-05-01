import { StyleSheet } from "react-native";
import { Text, View, Pressable } from "react-native";

export default GoalItem = (props) => {
  const { list } = props;
  const testBind = () => {
    console.log("BIND?");
  };
  return (
    <View style={styles.goals}>
      <Pressable
        onPress={props.rmHandler.bind(this, list)}
        android_ripple={{ color: "#dddddd" }}
        style={({pressed}) => pressed && styles.pressedItem} // simmilar to android_ripple, this used in IOS
      >
        <Text style={styles.goalText}>{list.text}</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  goals: {
    backgroundColor: "#71ce61",
    margin: 8,
    borderRadius: 6,
  },
  goalText: {
    color: "white",
    padding: 8,
  },
  pressedItem: {
    opacity: 0.5,
  }
});
