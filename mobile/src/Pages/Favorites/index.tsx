import React, { useState, useEffect, useContext } from 'react'
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native'
import { Feather } from '@expo/vector-icons'
import PageHeader from '../../Components/PageHeader'
import TeacherItem from '../../Components/TeacherItem'
import api from '../../services/api'
import AsyncStorage from '@react-native-community/async-storage'
import { useFocusEffect } from '@react-navigation/native'
import UserContext from '../../Contexts/UserContext'

interface Teacher {
    id: number
    avatar: string
    bio: string
    cost: number
    name: string
    subject: string
    whatsapp: string
}

const Favorites = () => {

    const User = useContext(UserContext)

    const [favorites, setFavorites] = useState([])

    useFocusEffect(
        React.useCallback(() => {
          loadFavorites();
        }, [])
      )

    const loadFavorites = async () => {
        const favorites = await api.get(`/favorites?user_id=${User.user?.id}`)
        setFavorites(favorites.data)
    }

    return (
        <View style={styles.container}>
            <PageHeader title="Meus proffys favoritos" label='Estudar'
            headerRight={(
                <View style={styles.proffys}>
                    <Image source={require('../../../assets/images/icons/love.png')} />
                    <Text style={styles.proffysDescription}>Nenhum proffy</Text>
                </View>
            )} />
            <ScrollView contentContainerStyle={{
                paddingHorizontal: 16,
                paddingBottom: 16
            }} style={styles.teacherList} >
                {favorites.map((teacher: Teacher) => {
                    return (
                        <TeacherItem key={teacher.id} teacher={teacher} favorited />
                    )
                })}
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f0f0f7'
    },
    teacherList: {
        marginTop: -40
    },
    proffys: {
        position: 'absolute',
        bottom: 50,
        right: 0,
        flexDirection: 'row'
    },
    proffysDescription: {
        marginLeft: 12,
        color: "#D4C2FF",
        fontFamily: 'Poppins_400Regular'
    }
})

export default Favorites