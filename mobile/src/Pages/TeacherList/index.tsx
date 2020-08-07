import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import PageHeader from '../../Components/PageHeader'

const TeacherList = () => {
    return (
        <View style={styles.container}>
            <PageHeader title="Proffys disponíveis" />
            <Text>TeacherList</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f0f0f7'
    }
})

export default TeacherList