import React from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'
import { BorderlessButton } from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/native'


interface PageHeaderProps {
    title: string
}

const PageHeader: React.FC<PageHeaderProps> = ({title}) => {

    const navigation = useNavigation()

    const handleGoBack = () => {
        navigation.navigate('Landing')
    }

    return (
         <View style={styles.container}>
             <View style={styles.topBar}>
                <BorderlessButton onPress={handleGoBack}>
                    <Image resizeMode='contain' source={require('../../../assets/images/icons/back.png')} />
                </BorderlessButton>

                <Image resizeMode='contain' source={require('../../../assets/images/logo.png')} />
             </View>

             <Text style={styles.title}>{title}</Text>
         </View>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 40,
        backgroundColor: '#8257e5'
    },
    topBar: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    title: {
        fontFamily: 'Archivo_700Bold',
        color: '#fff',
        fontSize: 24,
        lineHeight: 32,
        maxWidth: 160,
        marginVertical: 40
    }
})

export default PageHeader