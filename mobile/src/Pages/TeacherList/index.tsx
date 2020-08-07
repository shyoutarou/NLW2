import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import PageHeader from '../../Components/PageHeader'
import TeacherItem from '../../Components/TeacherItem'
import { ScrollView, TextInput, BorderlessButton, RectButton } from 'react-native-gesture-handler'
import { Feather } from '@expo/vector-icons'
import api from '../../services/api'
import AsyncStorage from '@react-native-community/async-storage'

interface Teacher {
    id: number
    avatar: string
    bio: string
    cost: number
    name: string
    subject: string
    whatsapp: string
}

const TeacherList = () => {

    const [isFiltersVisible, setIsFiltersVisible] = useState(false)

    const [subject, setSubject] = useState('')
    const [weekDay, setWeekDay] = useState('')
    const [time, setTime] = useState('')
    const [teachers, setTeachers] = useState<Teacher[]>([])

    const [favorites, setFavorites] = useState<number[]>([])

    const loadFavorites = () => {
        AsyncStorage.getItem('favorites').then(response => {
            if(response) {
                const favoriteTeachers = JSON.parse(response)
                const favoriteTeachersIds = favoriteTeachers.map((item: Teacher) => item.id)

                setFavorites(favoriteTeachersIds)
            }
        }).catch(err => console.log(err))
    }


    const handleToggleFiltersVisible = () => {
        setIsFiltersVisible(!isFiltersVisible)
    }

    const handleFilterSubmit = async () => {
        loadFavorites()
        const resp = await api.get('/classes', {
            params: {
                subject,
                time,
                week_day: weekDay
            }
        })
        setIsFiltersVisible(false)
        setTeachers(resp.data)
    }

    return (
        <View style={styles.container}>
            <PageHeader
            headerRight={(
                <BorderlessButton onPress={handleToggleFiltersVisible}>
                    <Feather name='filter' size={20} color='#fff' />
                </BorderlessButton>
            )}
            title="Proffys disponíveis">
                {isFiltersVisible && (<View style={styles.searchForm}>
                    <Text style={styles.label}>Matéria</Text>
                    <TextInput value={subject} onChangeText={text => setSubject(text)}
                    placeholderTextColor='#c1bccc' style={styles.input} placeholder='Qual a matéria?' />

                    <View style={styles.inputGroup}>
                        <View style={styles.inputBlock}>
                            <Text style={styles.label}>Dia da semana</Text>
                            <TextInput value={weekDay} onChangeText={text => setWeekDay(text)}
                            placeholderTextColor='#c1bccc' style={styles.input} placeholder='Qual o dia?' />
                        </View>
                        <View style={styles.inputBlock}>
                            <Text style={styles.label}>Horário</Text>
                            <TextInput value={time} onChangeText={text => setTime(text)}
                            placeholderTextColor='#c1bccc' style={styles.input} placeholder='Qual o horário?' />
                        </View>
                    </View>
                    <RectButton style={styles.submitButton} onPress={handleFilterSubmit}>
                        <Text style={styles.submitButtonText}>Filtrar</Text>
                    </RectButton>
                </View>)}
            </PageHeader>
            <ScrollView contentContainerStyle={{
                paddingHorizontal: 16,
                paddingBottom: 16
            }} style={styles.teacherList} >
                {teachers.map(teacher => {
                    return (
                        (
                            <TeacherItem favorited={favorites.includes(teacher.id)}
                            teacher={teacher} key={teacher.id} />
                        )
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
    searchForm: {
        marginBottom: 24
    },
    label: {
        color: '#d4c2ff',
        fontFamily: 'Poppins_400Regular'
    },
    input: {
        height: 54,
        backgroundColor: '#fff',
        borderRadius: 8,
        justifyContent: 'center',
        paddingHorizontal: 16,
        marginTop: 4,
        marginBottom: 16
    },
    inputGroup: {
        flexDirection: "row",
        justifyContent: 'space-between'
    },
    inputBlock: {
        width: "48%"
    },
    submitButton: {
        backgroundColor: '#04d363',
        height: 56,
        borderRadius: 8,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        color: 'white'
    },
    submitButtonText: {
        color: "#fff",
        fontFamily: "Archivo_700Bold",
        fontSize: 16
    }
})

export default TeacherList