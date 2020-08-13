import React, { useEffect, useState } from 'react'
import { AppLoading } from 'expo'
import { YellowBox, Alert } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import Landing from '../Pages/Landing'
import GiveClasses from '../Pages/GiveClasses'
import StudyTabs from './StudyTabs'
import Onboarding from '../Pages/Onboarding'
import AsyncStorage from '@react-native-community/async-storage'
import { Archivo_400Regular, Archivo_700Bold, useFonts } from '@expo-google-fonts/archivo'
import { Poppins_400Regular, Poppins_600SemiBold } from '@expo-google-fonts/poppins'

YellowBox.ignoreWarnings(['Looks like'])
const { Navigator, Screen } = createStackNavigator()


const AppStack = () => {
    

    const [firstTime, setFirstTime] = useState('true')

    let [fontsLoaded] = useFonts({
        Archivo_400Regular,
        Archivo_700Bold,
        Poppins_400Regular,
        Poppins_600SemiBold
    })
    
    useEffect(() => {
        AsyncStorage.getItem('firstTime').then(resp => {
            if(resp) {
                setFirstTime(resp)
            }
        }).catch(err => {})

    }, [])

    if(!fontsLoaded) {
        return <AppLoading />
    }

    return (
        <NavigationContainer>
            <Navigator initialRouteName={firstTime === 'true' ? 'StudyBoard' : 'Landing'} headerMode='none'>
                <Screen name='StudyBoard' component={() => <Onboarding number='01.' boardType='study'
                description='Encontre vários professores para ensinar você.' />} />
                <Screen name='GiveClassBoard' component={() => <Onboarding number='02.' boardType='give-class'
                description='Ou dê aulas sobre o que você mais conhece.' />} />
                <Screen name='Landing' component={Landing} />
                <Screen name='GiveClasses' component={GiveClasses} />
                <Screen name='StudyTabs' component={StudyTabs} />
            </Navigator>
        </NavigationContainer>
    )
}

export default AppStack