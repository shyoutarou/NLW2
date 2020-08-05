import React, { useState } from 'react'
import PageHeader from '../../components/PageHeader'
import Input from '../../components/Input'
import warningIcon from '../../assets/images/icons/warning.svg'
import './styles.css'
import Textarea from '../../components/TextArea'
import Select from '../../components/Select'

const TeacherForm = () => {

    interface scheduleItem {
        week_day: string
        from: string
        to: string
    }

    const [scheduleItems, setScheduleItems] = useState<scheduleItem[]>([
        { week_day: '0', from: '', to: '' },
    ])

    const addNewScheduleItem = () => {
        setScheduleItems([...scheduleItems, { week_day: '0', from: '', to: '' }])
    }

    return (
        <div id='page-teacher-form' className='container'>
            <PageHeader title='Que incrível que você quer dar aulas.'
                description="O primeiro passo é preencher este formulário de inscrição."
            />

            <main>
                <fieldset>
                    <legend>Seus dados</legend>
                    <Input name="name" label="Nome completo" />
                    <Input name="avatar" label="Avatar" />
                    <Input name="whatsapp" label="Whatsapp" />
                    <Textarea name='bio' label='Biografia' />
                </fieldset>

                <fieldset>
                    <legend>Sobre a aula</legend>
                    <Select options={[
                        { value: 'Artes', label: 'Artes' },
                        { value: 'Biologia', label: 'Biologia' },
                        { value: 'Física', label: 'Física' },
                        { value: 'Matemática', label: 'Matemática' },
                        { value: 'Química', label: 'Química' }
                    ]} name="subject" label="Matéria" />
                    <Input name="cost" label="Custo da sua hora por aula" />
                </fieldset>

                <fieldset>
                    <legend>
                        Horários disponíveis
                        <button type='button' onClick={addNewScheduleItem}>+ Novo horário</button>
                    </legend>
                    
                    {scheduleItems.map(scheduleItem => {
                        return (
                            <div key={scheduleItem.week_day} className="schedule-item">
                                <Select options={[
                                    { value: '0', label: 'Segunda' },
                                    { value: '1', label: 'Terça' },
                                    { value: '2', label: 'Quarta' },
                                    { value: '3', label: 'Quinta' },
                                    { value: '4', label: 'Sexta' },
                                    { value: '5', label: 'Sábado' },
                                    { value: '6', label: 'Domingo' },
                                ]} name="week_day" label="Dia da semana" />
                                <Input name='from' label='das' type='time' />
                                <Input name='to' label='até' type='time' />
                            </div>
                        )
                    })}
                </fieldset>

                <footer>
                    <p>
                        <img src={warningIcon} alt="Aviso importante"/> Importante! <br />
                        Preencha  todos os dados!
                    </p>
                    <button type='button'>
                        Salvar cadastro
                    </button>
                </footer>
            </main>
        </div>
    )
}

export default TeacherForm