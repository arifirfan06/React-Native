
import { useState, useRef, useEffect } from "react";
import {
  StyleSheet,
  View,
  Button,
  TextInput,
  FlatList
} from "react-native";
import { StatusBar } from "expo-status-bar";
import GoalItem from './components/GoalItem'
import GoalInput from './components/GoalInput'

export default function App() {
  // const textToDo = useRef(); unlike web. mobile cant use useRef with react native
  const [todos, updateToDo] = useState([]);
  const [isVisibleModal, changeModal] = useState(false)
  useEffect(() => {
    console.log(todos);
  }, [todos]);

  const addHandler = (input) => {
    updateToDo((current) => [...current, {text: input, id: Math.random().toString()}]);
    changeModal(false)
  };
  // you can change to key to make FlatList auto detect unique key
  // if you name it other than key you need to add keyExtractor in the props
  const removeHandler = (item) => {
    console.log(item);
    const exist = todos.filter((list) => list !== item);
    updateToDo(exist);
  };

  const changeStateModal = () => {
    changeModal(true)
  }

  const endModalView = () => {
    changeModal(false)
  }

  return (
    <>
    <StatusBar style="dark"/>
    <View style={styles.coreContainer}>
      <Button title="Add New Goal" color="rgb(45, 204, 204)" onPress={changeStateModal}/>
      <GoalInput addGoalHandler={addHandler} visibility={isVisibleModal} endModal={endModalView}/>
      <View style={styles.goalsCtn}>
        <FlatList data={todos} renderItem={(itemObj) => {
          return (
          <GoalItem list={itemObj.item} rmHandler={removeHandler}/>
          )
        }}
        keyExtractor={(item, index) => item.id}>
          {/* {todos.map((item, index) => ( the better way is using flatlist to use lazy load feature
            <View key={index} style={styles.goals}>
              <Text onPress={() => removeHandler(item)} style={styles.goalText}>
                {item}
              </Text>
            </View>
            <Text key={index} style={styles.goals}> This styling can only applied to android not IOS
              {item}
            </Text>
          ))} */}
        </FlatList>
      </View>
    </View>
    </>
  );
}

const styles = StyleSheet.create({
  coreContainer: {
    paddingTop: 55,
    paddingHorizontal: 20,
    flex: 1,
    // backgroundColor: "#c17272",
    // flexDirection: 'column' (default)
  },
  goalsCtn: {
    flex: 4,
  },
});
