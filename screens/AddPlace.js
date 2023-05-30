import PlaceForm from "../components/Places/PlaceForm";
import { insertPlace } from "../utils/database";

function AddPlace({ navigation }) {
  async function createPlaceHandler(place) {
    await insertPlace(place);
    navigation.navigate("AllPlace");
  }
  return <PlaceForm onCreate={createPlaceHandler} />;
}

export default AddPlace;
