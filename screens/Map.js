import { useLayoutEffect, useState, useCallback } from "react";
import MapView, { Marker } from "react-native-maps";
import IconBtn from "../components/UI/IconBtn";
import { Alert } from "react-native";

function Map({ navigation, route }) {

  const initialLoc = route.params && {
    lat: route.params.initLat,
    lng: route.params.initLng,
  }

  const [selectedLoc, setLoc] = useState(initialLoc);

    const region = {
    latitude: initialLoc ? initialLoc.lat : -7.5227506,
    longitude: initialLoc ? initialLoc.lng :  110.9059127,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0411,
  };

  function selectLocationHandler(event) {
    if (initialLoc) {
      return;
    }
    const lat = event.nativeEvent.coordinate.latitude;
    const lng = event.nativeEvent.coordinate.longitude;
    setLoc({ lat: lat, lng: lng });
  }

  const savePickedLoc = useCallback(() => {
    if (!selectedLoc) {
      Alert.alert("No location picked", "you have to pick a location");
      return;
    }
    navigation.navigate('addPlace', {
      pickedLat: selectedLoc.lat,
      pickedLng: selectedLoc.lng,
    });
  }, [navigation, selectedLoc]);
    useLayoutEffect(() => {
      if(initialLoc) {
        return;
      }
      navigation.setOptions({
        headerRight: ({ tintColor }) => (
          <IconBtn
            name="save"
            size={24}
            color={tintColor}
            onPress={savePickedLoc}
          />
        ),
      });
    }, [navigation, savePickedLoc, initialLoc]);
  return (
    <MapView
      style={{ flex: 1 }}
      initialRegion={region}
      onPress={selectLocationHandler}
    >
      {selectedLoc && (
        <Marker
          coordinate={{ latitude: selectedLoc.lat, longitude: selectedLoc.lng }}
        />
      )}
    </MapView>
  );
}

export default Map;
