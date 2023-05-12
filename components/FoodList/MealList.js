import { View, FlatList, StyleSheet } from "react-native";
import MealItem from "./MealItem";

function MealsList({ items}) {
  const renderMealItem = (itemData) => {
    const item = itemData.item;
    // console.log(item.id)
    const foodProps = {
      id: item.id,
      title: item.title,
      imageUrl: item.imageUrl,
      affordability: item.affordability,
      complexity: item.complexity,
      duration: item.duration,
    };
    // onPress={() => navHandler(item.id)}
    return <MealItem {...foodProps}/>;
  };
  return (
    <View style={styles.container}>
      <FlatList data={items} renderItem={renderMealItem} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
});

export default MealsList;
