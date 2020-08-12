import React, { useState, FormEvent, useEffect } from 'react'
import PageHeader from '../../components/PageHeader'
import Input from '../../components/Input'
import warningIcon from '../../assets/images/icons/warning.svg'
import './styles.css'
import Textarea from '../../components/TextArea'
import Select from '../../components/Select'
import api from '../../services/api'
import rocket from '../../assets/images/icons/rocket.svg'
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
        if(!params.state) {
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
            >
                <div className="message-header">
                    <img src={rocket} alt="rocket"/>
                    <h4>Prepare-se! Vai ser o máximo</h4>
                </div>
            </PageHeader>

            <main>
                <form onSubmit={handleCreateClass}>
                    <fieldset>
                        <legend>Seus dados</legend>
                        <div className="page-teacher-info">
                            <div className="page-teacher-info-user">
                                <img src="https://avatars2.githubusercontent.com/u/55261375?s=460&u=3c70552607a82dead0634c03ecf089e1616f2fa1&v=4" alt="user" className="page-teacher-profile"/>
                                <h3>Breno Macêdo</h3>
                            </div>
                            <Input name="whatsapp" readOnly label="Whatsapp" value={whatsapp} />
                        </div>
                        <Textarea name='bio' readOnly label='Biografia' value={bio} />
                    </fieldset>

                    <fieldset>
                        <legend>Sobre a aula</legend>
                        <Input value='Matemática' readOnly name="subject" label="Matéria" />
                        <Input value='R$ 150' readOnly
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