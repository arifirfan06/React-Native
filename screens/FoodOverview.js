import { MEALS, CATEGORIES } from "../db/dummy-data";
import { View, Text, StyleSheet, FlatList, ScrollView } from "react-native";
// useRoute and useNavigation is great for nested components
// import { useRoute } from "@react-navigation/native";
import MealItem from "../components/MealItem";
import { useLayoutEffect } from "react";

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

  const navHandler = (id) => {
    console.log(id);
    navigation.navigate("foodDetail", { id });
  };

  // console.log(displayedMeals)
  const renderMealItem = (itemData) => {
    const item = itemData.item;
    // console.log(item.id)
    const foodProps = {
      title: item.title,
      imageUrl: item.imageUrl,
      affordability: item.affordability,
      complexity: item.complexity,
      duration: item.duration,
    };
    return <MealItem {...foodProps} onPress={() => navHandler(item.id)} />;
  };
  return (
    <View style={styles.container}>
      <FlatList data={displayedMeals} renderItem={renderMealItem} />
    </View>
  );
}
export default FoodOverviewScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
});
