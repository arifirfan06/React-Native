import { useState, useContext } from "react";
import { AuthCtx } from "../store/authCtx";
import AuthContent from "../components/Auth/AuthContent";
import LoadingOverlay from "../components/ui/LoadingOverlay";
import { createUser } from "../utils/auth";
import { Alert } from "react-native";
function SignupScreen() {
  const { authenticate } = useContext(AuthCtx);
  const [isAuth, setIsAuth] = useState(false);
  async function signUpHandler({ email, password }) {
    setIsAuth(true);
    try {
      const token = await createUser(email, password);
      authenticate(token);
    } catch (err) {
      Alert.alert("Could not register", "Please check your data or try again");
      setIsAuth(false);
    }
  }
  if (isAuth) {
    return <LoadingOverlay message="Creating User..." />;
  }
  return <AuthContent onAuthenticate={signUpHandler} />;
}

export default SignupScreen;
