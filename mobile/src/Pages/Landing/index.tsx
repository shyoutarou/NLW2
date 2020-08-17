import React, { useState, useEffect } from 'react'
import { View, StyleSheet, Image, Text, TouchableOpacity } from 'react-native'
import { AppLoading } from 'expo'
import { Archivo_400Regular, Archivo_700Bold, useFonts } from '@expo-google-fonts/archivo'
import { Poppins_400Regular, Poppins_600SemiBold } from '@expo-google-fonts/poppins'
import { RectButton } from 'react-native-gesture-handler'
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native'
import { Feather } from '@expo/vector-icons'
import api from '../../services/api'
import AsyncStorage from '@react-native-community/async-storage'

const Landing = () => {

    type IUser = {
        login: {
            user: {
                id: number
                name: string
                subject: string
                avatar: string
                whatsapp: string
                bio: string
                email: string
            }
        }
    }

    const navigation = useNavigation()

    const [connections, setConnections] = useState(0)

    useEffect(() => {
        api.get('/connections').then(resp => {
            setConnections(resp.data.total)
        }).catch(err => console.log(err))
    }, [])

    const route = useRoute<RouteProp<IUser, 'login'>>()

    const handleNavigateToGiveClassesPage = () => {
        navigation.navigate('GiveClasses')
    }

    const handleNavigateStudyTabsPage = () => {
        navigation.navigate('StudyTabs')
    }

    const logout = () => {
        AsyncStorage.setItem('token', '')
        navigation.navigate('Login')
    }

    let [fontsLoaded] = useFonts({
        Archivo_400Regular,
        Archivo_700Bold,
        Poppins_400Regular,
        Poppins_600SemiBold
    })

    if(!fontsLoaded) {
        return <AppLoading />
    }

    return (
        <View style={styles.container}>
            <View style={styles.profile}>
                <TouchableOpacity onPress={() => navigation.navigate('Profile')} style={styles.profileInfo}>
                    <Image style={styles.profileImage} source={{
                        uri: `http://10.0.0.106:3333/uploads/${route.params.user.avatar}`
                    }} />
                    <Text style={styles.profileName}>{route.params.user.name}</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={logout} style={styles.logout}>
                    <Feather size={20} color="#D4C2FF" name='log-out' />
                </TouchableOpacity>
            </View>
            <Image style={styles.banner} source={require('../../../assets/images/landing.png')} />
            <Text style={styles.title}>
                Seja bem vindo, {'\n'}
                <Text style={styles.titleBold}>O que deseja fazer?</Text>
            </Text>

            <View style={styles.buttonsContainer}>
                <RectButton onPress={handleNavigateStudyTabsPage} style={[styles.button, styles.buttonPrimary]}>
                    <Image source={require('../../../assets/images/icons/study.png')} />
                    <Text style={styles.buttonText}>
                        Estudar
                    </Text>
                </RectButton>

                <RectButton onPress={handleNavigateToGiveClassesPage} style={[styles.button, styles.buttonSecondary]}>
                    <Image source={require('../../../assets/images/icons/give-classes.png')} />
                    <Text style={styles.buttonText}>
                        Dar aulas
                    </Text>
                </RectButton>
            </View>

            <Text style={styles.totalConnections}>
                Total de {connections} conexões já realizdas {' '}
                <Image source={require('../../../assets/images/icons/heart.png')} />
            </Text>
        </View>
    )
}

export default Landing

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#8257e5",
        flex: 1,
        justifyContent: 'center',
        padding: 40
    },
    banner: {
        width: '100%',
        resizeMode: 'contain'
    },
    title: {
        fontSize: 20,
        color: '#fff',
        lineHeight: 30,
        marginTop: 80,
        fontFamily: 'Poppins_400Regular'
    },
    titleBold: {
        fontFamily: 'Poppins_600SemiBold'
    },
    buttonsContainer: {
        flexDirection: 'row',
        marginTop: 40,
        justifyContent: 'space-between'
    },
    button: {
        height: 150,
        width: '48%',
        backgroundColor: '#333',
        borderRadius: 8,
        padding: 24,
        justifyContent: 'space-between'
    },
    buttonPrimary: {
        backgroundColor: '#9871f5'
    },
    buttonSecondary: {
        backgroundColor: '#04d361'
    },
    buttonText: {
        fontFamily: 'Archivo_700Bold',
        color: 'white',
        fontSize: 20
    },
    totalConnections: {
        fontFamily: 'Poppins_400Regular',
        color: '#d4c2ff',
        fontSize: 12,
        lineHeight: 20,
        maxWidth: 140,
        marginTop: 40
    },
    profile: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    profileInfo: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    profileName: {
        color: "#D4C2FF",
        fontSize: 14,
        fontFamily: "Poppins_400Regular"
    },
    profileImage: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: 'red',
        marginRight: 20
    },
    logout: {
        backgroundColor: "#774DD6",
        borderRadius: 8,
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center'
    }
})