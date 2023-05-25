import AuthContent from "../components/Auth/AuthContent";
import { useState, useContext } from "react";
import { AuthCtx } from "../store/authCtx";
import { login } from "../utils/auth";
import LoadingOverlay from "../components/ui/LoadingOverlay";
import { Alert } from "react-native";

function LoginScreen() {
  const { authenticate } = useContext(AuthCtx);
  const [isAuth, setIsAuth] = useState(false);
  async function signInHandler({ email, password }) {
    setIsAuth(true);
    try {
      const token = await login(email, password);
      authenticate(token);
    } catch (err) {
      Alert.alert("Could not login", "Check your data or try again!");
      setIsAuth(false);
    }
  }
  if (isAuth) {
    return <LoadingOverlay message="Authenticate User..." />;
  }
  return <AuthContent isLogin onAuthenticate={signInHandler} />;
}

export default LoginScreen;
