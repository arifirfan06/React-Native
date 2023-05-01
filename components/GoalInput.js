import { View, TextInput, Button, StyleSheet, Modal, Image } from "react-native";
import { useState } from "react";
export default GoalInput = (props) => {
  const [input, updateInput] = useState("");
  const directTextInputValueHandler = (value) => {
    updateInput(value);
  };

  return (
    <Modal visible={props.visibility} animationType="slide">
      <View style={styles.inputCtn}>
        <Image style={styles.img} source={require('../assets/img/goal.png')}/>
        <TextInput
          style={styles.textInput}
          onChangeText={directTextInputValueHandler}
          placeholder="Your Goal..."
          value={input}
        />
        <View style={styles.btnCtn}>
            <View style={styles.btn}>
               <Button onPress={() => {props.addGoalHandler(input); updateInput('');}} title="Add Goal" color='rgb(44, 182, 55)' />  
            </View>
           <View style={styles.btn}>
             <Button title="Cancel" onPress={props.endModal} color="rgb(167, 212, 69)"/>
           </View>
        </View>
        
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  inputCtn: {
    flex: 1,
    padding: 9,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    // marginBottom: 22,
    // borderBottomWidth: 2,
    // borderColor: "#cccccc",
    backgroundColor: '#3b4ad0'
  },
  textInput: {
    borderWidth: 2,
    borderColor: "#9a9ba4",
    backgroundColor: "#9a9ba4",
    borderRadius: 7,
    color: '#18181c',
    width: "90%",
    padding: 12,

  },
  btnCtn: {
    marginTop: 12,
    flexDirection: 'row',
  },
  btn: {
    width: 100,
    marginHorizontal: 8,

  },
  img: {
    width: 100,
    height: 100,
    margin: 20,

  }
});
