import React, { useState, useContext, useEffect } from 'react'
import { View, Text, StyleSheet, Image, ImageBackground, Picker, Alert } from 'react-native'
import PageHeader from '../../Components/PageHeader'
import { Feather } from '@expo/vector-icons'
import { RectButton, TextInput, ScrollView, TouchableOpacity } from 'react-native-gesture-handler'
import UserContext from '../../Contexts/UserContext'
import api from '../../services/api'
import * as Permissions from 'expo-permissions'
import * as ImagePicker from 'expo-image-picker'
import Constants from 'expo-constants'

const Profile = () => {

    interface ISchedule {
        id: number
        subject: string
        cost: number
        user_id: number
        week_day: number
        from: number
        to: number
        class_id: number
    }

    const User = useContext(UserContext)
    useEffect(() => {
        api.get<ISchedule[]>(`classes/${User.user?.id}`).then(resp => {
            setSchedules(resp.data)
        }).catch(err => {})
    }, [])

    const [name, setName] = useState(User.user?.name)
    const [whatsapp, setWhatsapp] = useState(User.user?.whatsapp)
    const [bio, setBio] = useState(User.user?.bio)
    const [cost, setCost] = useState(String(User.user?.cost))
    const [subject, setSubject] = useState(User.user?.subject)
    const [schedules, setSchedules] = useState<ISchedule[]>([])

    useEffect(() => {
        getPermissionAsync()
    }, [])

    const getPermissionAsync = async () => {
        if (Constants.platform?.ios) {
          const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL)
          if (status !== 'granted') {
            alert('Sorry, we need camera roll permissions to make this work!')
          }
        }
    }

    const pickImage = async () => {
        try {
          let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
            exif: true
          });
          if (!result.cancelled) {
            const formData = new FormData()
            formData.append('avatar', {
                name: `${Date.now()}.png`,
                type: 'image/png',
                uri: result.uri
            } as unknown as Blob)
            const newAvatar = await api.put(`profiles/image/${User.user?.id}`, formData)
            if(User.user) {
                User.setUser({
                    avatar: newAvatar.data.avatar,
                    name: User.user?.name,
                    email: User.user?.email,
                    bio: User.user?.bio,
                    whatsapp: User.user?.whatsapp,
                    id: User.user?.id,
                    cost: User.user?.cost,
                    subject: User.user?.subject
                })
            }
          }
    
        } catch (E) {
          console.log(E)
        }
    }

    const handleUpdate = async () => {
        try {
            api.put(`profilesupdate/${User.user?.id}`, {
                whatsapp, name, bio, cost, subject
            })

            if(User.user?.avatar && whatsapp && name && bio && cost && subject) {
                User.setUser({
                    avatar: User.user?.avatar,
                    whatsapp,
                    name,
                    bio,
                    cost: Number(cost),
                    subject,
                    id: User.user?.id,
                    email: User.user?.email
                })
            }

            Alert.alert('Usuário atualizado com sucesso!')
        } catch(e) {
            Alert.alert('Erro ao atualizar seu usuário')
        }
    }

    const numberToDay = (number: number) => {
        switch(number){
            case 0:
                return 'Segunda-Feira';
            case 1:
                return 'Terça-Feira';
            case 2:
                return 'Quarta-Feira';
            case 3:
                return 'Quinta-Feira';
            case 4:
                return 'Sexta-Feira';
            case 5:
                return 'Sábado';
            case 6:
                return 'Domingo';
        }
    }

    const numberToTime = (number: number) => {
        const first = Math.floor(number / 60)
        const firstString = String(first)
        const firstStringFinal = firstString.length === 1 ? `0${firstString}` : firstString

        const second = Math.floor(number % 60)
        const secondString = String(second)
        const secondStringFinal = secondString.length === 1 ? `0${secondString}` : secondString

        return `${firstStringFinal}:${secondStringFinal}`
    }

    const handleDeleteClass = async (index: number, class_id: number) => {

        await api.delete(`/classes/${class_id}`)

        const newArray = schedules.filter((scheduleItem, scheduleIndex) => {
            return index !== scheduleIndex
        })

        setSchedules(newArray)
    }

    return (
        <ScrollView>
            <PageHeader label='Meu perfil'>
                <ImageBackground resizeMode='contain' source={require('../../../assets/images/background.png')}
                style={styles.profileImage}>
                    <View>
                        <Image style={styles.profileImagePic} source={{
                            uri: `http://10.0.0.106:3333/uploads/${User.user?.avatar}`
                        }} />
                        <RectButton onPress={pickImage} style={styles.profileChangeImage}>
                            <Feather color='white' size={20} name='camera' />
                        </RectButton>
                    </View>
                    <Text style={styles.profileName}>{User.user?.name}</Text>
                    <Text style={styles.profileSubject}>{User.user?.subject}</Text>
                </ImageBackground>
            </PageHeader>
            <View style={styles.formContainer}>
                <View style={styles.form}>
                    <Text style={styles.formSessionTitle}>Seus dados</Text>
                    <Text style={styles.inputLabel}>Nome</Text>
                    <TextInput value={name} onChangeText={t => setName(t)}
                    placeholder='Nome' style={styles.input} />
                    <Text style={styles.inputLabel}>Whatsapp</Text>
                    <TextInput value={whatsapp} onChangeText={t => setWhatsapp(t)}
                    placeholder='Whatsapp' style={styles.input} />
                    <Text style={styles.inputLabel}>Biografia</Text>
                    <TextInput value={bio} onChangeText={t => setBio(t)}
                    textAlignVertical="top" numberOfLines={20} multiline={true} placeholder='Biografia' style={styles.largeInput} />
                    <Text style={styles.formSessionTitle}>Sobre a aula</Text>
                    <Text style={styles.inputLabel}>Matéria</Text>
                    <View>
                        <View style={styles.pickerLabel}>
                            <Text style={styles.subject}>{subject}</Text>
                        </View>
                        <Picker selectedValue={subject} onValueChange={val => setSubject(val)}
                        style={styles.picker}>
                            <Picker.Item value='Matemática' label='Matemática' />
                            <Picker.Item value='Artes' label='Artes' />
                            <Picker.Item value='Biologia' label='Biologia' />
                            <Picker.Item value='Física' label='Física' />
                            <Picker.Item value='Química' label='Química' />
                        </Picker>
                    </View>
                    
                    <Text style={styles.inputLabel}>Custo por aula</Text>
                    <TextInput value={cost} onChangeText={t => setCost(t)}
                    placeholder='Custo por aula' style={[styles.input]} />
                    <View style={styles.availbleSchedules}>
                        <Text style={[styles.formSessionTitle, { borderBottomWidth: 0 }]}>Horários disponíveis</Text>
                
                    </View>
                    <View>
                        {schedules.map((schedule, index) => {
                            return (
                                <View key={index} style={{ alignItems: 'center' }}>
                                    <Text style={[styles.inputLabel, { alignSelf: 'flex-start' }]}>Dia da semana</Text>
                                    <View style={styles.fakeInput}>
                                        <Text style={styles.subject}>{numberToDay(schedule.week_day)}</Text>
                                    </View>
                                    <View style={{ flexDirection: 'row', borderBottomWidth: 1, borderColor: 'red',
                                    paddingBottom: 24 }}>

                                        <View style={{ flex: 1, marginRight: 8 }}>
                                            <Text style={styles.inputLabel}>das</Text>
                                            <View style={styles.fakeInput}>
                                                <Text style={styles.subject}>{numberToTime(schedule.from)}</Text>
                                            </View>
                                        </View>

                                        <View style={{ flex: 1, marginLeft: 8 }}>
                                            <Text style={styles.inputLabel}>até</Text>
                                            <View style={styles.fakeInput}>
                                                <Text style={styles.subject}>{numberToTime(schedule.to)}</Text>
                                            </View>
                                        </View>

                                    </View>    
                                    <Text onPress={() => handleDeleteClass(index, schedule.class_id)} style={styles.deleteSchedule}>Excluir horário</Text>
                                </View>
                            )
                        })}
                    </View>
                    <RectButton onPress={handleUpdate} style={styles.button}>
                        <Text style={styles.buttonText}>
                            Salvar alterações
                        </Text>
                    </RectButton>
                </View>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    profileImage: {
        marginTop: 50,
        alignItems: 'center',
        justifyContent: 'center'
    },
    profileImagePic: {
        width: 140,
        height: 140,
        borderRadius: 70,
    },
    profileChangeImage: {
        width: 40,
        height: 40,
        backgroundColor: '#04D361',
        borderRadius: 20,
        position: 'absolute',
        right: 0,
        bottom: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
    profileName: {
        fontFamily: 'Archivo_700Bold',
        fontSize: 24,
        color: 'white',
        marginTop: 20
    },
    profileSubject: {
        fontFamily: 'Poppins_400Regular',
        fontSize: 16,
        color: '#D4C2FF'
    },
    formContainer: {
        padding: 20
    },
    form: {
        borderRadius: 8,
        backgroundColor: '#FFFFFF',
        padding: 20
    },
    formSessionTitle: {
        fontFamily: 'Archivo_700Bold',
        color: '#32264D',
        fontSize: 24,
        borderColor: "#E6E6F0",
        borderBottomWidth: 1,
        paddingBottom: 4
    },
    input: {
        width: "100%",
        height: 56,
        backgroundColor: "#FAFAFC",
        borderColor: "#E6E6F0",
        borderWidth: 1,
        borderRadius: 8,
        marginTop: 8,
        paddingLeft: 12,
        color: "#6A6180",
        fontFamily: "Poppins_400Regular"
    },
    inputLabel: {
        fontSize: 12,
        color: "#9C98A6",
        fontFamily: "Poppins_400Regular",
        marginTop: 16
    },
    largeInput: {
        width: "100%",
        height: 360,
        backgroundColor: "#FAFAFC",
        borderColor: "#E6E6F0",
        borderWidth: 1,
        borderRadius: 8,
        marginTop: 8,
        paddingLeft: 12,
        color: "#6A6180",
        fontFamily: "Poppins_400Regular",
        paddingTop: 12,
        marginBottom: 12
    },
    pickerLabel: {
        width: "100%",
        height: 56,
        backgroundColor: "#FAFAFC",
        borderColor: "#E6E6F0",
        borderWidth: 1,
        borderRadius: 8,
        paddingLeft: 12,
        color: "#6A6180",
        fontFamily: "Poppins_400Regular",
        position: 'absolute',
        justifyContent: 'center'
    },
    picker: {
        opacity: 0,
        backgroundColor: "#fff"
    },
    subject: {
        color: "#6A6180",
        fontFamily: "Poppins_400Regular"
    },
    availbleSchedules: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderColor: "#E6E6F0",
        borderBottomWidth: 1,
        paddingBottom: 4
    },
    newSchedule: {
        color: "#8257E5",
        fontFamily: 'Poppins_600SemiBold',
        fontSize: 14
    },
    fakeInput: {
        width: "100%",
        height: 56,
        backgroundColor: "#FAFAFC",
        borderColor: "#E6E6F0",
        borderWidth: 1,
        borderRadius: 8,
        paddingLeft: 12,
        color: "#6A6180",
        fontFamily: "Poppins_400Regular",
        justifyContent: 'center'
    },
    deleteSchedule: {
        color: 'red',
        fontFamily: 'Poppins_600SemiBold',
        fontSize: 16,
        backgroundColor: 'white',
        padding: 4,
        position: 'absolute',
        bottom: -18,
        textAlign: 'center'
    },
    button: {
        backgroundColor: '#04D361',
        height: 56,
        width: '100%',
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 24
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontFamily: 'Poppins_600SemiBold'
    }
})

export default Profile