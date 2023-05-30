import { Image, ScrollView, Text, View, StyleSheet } from "react-native";
import OutlinedButton from "../components/UI/OutlinedButton";
import { Colors } from "../constant/color";
import { useEffect, useState } from "react";
import { fetchPlaceDetails } from "../utils/database";

function PlaceDetails({ route, navigation }) {
  const [fetchPlace, setFetch] = useState();
  function showOnMapHandler() {
    navigation.navigate("map", {
      initLat: fetchPlace.location.lat,
      initLng: fetchPlace.location.lng,
    });
  }
  const selectedPlaceId = route.params.placeId;

  useEffect(() => {
    async function loadPlaceData() {
      const placeData = await fetchPlaceDetails(selectedPlaceId);
      setFetch(placeData);
      navigation.setOptions({
        title: placeData.title,
      });
    }
    loadPlaceData();
  }, [selectedPlaceId]);

  if (!fetchPlace) {
    return (
      <View style={styles.fallback}>
        <Text>Loading Place Data...</Text>
      </View>
    );
  }

  return (
    <ScrollView>
      <Image style={styles.image} source={{ uri: fetchPlace.imageUri }} />
      <View style={styles.locationCtn}>
        <View style={styles.addressCtn}>
          <Text style={styles.address}>
            The latitude {fetchPlace.location.lat} The Longitude {fetchPlace.location.lng}
          </Text>
        </View>
        <OutlinedButton icon="map" onPress={showOnMapHandler}>
          View Map
        </OutlinedButton>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  fallback: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    height: "35%",
    minHeight: 300,
    width: "100%",
  },
  locationCtn: {
    justifyContent: "center",
    alignItems: "center",
  },
  addressCtn: {
    padding: 20,
  },
  address: {
    color: Colors.primary500,
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default PlaceDetails;
