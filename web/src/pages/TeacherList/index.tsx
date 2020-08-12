import React, { useState, FormEvent, useEffect } from 'react'
import { useLocation, useHistory } from 'react-router-dom'
import BackIcon from '../../assets/images/icons/back.svg'
import LogoImg from '../../assets/images/logo.svg'
import './styles.css'
import PageHeader from '../../components/PageHeader'
import WhatsApp from '../../assets/images/icons/whatsapp.svg'
import TeacherItem from '../../components/TeacherItem'
import Select from '../../components/Select'
import Input from '../../components/Input'
import api from '../../services/api'
import smile from '../../assets/images/icons/smile.svg'

interface User {
    id: number
    name: string
    avatar: string
    whatsapp: string
    bio: string
    email: string
}

interface Teacher {
    id: number
    name: string
    avatar: string
    whatsapp: string
    bio: string
    cost: number
    subject: string
}

const TeacherList = () => {


    const [subject, setSubject] = useState('')
    const [weekDay, setWeekDay] = useState('')
    const [time, setTime] = useState('')
    const [teachers, setTeachers] = useState<Teacher[]>([])

    const [user, setUser] = useState<User>()
    const history = useHistory()

    useEffect(() => {
        if(localStorage.getItem('token')) {
            api.defaults.headers.authorization = `Bearer ${localStorage.getItem('token')}`
            api.post('/auth').then(res => {
                setUser(res.data.user)
            }).catch(e => history.push('/'))
        } else {
            history.push('/')
        }
    }, [])

    const searchTeachers = (e: FormEvent) => {
        e.preventDefault()
        api.get('/classes', {
            params: {
                subject,
                week_day: weekDay,
                time
            }
        }).then(resp => {
            setTeachers(resp.data)
        }).catch(err => {
            alert('erro ao buscar os professores')
        })
    }

    return (
        <div id='page-teacher-list' className='container'>
            <PageHeader title="Estes são os proffys disponíveis.">
                <div className="message-header-list">
                    <img src={smile} alt="rocket"/>
                    <h4>Prepare-se! Vai ser o máximo</h4>
                </div>
                <form onSubmit={searchTeachers} id="search-teachers">
                    <Select value={subject} onChange={e => setSubject(e.target.value)}
                    options={[
                        { value: 'Artes', label: 'Artes' },
                        { value: 'Biologia', label: 'Biologia' },
                        { value: 'Física', label: 'Física' },
                        { value: 'Matemática', label: 'Matemática' },
                        { value: 'Química', label: 'Química' }
                    ]} name="subject" label="Matéria" />
                    <Select value={weekDay} onChange={e => setWeekDay(e.target.value)}
                    options={[
                        { value: '0', label: 'Segunda' },
                        { value: '1', label: 'Terça' },
                        { value: '2', label: 'Quarta' },
                        { value: '3', label: 'Quinta' },
                        { value: '4', label: 'Sexta' },
                        { value: '5', label: 'Sábado' },
                        { value: '6', label: 'Domingo' },
                    ]} name="week_day" label="Dia da semana" />
                    <Input value={time} onChange={e => {setTime(e.target.value)}}
                    name='time' label='Hora' type='time' />
                    <button type='submit'>Buscar</button>
                </form>
            </PageHeader>

            <main>
                {teachers.map(teacher => {
                    return (
                        <TeacherItem key={teacher.id} teacher={teacher}/>
                    )
                })}
            </main>
        </div>
    )
}

export default TeacherList