import { View, Text, Pressable, Image, StyleSheet } from "react-native";
import MealDetailsItem from "../MealDetailsItem";
import { useNavigation } from "@react-navigation/native";
// displayy only for android
function MealItem({id, title, imageUrl, duration, complexity, affordability, }) {
  const navigate = useNavigation()
  const pressNavigate = () => {
    navigate.navigate("foodDetail", {id})
  }

  return (
    <View style={styles.mealItem}>
      <Pressable android_ripple={{ color: "#ccc" }} onPress={pressNavigate}>
        <View>
          <Image source={{ uri: imageUrl }} style={styles.image} />
          <Text style={styles.title}>{title}</Text>
        </View>
      <MealDetailsItem complexity={complexity} duration={duration} affordability={affordability}/>
        {/* <View style={styles.details}>
          <Text style={styles.detailItem}>{duration}</Text>
          <Text style={styles.detailItem}>{complexity.toUpperCase()}</Text>
          <Text style={styles.detailItem}>{affordability.toUpperCase()}</Text>
        </View> */}
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  mealItem: {
    margin: 16,
    borderRadius: 8,
    overflow: "hidden",
    backgroundColor: "white",
    elevation: 4,
  },
  image: {
    width: "100%",
    height: 200,
  },
  title: {
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 18,
  },
});

export default MealItem;
