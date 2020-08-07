import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, ScrollView } from 'react-native'
import PageHeader from '../../Components/PageHeader'
import TeacherItem from '../../Components/TeacherItem'
import api from '../../services/api'
import AsyncStorage from '@react-native-community/async-storage'
import { useFocusEffect } from '@react-navigation/native'

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

    const [favorites, setFavorites] = useState([])

    useFocusEffect(
        React.useCallback(() => {
          loadFavorites();
        }, [])
      )

    const loadFavorites = () => {
        AsyncStorage.getItem('favorites').then(response => {
            if(response) {
                const favoriteTeachers = JSON.parse(response)

                setFavorites(favoriteTeachers)
            }
        }).catch(err => console.log(err))
    }

    return (
        <View style={styles.container}>
            <PageHeader title="Meus proffys favoritos" />
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
    }
})

export default Favorites