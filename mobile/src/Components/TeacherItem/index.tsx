import React, { useState } from 'react'
import { View, Text, StyleSheet, Image, Linking } from 'react-native'
import { RectButton } from 'react-native-gesture-handler'
import AsyncStorage from '@react-native-community/async-storage'

interface Teacher {
    teacher: TeacherProps
    favorited: boolean
}

interface TeacherProps {
    id: number
    avatar: string
    bio: string
    cost: number
    name: string
    subject: string
    whatsapp: string
}

const TeacherItem: React.FC<Teacher> = ({ teacher, favorited }) => {

    const [isFavorited, setIsFavorited] = useState(favorited)

    const handleWhatsapp = () => {
        Linking.openURL(`whatsapp://send?phone=${teacher.whatsapp}`)
    }

    const handleToggleFavorite = async () => {
        const favorites = await AsyncStorage.getItem('favorites')
        let favoritesArray = []

        if(favorites) {
            favoritesArray = JSON.parse(favorites)
        }

        if(isFavorited) {
            const favoriteIndex = favoritesArray.findIndex((teacherItem: TeacherProps) => {
                return teacherItem.id === teacher.id
            })

            favoritesArray.splice(favoriteIndex, 1)
            setIsFavorited(false)
        } else {
            

            favoritesArray.push(teacher)
            setIsFavorited(true)
        }
        await AsyncStorage.setItem('favorites', JSON.stringify(favoritesArray))
    }

    return (
        <View style={styles.container}>
            <View style={styles.profile}>
                <Image source={{
                    uri: 'https://github.com/brenomacedo.png'
                }} style={styles.avatar} />

                <View style={styles.profileInfo}>
                    <Text style={styles.name}>{teacher.name}</Text>
                    <Text style={styles.subject}>{teacher.subject}</Text>
                </View>
            </View>

            <Text style={styles.bio}>{teacher.bio}</Text>

            <View style={styles.footer}>
                <Text style={styles.price}>
                    Preço/hora {'   '}
                    <Text style={styles.priceValue}>R$ {teacher.cost}</Text>
                </Text>

                <View style={styles.buttonsContainer}>
                    <RectButton onPress={handleToggleFavorite}
                    style={[styles.favoriteButton, isFavorited ? styles.favorited : {}]}>
                        {isFavorited ? <Image source={require('../../../assets/images/icons/heart-outline.png')} /> :
                        <Image source={require('../../../assets/images/icons/unfavorite.png')} />}
            
                        
                    </RectButton>

                    <RectButton onPress={handleWhatsapp} style={styles.contactButton}>
                        <Image source={require('../../../assets/images/icons/whatsapp.png')} />
                        <Text style={styles.contactButtonText}>Entrar em contato</Text>
                    </RectButton>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: '#e6e6f0',
        borderRadius: 8,
        marginBottom: 16,
        overflow: 'hidden'
    },
    profile: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 24
    },
    avatar: {
        width: 64,
        height: 64,
        borderRadius: 32,
        backgroundColor: '#eee'
    },
    profileInfo: {
        marginLeft: 16
    },
    name: {
        fontFamily: 'Archivo_700Bold',
        color: '#32264d',
        fontSize: 20
    },
    subject: {
        fontFamily: 'Poppins_400Regular',
        color: '#6a6180',
        fontSize: 12,
        marginTop: 4
    },
    bio: {
        marginHorizontal: 24,
        fontFamily: 'Poppins_400Regular',
        fontSize: 14,
        lineHeight: 24,
        color: '#6a6180'
    },
    footer: {
        backgroundColor: '#fafafc',
        padding: 24,
        alignItems: 'center',
        marginTop: 24
    },
    price: {
        fontFamily: 'Poppins_400Regular',
        color: '#6a6180',
        fontSize: 14
    },
    priceValue: {
        fontFamily: 'Archivo_700Bold',
        color: '#8257e5',
        fontSize: 16
    },
    buttonsContainer: {
        flexDirection: 'row',
        marginTop: 16
    },
    favoriteButton: {
        backgroundColor: '#8257e5',
        width: 56,
        height: 56,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 8
    },
    contactButton: {
        backgroundColor: '#04d363',
        flex: 1,
        height: 56,
        borderRadius: 8,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 8
    },
    contactButtonText: {
        color: '#fff',
        fontFamily: 'Archivo_700Bold',
        fontSize: 16,
        marginLeft: 16
    },
    favorited: {
        backgroundColor: '#e33d3d'
    }
})

export default TeacherItem