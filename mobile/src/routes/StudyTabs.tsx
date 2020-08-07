import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import TeacherList from '../Pages/TeacherList'
import Favorites from '../Pages/Favorites'
import { Ionicons } from '@expo/vector-icons'
import { Platform } from 'react-native'

const { Navigator, Screen } = createBottomTabNavigator()

const StudyTabs = () => {
    return (
        <Navigator tabBarOptions={{
            style: {
                elevation: 0,
                shadowOpacity: 0,
                height: Platform.OS === 'ios' ? 84 : 64
            },
            tabStyle: {
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                paddingBottom: Platform.OS === 'ios' ? 20 : 0
            },
            iconStyle: {
                flex: 0,
                width: 20,
                height: Platform.OS === 'ios' ? 24 : 20
            },
            labelStyle: {
                fontFamily: 'Archivo_700Bold',
                fontSize: 13,
                marginLeft: 16
            },
            safeAreaInsets: {
                bottom: 0
            },
            inactiveBackgroundColor: '#fafafc',
            activeBackgroundColor: '#ebebf5',
            inactiveTintColor: '#c1c1bc',
            activeTintColor: '#32264b'
        }}>
            <Screen options={{
                tabBarLabel: 'Proffys',
                tabBarIcon: ({ size, color, focused }) => <Ionicons size={size} color={focused ? '#8257e6' : color} name='ios-easel' />
            }} name='TeacherList' component={TeacherList} />
            <Screen options={{
                tabBarLabel: 'Favoritos',
                tabBarIcon: ({ size, color, focused }) => <Ionicons size={size} color={focused ? '#8257e6' : color} name='ios-heart' />
            }} name='Favorites' component={Favorites} />
        </Navigator>
    )
}

export default StudyTabs