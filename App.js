import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Button } from "react-native";
import CategoriesScreen from "./screens/Categories";
import FoodOverviewScreen from "./screens/FoodOverview";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import FoodDetail from "./screens/FoodDetail";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <>
      <StatusBar style="light" />
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerStyle: { backgroundColor: "#351401" },
            headerTintColor: "white",
            contentStyle: { backgroundColor: "#3f2f25" },
          }}
        >
          <Stack.Screen
            name="Foods Categories"
            component={CategoriesScreen}
            options={{
              title: "All Categories",
              // headerStyle: {backgroundColor: '#351401'},
              // headerTintColor: 'white',
              // contentStyle: {backgroundColor: '#3f2f25'}
            }}
          />
          <Stack.Screen
            name="Foods Overview"
            component={FoodOverviewScreen}
            // there is alternative
            // options={({route, navigation}) => {
          />
          <Stack.Screen name="foodDetail" component={FoodDetail} options={{title: 'Food Detail',}}/>
        </Stack.Navigator>
        {/* <CategoriesScreen /> */}
      </NavigationContainer>
    </>
  );
}

const styles = StyleSheet.create({
  container: {},
});
