import { Text, StyleSheet } from "react-native"
import Color from "../../constants/color"
export default Guide = ({children, extraStyle}) => {

    return (
        <Text style={[styles.instructionText, extraStyle]}>{children}</Text>
    )
}

const styles = StyleSheet.create({
    instructionText: {
        fontFamily: 'open-sans',
        color: Color.primary500,
        fontSize: 24,
      },
})