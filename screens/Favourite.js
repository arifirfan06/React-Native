import { Text, View, StyleSheet } from "react-native";
import MealsList from "../components/FoodList/MealList";
import { ContextFav } from "../store/context/favourite";
import { useContext } from "react";
import { MEALS } from "../db/dummy-data";
import { useSelector } from "react-redux";

function FavouriteScreen() {
  // const favFoodId = useContext(ContextFav);
  const favFoodId = useSelector((state) => state.favList.ids)
  const favFoodList = MEALS.filter((item) => favFoodId.includes(item.id));

  //   console.log("the fav", favFoodList);

  if (favFoodList.length === 0) {
    return (
      <View style={styles.rootCtn}>
        <Text style={styles.text}>You have no favourite meals yet.</Text>
      </View>
    );
  }

  return <MealsList items={favFoodList} />;
}

const styles = StyleSheet.create({
    rootCtn: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white',
    }
});

export default FavouriteScreen;
