import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import PageHeader from '../../Components/PageHeader'
import TeacherItem from '../../Components/TeacherItem'
import { ScrollView } from 'react-native-gesture-handler'

const TeacherList = () => {
    return (
        <View style={styles.container}>
            <PageHeader title="Proffys disponíveis" />
            <ScrollView contentContainerStyle={{
                paddingHorizontal: 16,
                paddingBottom: 16
            }} style={styles.teacherList} >
                <TeacherItem />
                <TeacherItem />
                <TeacherItem />
                <TeacherItem />
                <TeacherItem />
                <TeacherItem />
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
        marginTop: -60
    }
})

export default TeacherList