import React, { useState, FormEvent, useEffect } from 'react'
import PageHeader from '../../components/PageHeader'
import Input from '../../components/Input'
import warningIcon from '../../assets/images/icons/warning.svg'
import './styles.css'
import Textarea from '../../components/TextArea'
import Select from '../../components/Select'
import api from '../../services/api'
import { FiCamera } from 'react-icons/fi'
import { useHistory, useLocation } from 'react-router-dom'

interface User {
    id: number
    name: string
    avatar: string
    whatsapp: string
    bio: string
    email: string
    subject: string
    cost: string
}

const Profile = () => {

    interface IClasses {
        class_id: number
        week_day: number
        from: number
        to: number
    }

    const [name, setName] = useState('')
    const [avatar, setAvatar] = useState('')
    const [bio, setBio] = useState('')
    const [whatsapp, setWhatsapp] = useState('')

    const [subject, setSubject] = useState('')
    const [cost, setCost] = useState('')

    const [user, setUser] = useState<User>()

    const [classes, setClasses] = useState<IClasses[]>([])

    useEffect(() => {
        if(localStorage.getItem('token')) {
            api.defaults.headers.authorization = `Bearer ${localStorage.getItem('token')}`
            api.post('/auth').then(res => {
                setUser(res.data)
                setName(res.data.name)
                setAvatar(res.data.avatar)
                setBio(res.data.bio)
                setWhatsapp(res.data.whatsapp)
                setSubject(res.data.subject)
                setCost(res.data.cost)
                api.get(`/classes/${res.data.id}`).then(resp => {
                    setClasses(resp.data)
                    console.log(resp.data)
                }).catch(e => {})
            }).catch(e => history.push('/'))
        } else {
            history.push('/')
        }
    }, [])

    const history = useHistory()

    const handleSaveProfile = async (e: FormEvent) => {
        e.preventDefault()
        try {
            await api.put(`profilesupdate/${user?.id}`, {
                bio, cost, whatsapp, name, subject
            })

            setName(name)
            setWhatsapp(whatsapp)
            setCost(cost)
            setBio(bio)
            setSubject(subject)
        } catch(e) {
            alert('erro ao atualizar o seu perfil!')
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

    const handleDeleteClass = (index: number, class_id: number) => {
        const newArray = classes.filter((scheduleItem, scheduleIndex) => {
            return index !== scheduleIndex
        })

        setClasses(newArray)
    }

    const handleImageUpdate = async (file: File) => {
        const formData = new FormData()
        formData.append('avatar', file)

        try {
            const resp = await api.put(`/profiles/image/${user?.id}`, formData)
            setAvatar(resp.data.avatar)
        } catch(e) {
            alert('erro ao atualizar sua imagem, tente novamente mais tarde!')
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
        <div id='page-profile' className='container'>
            <PageHeader title='' description="">
                <div className="profile-main-info">
                    <div className="profile-image">
                        <img src={`http://localhost:3333/uploads/${avatar}`} alt="user" className="profile-image-picture"/>
                        <label htmlFor="file" className="change-image">
                            <FiCamera size={24} color='white' />
                        </label>
                        <input onChange={e => {
                            if(e.target.files) {
                                handleImageUpdate(e.target.files[0])
                            }
                        }} id="file"
                        type="file" hidden/>
                    </div>
                    <h3>{name}</h3>
                    {subject ? <h2>{subject}</h2> : false}
                </div>
            </PageHeader>

            <main>
                <form onSubmit={handleSaveProfile}>
                    <fieldset>
                        <legend>Seus dados</legend>
                        <Input name="name" label="Nome" value={name}
                        onChange={e => setName(e.target.value)} />
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
                        </legend>
                        
                        {classes.map((scheduleItem, index) => {
                            return (
                                <div key={index}>
                                    <div className="schedule-item">
                                        <Input name='subject' label='Matéria' type='text' value={numberToDay(scheduleItem.week_day)}
                                        readOnly />
                                        <Input name='from' label='das' type='time' value={numberToTime(scheduleItem.from)}
                                        readOnly />
                                        <Input name='to' label='até' type='time' value={numberToTime(scheduleItem.to)}
                                        readOnly />
                                        
                                    </div>
                                    <div className="delete-schedule">
                                        <hr></hr>
                                        <h4 onClick={() => handleDeleteClass(index, scheduleItem.class_id)} className='delete-schedule'>Excluir horário</h4>
                                    </div>
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

export default Profile