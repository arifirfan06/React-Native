import { MEALS, CATEGORIES } from "../db/dummy-data";
import { View, Text, StyleSheet, FlatList, ScrollView } from "react-native";
// useRoute and useNavigation is great for nested components
// import { useRoute } from "@react-navigation/native";
import MealItem from "../components/FoodList/MealItem";
import { useLayoutEffect } from "react";
import MealsList from "../components/FoodList/MealList";

function FoodOverviewScreen({ route, navigation }) {
  const ctgId = route.params.categoryId;

  // index of return of index in array then filter will pick data object in this case that return true
  const displayedMeals = MEALS.filter((item) => {
    return item.categoryIds.indexOf(ctgId) >= 0;
  });

  useLayoutEffect(() => {
    const ctgTitle = CATEGORIES.find((category) => category.id === ctgId).title;
    navigation.setOptions({
      title: ctgTitle,
    });
  }, [ctgId, navigation]);

  // const navHandler = (id) => {
  //   console.log(id);
  //   navigation.navigate("foodDetail", { id });
  // };

  return <MealsList items={displayedMeals}/>

}
export default FoodOverviewScreen;

