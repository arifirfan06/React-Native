import { useEffect, useState } from "react";
import PlacesList from "../components/Places/PlacesList";
import { useIsFocused } from "@react-navigation/native";
import { fetchPlaces } from "../utils/database";

function AllPlaces({ route }) {
  const [places, setPlaces] = useState([])
  const isFocus = useIsFocused();
  useEffect(() => {
    async function loadPlaces() {
    const places = await fetchPlaces()
    setPlaces(places)
    }
    if (isFocus) {
      loadPlaces();
      // setPlaces((current) => [...current,route.params.place])
    }
  }, [isFocus, route]);
  return <PlacesList places={places}/>;
}

export default AllPlaces;
