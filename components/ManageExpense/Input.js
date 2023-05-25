import {Text, TextInput, View, StyleSheet} from 'react-native'
import { GlobalStyles } from '../../constant/styles'
function Input({label, style, textInputConfig, invalid}) {

    const inputStyle = [styles.input]

    if (textInputConfig && textInputConfig.multiline) {
        inputStyle.push(styles.inputMultiline)
    }
    if (invalid) {
        inputStyle.push(styles.invalidInput)
    }

    return <View style={[styles.inputContainer, style]}>
        <Text style={[styles.label, invalid && styles.invalidLabel]}>{label}</Text>
        {/* this is very important! */}
        <TextInput style={[inputStyle]} {...textInputConfig}/>
    </View>
}

export default Input

const styles = StyleSheet.create({
    inputContainer: {
        marginHorizontal: 4,
        marginVertical: 8,

    },
    label: {
        fontSize: 12,
        color: GlobalStyles.colors.primary100,
        marginBottom: 4,
    },
    input: {
        backgroundColor: GlobalStyles.colors.primary400,
        padding: 6,
        borderRadius: 6,
        fontSize: 18,
        color: 'black',

    },
    inputMultiline: {
        minHeight: 100,
        // textAlignVertical is to make text multiline
        textAlignVertical: 'top',
    },
    invalidLabel: {
        color: GlobalStyles.colors.errorStrong
    },
    invalidInput: {
        backgroundColor: GlobalStyles.colors.error100
    }
})