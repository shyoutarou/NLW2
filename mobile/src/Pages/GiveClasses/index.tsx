import React, { useState, useContext, useEffect } from 'react'
import { View, Text, StyleSheet, Image, ImageBackground, Picker, Alert } from 'react-native'
import PageHeader from '../../Components/PageHeader'
import DateTimePicker from '@react-native-community/datetimepicker'
import UserContext from '../../Contexts/UserContext'
import { RectButton, TextInput, ScrollView, TouchableOpacity } from 'react-native-gesture-handler'
import api from '../../services/api'
import { useNavigation } from '@react-navigation/native'

const GiveClasses = () => {

    const [day, setDay] = useState(0)
    const [from, setFrom] = useState('12:00')
    const [to, setTo] = useState('12:00')
    const [editingValue, setEditingValue] = useState('')
    const [showPicker, setShowPicker] = useState(false)

    const navigation = useNavigation()
    const User = useContext(UserContext)
    
    const handleAddClass = async () => {
        try {
            await api.post(`/classes/${User.user?.id}`, {
                name: User.user?.name,
                avatar: User.user?.avatar,
                whatsapp: User.user?.whatsapp,
                bio: User.user?.bio,
                subject: User.user?.subject,
                cost: User.user?.cost,
                schedule: [
                    { week_day: day, from, to }
                ]
            })

            navigation.navigate('RegisterClassSuccess')
        } catch(e) {
            Alert.alert('Erro ao cadastrar')
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

    return (
        <ScrollView>
            <PageHeader label='Dar aulas' title='Que incrível que você quer dar aulas!'>
                <Text style={styles.subtitle}>O primeiro passo é preencher este
                formulário de inscrição.</Text>
            </PageHeader>
            <View style={styles.formContainer}>
                <View style={styles.form}>
                    <Text style={styles.formSessionTitle}>Seus dados</Text>
                    <View style={styles.profileInfo}>
                        <Image source={{
                            uri: `http://10.0.0.106:3333/uploads/${User.user?.avatar}`
                        }} style={styles.profileInfoImage} />
                        <View style={{ marginLeft: 20 }}>
                            <Text style={styles.profileInfoName}>{User.user?.name}</Text>
                            <Text style={styles.profileInfoSubject}>{User.user?.subject}</Text>
                        </View>
                    </View>
                    <Text style={styles.inputLabel}>Whatsapp</Text>
                    <View style={styles.fakeInput}>
                        <Text style={styles.subject}>{User.user?.whatsapp}</Text>
                    </View>
                    <Text style={styles.inputLabel}>Biografia</Text>
                    <View style={[styles.fakeInput,
                        { height: 360, justifyContent: 'flex-start', paddingTop: 10, marginBottom: 10 }]}>
                        <Text style={styles.subject}>{User.user?.bio}</Text>
                    </View>
                    <Text style={styles.formSessionTitle}>Sobre a aula</Text>

                    <Text style={styles.inputLabel}>Matéria</Text>
                    <View style={styles.fakeInput}>
                        <Text style={styles.subject}>{User.user?.subject}</Text>
                    </View>

                    <Text style={styles.inputLabel}>Custo por aula</Text>
                    <View style={styles.fakeInput}>
                        <Text style={styles.subject}>R$ {User.user?.cost}</Text>
                    </View>

                    <View style={styles.availbleSchedules}>
                        <Text style={[styles.formSessionTitle, { borderBottomWidth: 0 }]}>Horários disponíveis</Text>
                    </View>
                    <View>
                        <Text style={[styles.inputLabel, { alignSelf: 'flex-start' }]}>Dia da semana</Text>
                        <View>
                        <View style={styles.pickerLabel}>
                            <Text style={styles.subject}>{numberToDay(Number(day))}</Text>
                        </View>
                        <Picker selectedValue={day} onValueChange={val => setDay(val)}
                        style={styles.picker}>
                            <Picker.Item value={0} label='Segunda-Feira' />
                            <Picker.Item value={1} label='Terça-Feira' />
                            <Picker.Item value={2} label='Quarta-Feira' />
                            <Picker.Item value={3} label='Quinta-Feira' />
                            <Picker.Item value={4} label='Sexta-Feira' />
                            <Picker.Item value={5} label='Sábado' />
                            <Picker.Item value={6} label='Domingo' />
                        </Picker>
                    </View>
                        <View style={{ flexDirection: 'row', borderBottomWidth: 1, borderColor: '#ccc',
                        paddingBottom: 24 }}>

                            <View style={{ flex: 1, marginRight: 8 }}>
                                <Text style={styles.inputLabel}>das</Text>
                                <TouchableOpacity onPress={() => {
                                    setShowPicker(true)
                                    setEditingValue('from')
                                }} style={styles.fakeInput}>
                                    <Text style={styles.subject}>{from}</Text>
                                </TouchableOpacity>
                            </View>

                            <View style={{ flex: 1, marginLeft: 8 }}>
                                <Text style={styles.inputLabel}>até</Text>
                                <TouchableOpacity onPress={() => {
                                    setShowPicker(true)
                                    setEditingValue('to')
                                }} style={styles.fakeInput}>
                                    <Text style={styles.subject}>{to}</Text>
                                </TouchableOpacity>
                            </View>

                        </View>    
                    </View>
                    {showPicker && (
                        <DateTimePicker mode='time' value={new Date(Date.now())} onChange={(event, date) => {
                            if(date) {
                                setShowPicker(false)
                                const stringDate = String(date)
                                const stringArray = stringDate.split(' ')[4].split(':')
                                if(editingValue === 'from') {
                                    setFrom(`${stringArray[0]}:${stringArray[1]}`)
                                }

                                if(editingValue === 'to') {
                                    setTo(`${stringArray[0]}:${stringArray[1]}`)
                                }
                            }
                        }} />
                    )}
                    <RectButton onPress={handleAddClass} style={styles.button}>
                        <Text style={styles.buttonText}>
                            Salvar cadastro
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
    },
    subtitle: {
        color: '#D4C2FF',
        fontSize: 16,
        width: 250,
        fontFamily: 'Poppins_400Regular'
    },
    profileInfo: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginTop: 20
    },
    profileInfoImage: {
        width: 64,
        height: 64,
        borderRadius: 32
    },
    profileInfoName: {
        color: '#32264D',
        fontSize: 20,
        fontFamily: 'Archivo_700Bold'
    },
    profileInfoSubject: {
        color: '#6A6180',
        fontFamily: 'Poppins_400Regular',
        fontSize: 20
    }
})

export default GiveClasses