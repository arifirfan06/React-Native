import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import { useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import LoginScreen from "./screens/LoginScreen";
import SignupScreen from "./screens/SignupScreen";
import WelcomeScreen from "./screens/WelcomeScreen";
import { Colors } from "./constants/styles";
import { AuthCtxProvider, AuthCtx } from "./store/authCtx";
import IconButton from "./components/ui/IconButton";
import AppLoading from "expo-app-loading";

const Stack = createNativeStackNavigator();

function AuthStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: Colors.primary500 },
        headerTintColor: "white",
        contentStyle: { backgroundColor: Colors.primary100 },
      }}
    >
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
    </Stack.Navigator>
  );
}

function AuthenticatedStack() {
  const { logout } = useContext(AuthCtx);
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: Colors.primary500 },
        headerTintColor: "white",
        contentStyle: { backgroundColor: Colors.primary100 },
      }}
    >
      <Stack.Screen
        name="Welcome"
        component={WelcomeScreen}
        options={{
          headerRight: ({ tintColor }) => (
            <IconButton
              icon="exit"
              color={tintColor}
              size={24}
              onPress={logout}
            />
          ),
        }}
      />
    </Stack.Navigator>
  );
}

function Navigation() {
  const { isAuth } = useContext(AuthCtx);
  return (
    <NavigationContainer>
      {!isAuth && <AuthStack />}
      {isAuth && <AuthenticatedStack />}
    </NavigationContainer>
  );
}

function Root() {
  const { authenticate } = useContext(AuthCtx);
  const [isTryingLogin, setIsTryingLogin] = useState(true);
  useEffect(() => {
    async function fetchLocalToken() {
      const storedToken = await AsyncStorage.getItem("token");

      if (storedToken) {
        authenticate(storedToken);
      }
      setIsTryingLogin(false);
    }
    fetchLocalToken();
  }, []);
  if (isTryingLogin) {
    return <AppLoading />;
  }
  return <Navigation />;
}

export default function App() {
  return (
    <>
      <StatusBar style="light" />
      <AuthCtxProvider>
        <Root />
      </AuthCtxProvider>
    </>
  );
}
