import { Pressable, StyleSheet} from "react-native"
import {Ionicons} from '@expo/vector-icons'

function IconBtn({onPress, name = 'star', color='white'}) {
    return (<Pressable onPress={onPress} style={({pressed}) => pressed && styles.pressstyle}>
        <Ionicons name={name} size={24} color={color}/>
    </Pressable>)
}

const styles = StyleSheet.create({
    pressstyle: {
        opacity: 0.6
    }
})

export default IconBtn