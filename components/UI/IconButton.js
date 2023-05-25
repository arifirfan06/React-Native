import { Pressable, View, StyleSheet } from "react-native";
import {Ionicons} from '@expo/vector-icons'

function IconButton({name, size, color, onPress}) {

    return (
        <Pressable onPress={onPress} style={({pressed}) => pressed && styles.pressed}>
            <View style={styles.buttonCtn}>
                <Ionicons name={name} size={size} color={color}/>
            </View>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    buttonCtn: {
        borderRadius: 24,
        padding: 6,
        marginHorizontal: 8,
        marginVertical: 2,
    },
    pressed: {
        opacity: 0.7
    }
})

export default IconButton