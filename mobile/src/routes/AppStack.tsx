import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import Landing from '../Pages/Landing'

const { Navigator, Screen } = createStackNavigator()

const AppStack = () => {
    return (
        <NavigationContainer>
            <Navigator headerMode='none'>
                <Screen name='Landing' component={Landing} />
            </Navigator>
        </NavigationContainer>
    )
}

export default AppStack