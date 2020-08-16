import React, { useState } from 'react'
import { View, Text, StyleSheet, Image, ImageBackground, Picker } from 'react-native'
import PageHeader from '../../Components/PageHeader'
import DateTimePicker from '@react-native-community/datetimepicker'
import { RectButton, TextInput, ScrollView, TouchableOpacity } from 'react-native-gesture-handler'

const GiveClasses = () => {

    const [subject, setSubject] = useState('Física')
    const [from, setFrom] = useState('12:00')
    const [to, setTo] = useState('12:00')
    const [editingValue, setEditingValue] = useState('')
    const [showPicker, setShowPicker] = useState(false)

    return (
        <ScrollView>
            <PageHeader label='Meu perfil' title='Que incrível que você quer dar aulas!'>
                <Text style={styles.subtitle}>O primeiro passo é preencher este
                formulário de inscrição.</Text>
            </PageHeader>
            <View style={styles.formContainer}>
                <View style={styles.form}>
                    <Text style={styles.formSessionTitle}>Seus dados</Text>
                    <View style={styles.profileInfo}>
                        <Image source={{
                            uri: 'https://avatars2.githubusercontent.com/u/55261375?s=460&u=3c70552607a82dead0634c03ecf089e1616f2fa1&v=4'
                        }} style={styles.profileInfoImage} />
                        <View style={{ marginLeft: 20 }}>
                            <Text style={styles.profileInfoName}>Breno Macêdo</Text>
                            <Text style={styles.profileInfoSubject}>Física</Text>
                        </View>
                    </View>
                    <Text style={styles.inputLabel}>Whatsapp</Text>
                    <View style={styles.fakeInput}>
                        <Text style={styles.subject}>988178359</Text>
                    </View>
                    <Text style={styles.inputLabel}>Biografia</Text>
                    <View style={[styles.fakeInput,
                        { height: 360, justifyContent: 'flex-start', paddingTop: 10, marginBottom: 10 }]}>
                        <Text style={styles.subject}>Minha biografia aqui!</Text>
                    </View>
                    <Text style={styles.formSessionTitle}>Sobre a aula</Text>

                    <Text style={styles.inputLabel}>Matéria</Text>
                    <View style={styles.fakeInput}>
                        <Text style={styles.subject}>Física</Text>
                    </View>

                    <Text style={styles.inputLabel}>Custo por aula</Text>
                    <View style={styles.fakeInput}>
                        <Text style={styles.subject}>R$ 20,00</Text>
                    </View>

                    <View style={styles.availbleSchedules}>
                        <Text style={[styles.formSessionTitle, { borderBottomWidth: 0 }]}>Horários disponíveis</Text>
                    </View>
                    <View>
                        <Text style={[styles.inputLabel, { alignSelf: 'flex-start' }]}>Dia da semana</Text>
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
                    <RectButton style={styles.button}>
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