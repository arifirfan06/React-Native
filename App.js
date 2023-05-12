import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Button } from "react-native";
import CategoriesScreen from "./screens/Categories";
import FoodOverviewScreen from "./screens/FoodOverview";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import FoodDetail from "./screens/FoodDetail";
import { createDrawerNavigator } from "@react-navigation/drawer";
import FavouriteScreen from "./screens/Favourite";
import IconBtn from "./components/IconBtn";
import { Provider } from "react-redux";
import { store } from "./store/redux/store";
// import FavProvider from './store/context/favourite'

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

function DrawerScreen() {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: "#351401" },
        headerTintColor: "white",
        sceneContainerStyle: { backgroundColor: "#3f2f25" },
        drawerContentStyle: { backgroundColor: "#351401" },
        drawerInactiveTintColor: "white",
        drawerActiveTintColor: "#351401",
        drawerActiveBackgroundColor: "#e4baa1",
      }}
    >
      <Drawer.Screen
        name="All Categories"
        component={CategoriesScreen}
        options={{
          drawerIcon: ({ color, size }) => (
            <IconBtn color={color} name="list" size={size} />
          ),
        }}
      />
      <Drawer.Screen
        name="Fav"
        component={FavouriteScreen}
        options={{
          drawerIcon: ({ color, size }) => (
            <IconBtn color={color} name="star" size={size} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
}

function App() {
  return (
    <>
      <StatusBar style="light" />
      <Provider store={store}>
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
            component={DrawerScreen}
            options={{
              // title: "All Categories",
              headerShown: false,
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
          <Stack.Screen
            name="foodDetail"
            component={FoodDetail}
            options={{ title: "Food Detail" }}
          />
        </Stack.Navigator>
        {/* <CategoriesScreen /> */}
      </NavigationContainer>
      </Provider>
      </>
  );
}

const styles = StyleSheet.create({
  container: {},
});

export default App;
