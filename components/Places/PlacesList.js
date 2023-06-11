import { FlatList, StyleSheet, Text, View } from "react-native";
import { Colors } from "../../constant/color";

import PlaceItem from "./PlaceItem";
import { useNavigation } from "@react-navigation/native";

function PlacesList({ places }) {
  const {navigate} = useNavigation()

  function selectPlaceHandler(id) {
    navigate('PlaceDetails', {placeId: id})
  }

  if (!places || places.length === 0) {
    return (
      <View style={styles.fallbackContainer}>
        <Text style={styles.fallbackText}>
          No memo added yet - start treasure your cherished memories!
        </Text>
      </View>
    );
  }



  return (
    <FlatList
      style={styles.list}
      data={places}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <PlaceItem place={item} onSelect={selectPlaceHandler}/>}
    />
  );
}

export default PlacesList;

const styles = StyleSheet.create({
  list: {
    margin: 24,
  },
  fallbackContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    color: "#",
  },
  fallbackText: {
    fontSize: 16,
    color: Colors.primary200,
  },
});
