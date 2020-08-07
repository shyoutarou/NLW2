import React from 'react'
import { View, Text, StyleSheet, ScrollView } from 'react-native'
import PageHeader from '../../Components/PageHeader'
import TeacherItem from '../../Components/TeacherItem'

const Favorites = () => {
    return (
        <View style={styles.container}>
            <PageHeader title="Meus proffys favoritos" />
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

export default Favorites