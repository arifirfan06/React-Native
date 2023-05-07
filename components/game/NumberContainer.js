import { View, Text, StyleSheet, Dimensions } from "react-native"
import Color from "../../constants/color"

const NUmberCtn = ({children}) => {

    return (
        <View style={styles.container}>
        <Text style={styles.numberText}>{children}</Text>
        </View>
    )
}

export default NUmberCtn

// Be carefull with using dimension make sure to know your target screen resolution
const deviceWidth = Dimensions.get('window').width

const styles = StyleSheet.create({
    container: {
        borderWidth: 4,
        borderColor: Color.accent500,
        padding: deviceWidth < 380 ? 12 : 24,
        borderRadius: 8,
        margin: deviceWidth < 380 ? 32 : 24,
        alignItems: 'center',
        justifyContent: 'center',

    },
    numberText: {
        color: Color.accent500,
        fontSize: deviceWidth < 380 ? 28 : 36,
        // fontWeight: 'bold',
        fontFamily: 'open-Bo'
    },
})