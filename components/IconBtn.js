import { Pressable, StyleSheet} from "react-native"
import {Ionicons} from '@expo/vector-icons'

function IconBtn({onPress, name = 'star', color='white', size=24}) {
    return (<Pressable onPress={onPress} style={({pressed}) => pressed && styles.pressstyle}>
        <Ionicons name={name} size={size} color={color}/>
    </Pressable>)
}

const styles = StyleSheet.create({
    pressstyle: {
        opacity: 0.6
    }
})

export default IconBtn