import { CATEGORIES } from "../db/dummy-data";
import { FlatList } from "react-native";
import CategoryGridTile from "../components/CtgGridTile";

const CategoriesScreen = ({navigation}) => {
  const renderCtgItem = (itemData) => {
    const pressHandler = () => {
      navigation.navigate('Foods Overview', {categoryId: itemData.item.id})
    }
    return <CategoryGridTile title={itemData.item.title} color={itemData.item.color} onPress={pressHandler}/>;
  };
  return (
    <>
      <FlatList
        data={CATEGORIES}
        keyExtractor={(item) => item.id}
        renderItem={renderCtgItem}
        numColumns={2}
      />
    </>
  );
};

export default CategoriesScreen;
