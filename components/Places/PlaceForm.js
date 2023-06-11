import { useCallback, useState } from "react";
import { View, Text, ScrollView, TextInput, StyleSheet } from "react-native";
import { Colors } from "../../constant/color";
import ImagePicker from "./ImagePicker";
import LocPicker from "./LocPicker";
import Button from "../UI/Button";
import { Place } from "../../models/place";
function PlaceForm({ onCreate }) {
  const [enteredTitle, setEnteredTitle] = useState("");
  const [enteredDesc, setEnteredDesc] = useState("");
  const [selectedImage, setImage] = useState();
  const [selectedLoc, setLoc] = useState();

  function changeTitleHandler(text) {
    setEnteredTitle(text);
  }

  function changeDescHandler(text) {
    setEnteredDesc(text);
  }

  function savePlace() {
    // console.log(enteredTitle);
    // console.log(selectedImage);
    // console.log(selectedLoc);
    const placeData = new Place(enteredTitle, enteredDesc, selectedImage, selectedLoc);
    onCreate(placeData);
  }

  function takeImageHandler(imageUri) {
    setImage(imageUri);
  }
  // this useCallback will help avoiding infinite loop from locPicker compenent useeffect
  const savePlaceHandler = useCallback((loc) => {
    setLoc(loc);
  }, []);
  return (
    <ScrollView style={styles.form}>
      <View>
        <Text style={styles.label}>Title</Text>
        <TextInput
          style={styles.input}
          onChangeText={changeTitleHandler}
          value={enteredTitle}
          maxLength={18}
        />
      </View>
      <View>
        <Text style={styles.label}>Desc</Text>
        <TextInput
          style={styles.input}
          onChangeText={changeDescHandler}
          value={enteredDesc}
          multiline={true}
          numberOfLines={4}
          maxLength={150}
        />
      </View>
      <ImagePicker onTakeImage={takeImageHandler} />
      <LocPicker onTakeLoc={savePlaceHandler} />
      <Button onPress={savePlace}>Add Place</Button>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  form: {
    flex: 1,
    // paddingTop: 12,
    marginVertical: 12,
    paddingHorizontal: 15,
  },
  label: {
    fontWeight: "bold",
    marginBottom: 4,
    color: Colors.primary500,
  },
  input: {
    marginVertical: 8,
    marginHorizontal: 4,
    padding: 5,
    fontSize: 16,
    borderBottomColor: Colors.primary700,
    borderBottomWidth: 2,
    backgroundColor: Colors.primary100,
    borderRadius: 4
  },
});

export default PlaceForm;
