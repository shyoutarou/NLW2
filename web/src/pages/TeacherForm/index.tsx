import React, { useState, FormEvent, useEffect } from 'react'
import PageHeader from '../../components/PageHeader'
import Input from '../../components/Input'
import warningIcon from '../../assets/images/icons/warning.svg'
import './styles.css'
import Textarea from '../../components/TextArea'
import Select from '../../components/Select'
import api from '../../services/api'
import { useHistory, useLocation } from 'react-router-dom'

interface User {
    id: number
    name: string
    avatar: string
    whatsapp: string
    bio: string
    email: string
}

const TeacherForm = () => {

    interface scheduleItem {
        week_day: string
        from: string
        to: string
    }

    const [name, setName] = useState('')
    const [avatar, setAvatar] = useState('')
    const [bio, setBio] = useState('')
    const [whatsapp, setWhatsapp] = useState('')

    const [subject, setSubject] = useState('')
    const [cost, setCost] = useState('')

    const [user, setUser] = useState<User>()
    const params = useLocation<{ user: User }>()

    useEffect(() => {
        if(!params.state.user) {
            if(localStorage.getItem('token')) {
                api.defaults.headers.authorization = `Bearer ${localStorage.getItem('token')}`
                api.post('/auth').then(res => {
                    setUser(res.data.user)
                }).catch(e => history.push('/'))
            } else {
                history.push('/')
            }
        } else {
            
        }
    }, [])

    const [scheduleItems, setScheduleItems] = useState<scheduleItem[]>([
        { week_day: '0', from: '', to: '' },
    ])

    const history = useHistory()

    const addNewScheduleItem = () => {
        setScheduleItems([...scheduleItems, { week_day: '0', from: '', to: '' }])
    }

    const handleCreateClass = (e: FormEvent) => {
        e.preventDefault()
        api.post('/classes', {
            name,
            avatar,
            whatsapp,
            bio,
            subject,
            cost: Number(cost),
            schedule: scheduleItems
        }).then(resp => {
            alert('cadastro realizado com sucesso')
            history.push('/')
        }).catch(err => alert('erro no cadastro'))
    }

    const setScheduleItemValue = (position: number, field: string, value: string) => {
        const newArray = scheduleItems.map((scheduleItem, index) => {
            if(index === position) {
                return {...scheduleItem, [field]: value}
            }

            return scheduleItem
        })

        setScheduleItems(newArray)
    }

    return (
        <div id='page-teacher-form' className='container'>
            <PageHeader title='Que incrível que você quer dar aulas.'
                description="O primeiro passo é preencher este formulário de inscrição."
            />

            <main>
                <form onSubmit={handleCreateClass}>
                    <fieldset>
                        <legend>Seus dados</legend>
                        <Input name="name" label="Nome completo" value={name}
                        onChange={e => setName(e.target.value)} />
                        <Input name="avatar" label="Avatar" value={avatar}
                        onChange={e => setAvatar(e.target.value)} />
                        <Input name="whatsapp" label="Whatsapp" value={whatsapp}
                        onChange={e => setWhatsapp(e.target.value)} />
                        <Textarea name='bio' label='Biografia' value={bio}
                        onChange={e => setBio(e.target.value)} />
                    </fieldset>

                    <fieldset>
                        <legend>Sobre a aula</legend>
                        <Select value={subject} onChange={e => setSubject(e.target.value)} options={[
                            { value: 'Artes', label: 'Artes' },
                            { value: 'Biologia', label: 'Biologia' },
                            { value: 'Física', label: 'Física' },
                            { value: 'Matemática', label: 'Matemática' },
                            { value: 'Química', label: 'Química' }
                        ]} name="subject" label="Matéria" />
                        <Input value={cost} onChange={e => setCost(e.target.value)}
                        name="cost" label="Custo da sua hora por aula" />
                    </fieldset>

                    <fieldset>
                        <legend>
                            Horários disponíveis
                            <button type='button' onClick={addNewScheduleItem}>+ Novo horário</button>
                        </legend>
                        
                        {scheduleItems.map((scheduleItem, index) => {
                            return (
                                <div key={scheduleItem.week_day} className="schedule-item">
                                    <Select value={scheduleItem.week_day}
                                    onChange={e => setScheduleItemValue(index, 'week_day', e.target.value)}
                                    options={[
                                        { value: '0', label: 'Segunda' },
                                        { value: '1', label: 'Terça' },
                                        { value: '2', label: 'Quarta' },
                                        { value: '3', label: 'Quinta' },
                                        { value: '4', label: 'Sexta' },
                                        { value: '5', label: 'Sábado' },
                                        { value: '6', label: 'Domingo' },
                                    ]} name="week_day" label="Dia da semana" />
                                    <Input name='from' label='das' type='time' value={scheduleItem.from}
                                    onChange={e => setScheduleItemValue(index, 'from', e.target.value)}/>
                                    <Input name='to' label='até' type='time' value={scheduleItem.to}
                                    onChange={e => setScheduleItemValue(index, 'to', e.target.value)}/>
                                </div>
                            )
                        })}
                    </fieldset>

                    <footer>
                        <p>
                            <img src={warningIcon} alt="Aviso importante"/> Importante! <br />
                            Preencha  todos os dados!
                        </p>
                        <button type='submit'>
                            Salvar cadastro
                        </button>
                    </footer>
                </form>
            </main>
        </div>
    )
}

export default TeacherForm