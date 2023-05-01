import { Text, View, StyleSheet } from "react-native"
import Color from "../../constants/color"

function GuessLog({roundNumber, guess}) {

    return (
        <View style={styles.listItem}>
            <Text style={styles.itemText}>#{roundNumber}</Text>
            <Text style={styles.itemText}>Opponent's Guess: {guess}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    listItem: {
        borderColor: Color.primaryRipple,
        borderWidth: 1,
        borderRadius: 40,
        padding: 12,
        marginVertical: 8,
        backgroundColor: Color.accent500,
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        elevation: 4,
        shadowColor: 'black',
        shadowOffset: {width: 0, height: 0},
        shadowOpacity: 0.25,
        shadowRadius: 4,
    },
    itemText: {
        fontFamily: 'open-sans',

    }
})

export default GuessLog