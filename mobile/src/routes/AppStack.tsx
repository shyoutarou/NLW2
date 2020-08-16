import React, { useEffect, useState } from 'react'
import { AppLoading } from 'expo'
import { YellowBox, Alert } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import Landing from '../Pages/Landing'
import GiveClasses from '../Pages/GiveClasses'
import StudyTabs from './StudyTabs'
import Login from '../Pages/Login'
import Onboarding from '../Pages/Onboarding'
import AsyncStorage from '@react-native-community/async-storage'
import { Archivo_400Regular, Archivo_700Bold, useFonts } from '@expo-google-fonts/archivo'
import { Poppins_400Regular, Poppins_600SemiBold } from '@expo-google-fonts/poppins'
import Register from '../Pages/Register'
import Register2 from '../Pages/Register2'
import Success from '../Pages/Success'
import ForgotPassword from '../Pages/ForgotPassword'
import Profile from '../Pages/Profile'

YellowBox.ignoreWarnings(['Looks like'])
const { Navigator, Screen } = createStackNavigator()


const AppStack = () => {
    
    useEffect(() => {
        AsyncStorage.getItem('firstTime').then(resp => {
            if(resp) {
                setFirstTime(resp)
            }
        }).catch(err => {})
    
    }, [])

    const [firstTime, setFirstTime] = useState('true')

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
        <NavigationContainer>
            <Navigator initialRouteName={/*firstTime === 'true' ? 'StudyBoard' : 'Landing'*/'GiveClasses'} headerMode='none'>
                <Screen name='StudyBoard' component={() => <Onboarding number='01.' boardType='study'
                description='Encontre vários professores para ensinar você.' />} />
                <Screen name='GiveClassBoard' component={() => <Onboarding number='02.' boardType='give-class'
                description='Ou dê aulas sobre o que você mais conhece.' />} />
                <Screen name='Landing' component={Landing} />
                <Screen name='Profile' component={Profile} />
                <Screen name='GiveClasses' component={GiveClasses} />
                <Screen name='StudyTabs' component={StudyTabs} />
                <Screen name='Login' component={Login} />
                <Screen name='Register' component={Register} />
                <Screen name='Register2' component={Register2} />
                <Screen name='ForgotPassword' component={ForgotPassword} />
                <Screen name='RegisterSuccess' component={() => <Success title='Cadastro concluído!'
                navigateTo='Login' button='Fazer login' description='Agora você faz parte da
                plataforma da Proffy'/>} />
                <Screen name='ForgotPasswordSuccess' component={() => <Success title='Redefinição Enviada!'
                navigateTo='Login' button='Fazer login' description='Boa, agora é só checar o e-mail que foi
                enviado para você redefinir sua senha
                e aproveitar os estudos.'/>} />
                <Screen name='RegisterClassSuccess' component={() => <Success title='Cadastro salvo!'
                navigateTo='Landing' button='Voltar para o perfil' description='Tudo certo, seu cadastro está
                na nossa lista de professores. Agora é
                só ficar de olho no seu WhatsApp.'/>} />
            </Navigator>
        </NavigationContainer>
    )
}

export default AppStack