import React, { ReactNode } from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'
import { BorderlessButton } from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/native'


interface PageHeaderProps {
    title?: string
    headerRight?: ReactNode
    label: string
}

const PageHeader: React.FC<PageHeaderProps> = ({ title, children, headerRight, label }) => {

    const navigation = useNavigation()

    const handleGoBack = () => {
        navigation.navigate('Landing')
    }

    return (
        <>
            <View style={styles.topBar}>
                <BorderlessButton onPress={handleGoBack}>
                    <Image resizeMode='contain' source={require('../../../assets/images/icons/back.png')} />
                </BorderlessButton>
                <Text style={styles.topBarText}>{label}</Text>
                <Image resizeMode='contain' source={require('../../../assets/images/logo.png')} />
            </View>
            <View style={styles.container}>

                {title && (
                    <View style={styles.header}>
                        <Text style={styles.title}>{title}</Text>
                        {headerRight}
                    </View>
                )}

                

                {children}
            </View>
         </>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 40,
        paddingTop: 0,
        backgroundColor: '#8257e5'
    },
    topBar: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: "#774DD6",
        padding: 40,
        paddingBottom: 20,
        borderColor: "#6842C2",
        borderBottomWidth: 1
    },
    title: {
        fontFamily: 'Archivo_700Bold',
        color: '#fff',
        fontSize: 24,
        lineHeight: 32,
        maxWidth: 160,
        marginVertical: 40
    },
    header: {
        justifyContent: 'space-between'
    },
    topBarText: {
        color: "#D4C2FF",
        fontSize: 14,
        fontFamily: "Archivo_400Regular"
    }
})

export default PageHeader