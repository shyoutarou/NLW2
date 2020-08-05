import React from 'react'
import { Link } from 'react-router-dom'
import BackIcon from '../../assets/images/icons/back.svg'
import LogoImg from '../../assets/images/logo.svg'
import './styles.css'
import PageHeader from '../../components/PageHeader'
import WhatsApp from '../../assets/images/icons/whatsapp.svg'
import TeacherItem from '../../components/TeacherItem'
import Input from '../../components/Input'

const TeacherList = () => {
    return (
        <div id='page-teacher-list' className='container'>
            <PageHeader title="Estes são os proffys disponíveis.">
                <form id="search-teachers">
                    <Input name='subject' label='Matéria' />
                    <Input name='week_day' label='Dia da semana' />
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