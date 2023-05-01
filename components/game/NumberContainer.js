import { View, Text, StyleSheet } from "react-native"
import Color from "../../constants/color"

const NUmberCtn = ({children}) => {

    return (
        <View style={styles.container}>
        <Text style={styles.numberText}>{children}</Text>
        </View>
    )
}

export default NUmberCtn

const styles = StyleSheet.create({
    container: {
        borderWidth: 4,
        borderColor: Color.accent500,
        padding: 24,
        borderRadius: 8,
        margin: 24,
        alignItems: 'center',
        justifyContent: 'center',

    },
    numberText: {
        color: Color.accent500,
        fontSize: 36,
        // fontWeight: 'bold',
        fontFamily: 'open-Bo'
    },
})