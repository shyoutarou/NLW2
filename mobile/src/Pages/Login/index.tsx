import React, { useState } from 'react'
import { View, Text, StyleSheet, Image, ImageBackground } from 'react-native'
import { TextInput, TouchableOpacity, RectButton } from 'react-native-gesture-handler'
import { Feather } from '@expo/vector-icons'

const Login = () => {

    const [emailFocus, setEmailFocus] = useState(false)
    const [passwordFocus, setPasswordFocus] = useState(false)
    const [checkbox, setCheckbox] = useState(false)
    const [eye, setEye] = useState(false)

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
                    <Text style={styles.formTitle}>Fazer Login</Text>
                    <TouchableOpacity>
                        <Text style={styles.createAccount}>Criar um conta</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.inputs}>
                    <View>
                        <TextInput onFocus={() => setEmailFocus(true)}
                        onBlur={() => setEmailFocus(false)}
                        placeholder='E-mail' style={[styles.input, styles.topInput]} />
                        <View style={[styles.emailBar, { opacity: emailFocus ? 1 : 0 }]} />
                    </View>
                    <View>
                        <TextInput onFocus={() => setPasswordFocus(true)}
                        onBlur={() => setPasswordFocus(false)}
                        secureTextEntry={eye} placeholder='Senha'
                        style={[styles.input, styles.bottomInput]} />
                        {eye ? <Feather onPress={() => setEye(!eye)}
                        color="#8257E5" size={20} name='eye-off' style={styles.eye} />
                        : <Feather onPress={() => setEye(!eye)}
                        color="#8257E5" size={20} name='eye' style={styles.eye} />}
                        <View style={[styles.emailBar, { opacity: passwordFocus ? 1 : 0 }]} />
                    </View>
                </View>
                <View style={styles.options}>
                    <View style={styles.checkboxContainer}>
                        <TouchableOpacity onPress={() => setCheckbox(!checkbox)} style={[styles.checkbox, checkbox ? styles.checkboxTrue : styles.checkboxFalse]}>
                            <Feather size={15} color='white' name='check' />
                        </TouchableOpacity>
                        <Text style={styles.textDescription}>Lembrar-me</Text>
                    </View>
                    <TouchableOpacity>
                        <Text style={styles.textDescription}>Esqueci minha senha</Text>
                    </TouchableOpacity>
                </View>
                <RectButton style={styles.button}>
                    <Text style={styles.textButton}>Entrar</Text>
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
        flexDirection: "row",
        justifyContent: 'space-between',
        alignItems: 'center'
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
        paddingLeft: 20
    },
    topInput: {
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
        borderColor: '#E6E6F0',
        borderWidth: 1
    },
    bottomInput: {
        borderBottomLeftRadius: 8,
        borderBottomRightRadius: 8,
        borderColor: '#E6E6F0',
        borderTopWidth: 0,
        borderLeftWidth: 1,
        borderRightWidth: 1,
        borderBottomWidth: 1
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
    }
})

export default Login