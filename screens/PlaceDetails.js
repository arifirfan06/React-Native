import { Image, ScrollView, Text, View, StyleSheet } from "react-native";
import OutlinedButton from "../components/UI/OutlinedButton";
import { Colors } from "../constant/color";
import { useEffect, useState } from "react";
import { fetchPlaceDetails, deletePlace } from "../utils/database";

function PlaceDetails({ route, navigation }) {
  const [fetchPlace, setFetch] = useState();
  function showOnMapHandler() {
    navigation.navigate("map", {
      initLat: fetchPlace.location.lat,
      initLng: fetchPlace.location.lng,
    });
  }
  const selectedPlaceId = route.params.placeId;

  async function deleteHandler(selectedPlaceId) {
    await deletePlace(selectedPlaceId)
    navigation.navigate('AllPlace')
  }

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
        <Text style={styles.label}> {fetchPlace.desc === '' && 'No '}Description</Text>
        {fetchPlace.desc === '' ? null : <View style={styles.descView}>
          <Text style={styles.desc}>{fetchPlace.desc}</Text>
        </View>}
        <View style={{flexDirection: 'row', marginTop: 15}}>
        <OutlinedButton icon="map" disabled onPress={showOnMapHandler}>
          View Map
        </OutlinedButton>
        <OutlinedButton icon="trash" onPress={async () => {await deletePlace(selectedPlaceId); navigation.navigate('AllPlace')}}>
          Delete
        </OutlinedButton>
      </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  descView: {
    marginHorizontal: 15,
    padding: 7,
    borderWidth: 2,
    borderColor: '#bbbfdc',
    borderRadius: 5,
    backgroundColor: '#585a69',
  },
  desc: {
    color: Colors.primary500
  },
  label: {
    fontWeight: "bold",
    marginVertical: 7,
    color: Colors.primary500,
  },
  fallback: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    height: "35%",
    minHeight: 250,
    width: "100%",
  },
  locationCtn: {
    justifyContent: "center",
    alignItems: "center",
  },
  addressCtn: {
    paddingTop: 10,
  },
  address: {
    color: Colors.primary500,
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default PlaceDetails;
