import { View, Button, Alert, Image, Text, StyleSheet } from "react-native";
import {
  launchCameraAsync,
  useCameraPermissions,
  PermissionStatus,
} from "expo-image-picker";
import { useState } from "react";
import { Colors } from "../../constant/color";
import OutlinedButton from "../UI/OutlinedButton";

function ImagePicker({onTakeImage}) {
  const [cameraPermisionInfo, requestPermision] = useCameraPermissions();
  const [pickedImg, setImg] = useState();
  async function verivyPermission() {
    if (cameraPermisionInfo.status === PermissionStatus.UNDETERMINED) {
      const permissionResponse = await requestPermision();

      return permissionResponse.granted;
    }
    if (cameraPermisionInfo.status === PermissionStatus.DENIED) {
      Alert.alert(
        "Insuffisient Permission",
        "Please Grant Camera permission to use the app"
      );
      return false;
    }
    return true;
  }

  async function takeImageHandler() {
    // the commented code bellow only work for IOS
    // const isAllowed = await verivyPermission();
    // if (!isAllowed) {
    //   return;
    // }
    const image = await launchCameraAsync({
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.5,
    });
    console.log(image.assets);
    setImg(image.assets[0].uri);
    onTakeImage(image.assets[0].uri)
  }

  let imagePreview = <Text>No image taken yet</Text>;

  if (pickedImg) {
    imagePreview = <Image source={{ uri: pickedImg }} style={styles.image}/>;
  }

  return (
    <View>
      <View style={styles.imgPrev}>{imagePreview}</View>
      {/* <Button title="Take Image" onPress={takeImageHandler} /> */}
      <OutlinedButton icon='camera' onPress={takeImageHandler}>Take Image</OutlinedButton>
    </View>
  );
}

const styles = StyleSheet.create({
    imgPrev: {
        width: '100%',
        height: 200,
        marginVertical: 8,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.primary100,
        borderRadius: 4,
    },
    image: {
        width: '100%',
        height: '100%',
    }
})

export default ImagePicker;
