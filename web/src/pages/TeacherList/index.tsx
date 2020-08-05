import React from 'react'
import { Link } from 'react-router-dom'
import BackIcon from '../../assets/images/icons/back.svg'
import LogoImg from '../../assets/images/logo.svg'
import './styles.css'
import PageHeader from '../../components/PageHeader'
import WhatsApp from '../../assets/images/icons/whatsapp.svg'
import TeacherItem from '../../components/TeacherItem'
import Select from '../../components/Select'
import Input from '../../components/Input'

const TeacherList = () => {
    return (
        <div id='page-teacher-list' className='container'>
            <PageHeader title="Estes são os proffys disponíveis.">
                <form id="search-teachers">
                    <Select options={[
                        { value: 'Artes', label: 'Artes' },
                        { value: 'Biologia', label: 'Biologia' },
                        { value: 'Física', label: 'Física' },
                        { value: 'Matemática', label: 'Matemática' },
                        { value: 'Química', label: 'Química' }
                    ]} name="subject" label="Matéria" />
                    <Select options={[
                        { value: '0', label: 'Segunda' },
                        { value: '1', label: 'Terça' },
                        { value: '2', label: 'Quarta' },
                        { value: '3', label: 'Quinta' },
                        { value: '4', label: 'Sexta' },
                        { value: '5', label: 'Sábado' },
                        { value: '6', label: 'Domingo' },
                    ]} name="week_day" label="Dia da semana" />
                    <Input name='time' label='Hora' />
                </form>
            </PageHeader>

            <main>
                <TeacherItem />
            </main>
        </div>
    )
}

export default TeacherList