import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Button } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AllPlaces from "./screens/AllPlaces";
import AddPlace from "./screens/AddPlace";
import IconBtn from "./components/UI/IconBtn";
import { Colors } from "./constant/color";
import Map from "./screens/Map";
import { useEffect, useState } from "react";
import { init, unInit } from "./utils/database";
import AppLoading from "expo-app-loading";
import PlaceDetails from "./screens/PlaceDetails";
import Auth from "./screens/Auth";
import {GestureHandlerRootView} from "react-native-gesture-handler";

const Stack = createNativeStackNavigator();

export default function App() {
  const [dbInit, setDbInit] = useState(false);
  const [entered, setEntered] = useState(false);
  useEffect(() => {
    init()
      .then(() => {
        setDbInit(true);
      })
      .catch((err) => {
        // console.log("ini error", err);
      });
  }, []);

  // if (!dbInit) {
  //   return <AppLoading />;
  // }

  if (!entered) {
    const question = "Whats the most important thing you want to treasure?";
    const answer = "idontknow";
    function validate(input) {
      if (answer === input) {
        return setEntered(true);
      }
    }
    return (
      <>
        <StatusBar style="light" />
        <Auth
          question={question}
          onPress={(inputAnswer) => validate(inputAnswer)}
        />
      </>
    );
  }

  return (
    <>
      <GestureHandlerRootView style={{flex: 1}}>
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
                title: "Living Reminisce",
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
              options={{ title: "Add New Memo" }}
            />
            {/* map route has header button that created in the Map component */}
            <Stack.Screen name="map" component={Map} />
            <Stack.Screen
              name="PlaceDetails"
              component={PlaceDetails}
              options={{ title: "Loading Memo..." }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </GestureHandlerRootView>
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
