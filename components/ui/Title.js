import { Text, StyleSheet, Platform } from "react-native"

function Title({children}) {

    return (
        <>
        <Text style={style.title}>{children}</Text>
        </>
    )
}

const style = StyleSheet.create({
    title: {
        fontFamily: 'open-Bo',
        fontSize: 22,
        // fontWeight: 'bold',
        color: 'white',
        textAlign: 'center',
        borderWidth: Platform.OS === 'android' ? 2 : 0,
        // the code bellow also work
        // borderWidth: Platform.select({ios: 0, android: 2}),
        borderColor: 'white',
        padding: 12,
        maxWidth: '80%',
        width: 300,
    }
})

export default Title