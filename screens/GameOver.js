import { Text, Image, View, StyleSheet, useWindowDimensions, ScrollView } from "react-native";
import Title from "../components/ui/Title";
import Color from "../constants/color";
import PrimaryBtn from "../components/ui/PrimaryBtn";
const GameOver = ({ rounds, userNumber, onRestart }) => {
  const {width, height} = useWindowDimensions()
  console.log('the device width and height', width, height)
  let imageSize = 160
  if(width < 400) {
    imageSize = 100
  }
  if(height < 400) {
    imageSize = 100
  }
  const imageStyle = {
    width: imageSize,
    height: imageSize,
    borderRadius: imageSize / 2,
  }
  return (
    <ScrollView style={{flex: 1}}>
    <View style={styles.rootCtn}>
      <Title>Game Is Over</Title>
      <View style={[styles.ImgCtn, {width: imageSize, height: imageSize, borderRadius: imageSize / 2}]}>
        <Image
          style={styles.img}
          source={require("../assets/images/success.png")}
        />
      </View>
      <Text style={styles.summaryText}>
        Your phone need <Text style={styles.highlight}>{rounds}</Text> round to
        guess the number <Text style={styles.highlight}>{userNumber}</Text>
      </Text>
      <PrimaryBtn whenPress={onRestart}>Start New Game</PrimaryBtn>
    </View>
    </ScrollView>
  );
};

// const deviceWidth = Dimensions.get('window').width

const styles = StyleSheet.create({
  summaryText: {
    fontFamily: "open-sans",
    fontSize: 24,
    textAlign: "center",
    marginVertical: 24,
  },
  highlight: {
    fontFamily: "open-Bo",
    color: Color.primary500,
  },
  rootCtn: {
    flex: 1,
    padding: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  ImgCtn: {
    // width: deviceWidth < 380 ? 200 : 270,
    // height: deviceWidth < 380 ? 200 : 270,
    // borderRadius: deviceWidth < 380 ? 100 : 135,
    borderWidth: 6,
    borderColor: Color.primaryRipple,
    overflow: "hidden",
    margin: 36,
  },
  img: {
    width: "100%",
    height: "100%",
  },
});

export default GameOver;
