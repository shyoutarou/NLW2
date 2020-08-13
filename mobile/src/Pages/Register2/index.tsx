import React, { useState } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Feather } from '@expo/vector-icons'
import { TouchableOpacity, TextInput, RectButton } from 'react-native-gesture-handler'

const Register2 = () => {

    const [nameFocused, setNameFocused] = useState(false)
    const [lastNameFocused, setLastNameFocused] = useState(false)
    const [eye, setEye] = useState(false)

    return (
        <View style={styles.container}>
            <View style={styles.topBar}>
                <View style={styles.balls}>
                    <View style={styles.ballOff}></View>
                    <View style={styles.ball}></View>
                </View>
                <TouchableOpacity>
                    <Feather color='#9C98A6' name='arrow-left' size={25} />
                </TouchableOpacity>
            </View>
            {!nameFocused && !lastNameFocused ? (
                <View style={styles.main}>
                    <Text style={styles.title}>Crie sua conta gratúita</Text>
                    <Text style={styles.description}>Basta preencher esses dados
                    e você estará conosco.</Text>
                </View>
            ) : false}
            <View style={styles.form}>
                <Text style={styles.formTitle}>02. Email e Senha</Text>
                <TextInput placeholder='E-mail' onFocus={() => setNameFocused(true)}
                onBlur={() => setNameFocused(false)}
                style={[styles.input, styles.topInput, nameFocused ? styles.shadowTopInput : {}]} />
                <View>
                    <TextInput placeholder='Senha' onFocus={() => setLastNameFocused(true)}
                    onBlur={() => setLastNameFocused(false)} secureTextEntry={!eye}
                    style={[styles.input, styles.bottomInput, lastNameFocused ? styles.shadowBottomInput : {}]} />
                    {eye ? (
                        <Feather onPress={() => setEye(!eye)}
                        style={styles.eye} size={25} color='#8257E5' name='eye' />
                    ) : (
                        <Feather onPress={() => setEye(!eye)}
                        style={styles.eye} size={25} color='#8257E5' name='eye-off' />
                    )}
                </View>
                <RectButton style={styles.button}>
                    <Text style={styles.buttonText}>Concluir cadastro</Text>
                </RectButton>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F0F0F7',
        padding: 30
    },
    topBar: {
        marginTop: 10,
        flexDirection: 'row-reverse',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    balls: {
        flexDirection: "row"
    },
    ball: {
        width: 4,
        height: 4,
        backgroundColor: "#8257E5",
        marginRight: 8,
        borderRadius: 4
    },
    ballOff: {
        width: 4,
        height: 4,
        backgroundColor: "#C1BCCC",
        marginRight: 8,
        borderRadius: 4
    },
    title: {
        fontFamily: 'Poppins_600SemiBold',
        color: "#32264D",
        fontSize: 32,
        width: 240
    },
    description: {
        color: "#6A6180",
        width: 200
    },
    main: {
        marginTop: 60
    },
    form: {
        flex: 1,
        justifyContent: "flex-end"
    },
    input: {
        backgroundColor: "white",
        width: "100%",
        height: 64,
        color: "#9C98A6",
        paddingLeft: 20,
        fontSize: 18,
        borderColor: "#9C98A6"
    },
    topInput: {
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
        borderWidth: 1
    },
    bottomInput: {
        borderBottomLeftRadius: 8,
        borderBottomRightRadius: 8,
        borderLeftWidth: 1,
        borderRightWidth: 1,
        borderBottomWidth: 1
    },
    shadowTopInput: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 6,
        },
        shadowOpacity: 0.37,
        shadowRadius: 7.49,

        elevation: 12,
        borderBottomWidth: 0
    },
    shadowBottomInput: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 6,
        },
        shadowOpacity: 0.37,
        shadowRadius: 7.49,

        elevation: 12,
        borderTopWidth: 0
    },
    button: {
        width: "100%",
        height: 56,
        borderRadius: 8,
        backgroundColor: "#04D361",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 20
    },
    buttonText: {
        color: 'white',
        fontFamily: 'Archivo_400Regular'
    },
    formTitle: {
        color: "#32264D",
        fontSize: 24,
        fontFamily: "Poppins_600SemiBold",
        marginBottom: 20
    },
    eye: {
        position: "absolute",
        right: 20,
        top: 20
    }
})

export default Register2