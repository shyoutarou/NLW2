import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import Landing from '../Pages/Landing'
import GiveClasses from '../Pages/GiveClasses'
import StudyTabs from './StudyTabs'

const { Navigator, Screen } = createStackNavigator()

const AppStack = () => {
    return (
        <NavigationContainer>
            <Navigator headerMode='none'>
                <Screen name='Landing' component={Landing} />
                <Screen name='GiveClasses' component={GiveClasses} />
                <Screen name='StudyTabs' component={StudyTabs} />
            </Navigator>
        </NavigationContainer>
    )
}

export default AppStack