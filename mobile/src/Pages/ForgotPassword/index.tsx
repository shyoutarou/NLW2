import React, { useState } from 'react'
import { View, Text, StyleSheet, Image, ImageBackground, Alert } from 'react-native'
import { TextInput, TouchableOpacity, RectButton } from 'react-native-gesture-handler'
import { Feather } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import api from '../../services/api'

const ForgotPassword = () => {

    const navigation = useNavigation()

    const [emailFocus, setEmailFocus] = useState(false)
    const [email, setEmail] = useState('')

    const handleEmail = async () => {

        setEmail('')

        if(!email.match(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
            return Alert.alert('Erro' ,'Email inválido!')
        }

        try {
            await api.post('/profiles/resetpassword', {
                email
            })

            navigation.navigate('ForgotPasswordSuccess')
        } catch (e) {
            Alert.alert('Erro', 'Email inexistente!')
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                
                <ImageBackground resizeMode='contain' style={styles.background} source={require('../../../assets/images/background.png')}>
                    <Image resizeMode='contain' style={styles.logo} source={require('../../../assets/images/logo.png')} />
                    <Text style={styles.text}>Sua plataforma de estudos online.</Text>                   
                </ImageBackground>
                
            </View>
            <View style={styles.formContainer}>
                <View style={styles.topBar}>
                    <Text style={styles.formTitle}>Esqueceu sua senha?</Text>
                    <Text style={styles.formDescription}>Não esquenta, vamos dar um jeito nisso.</Text>
                </View>
                <View style={styles.inputs}>
                    <View>
                        <TextInput onFocus={() => setEmailFocus(true)}
                        onBlur={() => setEmailFocus(false)} value={email}
                        placeholder='E-mail' style={styles.input}
                        onChangeText={text => setEmail(text)} />
                        <View style={[styles.emailBar, { opacity: emailFocus ? 1 : 0 }]} />
                    </View>
                </View>
                <RectButton onPress={handleEmail} style={styles.button}>
                    <Text style={styles.textButton}>Enviar redefinição</Text>
                </RectButton>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F0F0F7'
    },
    header: {
        padding: 50,
        backgroundColor: '#8257E5',
        flex: 3
    },
    background: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    logo: {
        width: 170,
        height: 80,
    },
    text: {
        color: '#D4C2FF',
        fontSize: 16,
        fontFamily: 'Poppins_400Regular',
        width: 170
    },
    formContainer: {
        flex: 4,
        padding: 30
    },
    topBar: {
        
    },
    formTitle: {
        fontSize: 24,
        color: '#32264D',
        fontFamily: 'Archivo_700Bold'
    },
    createAccount: {
        fontSize: 16,
        fontFamily: 'Poppins_400Regular',
        color: "#8257E5"
    },
    inputs: {
        marginTop: 20
    },
    input: {
        width: '100%',
        height: 64,
        backgroundColor: 'white',
        fontSize: 20,
        color: "#9C98A6",
        fontFamily: 'Poppins_400Regular',
        paddingLeft: 20,
        borderColor: '#E6E6F0',
        borderWidth: 1,
        borderRadius: 8
    },
    emailBar: {
        width: 2,
        height: 40,
        backgroundColor: '#8257E5',
        position: 'absolute',
        top: 12
    },
    checkbox: {
        width: 24,
        height: 24,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center'
    },
    checkboxTrue: {
        backgroundColor: '#04D361'
    },
    checkboxFalse: {
        borderColor: '#e6e6f0',
        borderWidth: 1,
        backgroundColor: "#fff"
    },
    options: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 20
    },
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    textDescription: {
        marginLeft: 5,
        color: '#9C98A6',
        fontFamily: "Poppins_400Regular"
    },
    button: {
        marginTop: 20,
        width: '100%',
        height: 56,
        backgroundColor: "#04D361",
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8
    },
    textButton: {
        color: 'white',
        fontFamily: "Archivo_400Regular"
    },
    eye: {
        position: 'absolute',
        right: 20,
        top: 20
    },
    formDescription: {
        color: "#6A6180",
        fontFamily: "Poppins_400Regular",
        fontSize: 14,
        width: 200,
        marginTop: 20
    }
})

export default ForgotPassword