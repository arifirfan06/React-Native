import { Text, StyleSheet } from "react-native"

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
        borderWidth: 2,
        borderColor: 'white',
        padding: 12,
    }
})

export default Title