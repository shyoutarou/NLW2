import React from 'react'
import { View, Text, StyleSheet, ImageBackground, Image } from 'react-native'
import { RectButton } from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/native'

interface Success {
    title: string
    description: string
    navigateTo: string
    button: string
}

const Success: React.FC<Success> = ({ title, description, navigateTo, button }) => {

    const navigation = useNavigation()

    return (
        <View style={styles.container}>
            <ImageBackground source={require('../../../assets/images/give-classes-background.png')}
            style={styles.main} resizeMode='contain'>
                <Image source={require('../../../assets/images/success.png')} />
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.description}>{description}</Text>
            </ImageBackground>
            <RectButton onPress={() => navigation.navigate(navigateTo)} style={styles.button}>
                <Text style={styles.buttonText}>{button}</Text>
            </RectButton>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#8257E5",
        padding: 30
    },
    main: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    title: {
        color: 'white',
        fontSize: 32,
        fontFamily: 'Poppins_600SemiBold',
        width: 300,
        textAlign: 'center'
    },
    description: {
        fontFamily: 'Poppins_400Regular',
        fontSize: 14,
        color: '#D4C2FF',
        width: 250,
        textAlign: 'center'
    },
    button: {
        width: "100%",
        height: 56,
        backgroundColor: '#04d361',
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonText: {
        color: 'white',
        fontFamily: 'Archivo_400Regular'
    }
})

export default Success