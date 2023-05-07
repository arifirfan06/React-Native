import { Text, View, Image, StyleSheet, ScrollView, Button } from "react-native";
import { MEALS } from "../db/dummy-data";
import IconBtn from "../components/IconBtn";
import MealDetailsItem from "../components/MealDetailsItem";
import Subtitle from "../components/detail/Subtitle";
import List from "../components/detail/List";
import { useLayoutEffect } from "react";
const FoodDetail = ({ route, navigation }) => {
  const mealId = route.params.id;
  const selectedMeal = MEALS.find((item) => item.id === mealId);
  const favHandler = () => {
    console.log('Pressed', mealId)
  }
  useLayoutEffect(() => {
    navigation.setOptions({headerRight: () => <IconBtn onPress={favHandler}/>})
  }, [])
  return (
    <ScrollView style={styles.rootCtn}>
      <Image style={styles.image} source={{ uri: selectedMeal.imageUrl }} />
      <Text style={styles.title}>{selectedMeal.title}</Text>
      <MealDetailsItem
        complexity={selectedMeal.complexity}
        duration={selectedMeal.duration}
        affordability={selectedMeal.affordability}
        textStyle={styles.detailText}
      />
      <View style={styles.listOuterCtn}>
        <View style={styles.listCtn}>
          <Subtitle>Ingredients</Subtitle>
          <List data={selectedMeal.ingredients} />
          <Subtitle>Steps</Subtitle>
          <List data={selectedMeal.steps} />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  rootCtn: {
    marginBottom: 30,
  },
  image: {
    width: "100%",
    height: 350,
  },
  title: {
    fontWeight: "bold",
    fontSize: 24,
    margin: 8,
    textAlign: "center",
    color: "white",
  },
  detailText: {
    color: "white",
  },
  subtitle: {
    color: "#e2b497",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  subCtn: {
    marginHorizontal: 24,
    marginVertical: 4,
    borderBottomWidth: 2,
    borderBottomColor: "#e2b497",
    padding: 6,
  },
  listCtn: {
    width: "80%",
  },
  listOuterCtn: {
    alignItems: "center",
  },
});

export default FoodDetail;
