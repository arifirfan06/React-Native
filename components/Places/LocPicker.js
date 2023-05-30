import { View, StyleSheet, Alert, Text } from "react-native";
import OutlinedButton from "../UI/OutlinedButton";
import { Colors } from "../../constant/color";
import {
  useNavigation,
  useRoute,
  useIsFocused,
} from "@react-navigation/native";
import {
  getCurrentPositionAsync,
  useForegroundPermissions,
  PermissionStatus,
  requestForegroundPermissionsAsync,
} from "expo-location";
import { useEffect, useState } from "react";

function LocPicker({onTakeLoc}) {
  // useIsFocused will return true if you are in addPlace screen which is parrent of this component
  // it will return false if you are in Map screen or other screen component
  // this happen because navigating/moving in stack navigation doesnt recreate its component but reserved and put it on top
  const isFocused = useIsFocused();
  const route = useRoute();
  const [pickedLoc, setPicked] = useState();
  console.log(pickedLoc);
  const { navigate } = useNavigation();

  useEffect(() => {
    if (isFocused, route) {
      const mapPickedLoc = route.params
        ? { lat: route.params.pickedLat, lng: route.params.pickedLng }
        : null;
      setPicked(mapPickedLoc);
    }
  }, [route, isFocused]);

  useEffect(() => {
    onTakeLoc(pickedLoc)
    console.log('picked')
  }, [pickedLoc, onTakeLoc])


  console.log('looped?')
  async function verivyPermission() {
    const [locPermissionObj, reqPermission] = useForegroundPermissions();
    if (locPermissionObj.status === PermissionStatus.UNDETERMINED) {
      const permissionResponse = await reqPermission();

      return permissionResponse.granted;
    }
    if (locPermissionObj.status === PermissionStatus.DENIED) {
      Alert.alert(
        "Insuffisient Permission",
        "Please Grant Location permission to use the app"
      );
      return false;
    }
    return true;
  }

  async function getLocHandler() {
    const { status } = await requestForegroundPermissionsAsync();
    if (status !== "granted") {
      console.log("Location permission denied");
      return;
    }

    const locAuto = await getCurrentPositionAsync();
    setPicked({ lat: locAuto.coords.latitude, lng: locAuto.coords.longitude });
  }
  function pickOnMapHandler() {
    navigate("map");
  }
  return (
    <View>
      <View style={styles.mapPrev}>
        {pickedLoc && <Text>Your location latitude is {pickedLoc.lat} and the longitude is {pickedLoc.lng}</Text>}
      </View>
      <View style={styles.actions}>
        <OutlinedButton icon="location" onPress={getLocHandler}>
          Locate User
        </OutlinedButton>
        <OutlinedButton icon="map" onPress={pickOnMapHandler}>
          Pick on map
        </OutlinedButton>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mapPrev: {
    width: "100%",
    height: 200,
    marginVertical: 8,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.primary100,
    borderRadius: 4,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
});

export default LocPicker;
