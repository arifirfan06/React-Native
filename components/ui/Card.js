import { StyleSheet, View, Dimensions } from "react-native"
import Color from "../../constants/color"


function Card({children}) {

    return (
        <View style={styles.inputContainer}>
        {children}
        </View>
    )
}
// Be carefull with using dimension make sure to know your target screen resolution
const deviceWidth = Dimensions.get('window').width
console.log(deviceWidth)

const styles = StyleSheet.create({
    inputContainer: {
        // flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 16,
        marginTop: deviceWidth > 370 ? 36 : 20,
        backgroundColor: Color.descCtnColor,
        marginHorizontal: 24,
        borderRadius: 8,
        // android
        elevation: 9,
        // IOS
        shadowColor: "black",
        shadowOffset: { width: 0, height: 4 },
        // how much the shadow expand
        shadowRadius: 6,
        shadowOpacity: 1,
      },
})

export default Card