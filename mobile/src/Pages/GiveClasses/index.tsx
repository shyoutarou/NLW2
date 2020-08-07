import React from 'react'
import { View, Text, StyleSheet, ImageBackground } from 'react-native'
import { RectButton } from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/native'

const GiveClasses = () => {

    const navigation = useNavigation()

    const handleNavigateBack = () => {
        navigation.goBack()
    }

    return (
        <View style={styles.container}>
            <ImageBackground resizeMode='contain' style={styles.content}
            source={require('../../../assets/images/give-classes-background.png')}>
                <Text style={styles.title}>Quer ser um proffy?</Text>
                <Text style={styles.description}>
                    Para começar, você precisa se cadastrar na nossa plataforma web.
                </Text>
            </ImageBackground>
            <RectButton onPress={handleNavigateBack} style={styles.okButton}>
                <Text style={styles.okButtonText}>Tudo bem</Text>
            </RectButton>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#8257e5',
        justifyContent: 'center',
        padding: 40
    },
    content: {
        flex: 1,
        justifyContent: 'center',
    },
    title: {
        fontFamily: 'Archivo_700Bold',
        color: "white",
        fontSize: 32,
        lineHeight: 37,
        maxWidth: 180
    },
    description: {
        marginTop: 24,
        color: "#d4c2ff",
        fontSize: 16,
        lineHeight: 26,
        fontFamily: 'Poppins_400Regular',
        maxWidth: 240
    },
    okButton: {
        marginVertical: 40,
        backgroundColor: '#04d361',
        height: 58,
        alignItems: "center",
        justifyContent: 'center',
        borderRadius: 8
    },
    okButtonText: {
        color: "white",
        fontSize: 16,
        fontFamily: "Archivo_700Bold"
    }
})

export default GiveClasses