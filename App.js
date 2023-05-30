import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AllPlaces from "./screens/AllPlaces";
import AddPlace from "./screens/AddPlace";
import IconBtn from "./components/UI/IconBtn";
import { Colors } from "./constant/color";
import Map from "./screens/Map";
import { useEffect, useState } from "react";
import { init } from "./utils/database";
import AppLoading from "expo-app-loading";
import PlaceDetails from "./screens/PlaceDetails";

const Stack = createNativeStackNavigator();

export default function App() {
  const [dbInit, setDbInit] = useState(false);
  useEffect(() => {
    init()
      .then(() => {
        setDbInit(true);
      })
      .catch((err) => {
        console.log("ini error", err);
      });
  }, []);

  if (!dbInit) {
    return <AppLoading />;
  }

  return (
    <>
      <StatusBar style="dark" />
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerStyle: { backgroundColor: Colors.primary500 },
            headerTintColor: Colors.gray700,
            contentStyle: { backgroundColor: Colors.gray700 },
          }}
        >
          <Stack.Screen
            name="AllPlace"
            component={AllPlaces}
            options={({ navigation }) => ({
              title: "Fav Places",
              headerRight: ({ tintColor }) => (
                <IconBtn
                  name="add"
                  size={24}
                  color={tintColor}
                  onPress={() => navigation.navigate("addPlace")}
                />
              ),
            })}
          />
          <Stack.Screen
            name="addPlace"
            component={AddPlace}
            options={{ title: "Add New Place" }}
          />
          {/* map route has header button that created in the Map component */}
          <Stack.Screen name="map" component={Map} />
          <Stack.Screen
            name="PlaceDetails"
            component={PlaceDetails}
            options={{ title: "Loading Place..." }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//     alignItems: "center",
//     justifyContent: "center",
//   },
// });
