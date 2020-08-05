import React from 'react'
import './styles.css'
import WhatsApp from '../../assets/images/icons/whatsapp.svg'
import api from '../../services/api'

interface TeacherItem{
    teacher: {
        id: number
        name: string
        avatar: string
        whatsapp: string
        bio: string
        cost: number
        subject: string
    }
}

const TeacherItem: React.FC<TeacherItem> = ({ teacher }) => {

    const createNewConnection = () => {
        api.post('/connctions', {
            user_id: teacher.id
        })
    }

    return (
        <article className="teacher-item">
                    <header>
                        <img src={teacher.avatar} alt="user"/>
                        <div>
                            <strong>{teacher.name}</strong>
                            <span>{teacher.subject}</span>
                        </div>
                    </header>
                    <p>{teacher.bio}</p>
                    <footer>
                        <p>
                            Preço/hora
                            <strong>R$ {teacher.cost}</strong>
                        </p>
                        <a target="_blank" onClick={createNewConnection} href={`https://wa.me/${teacher.whatsapp}`}
                        type="button">
                            <img src={WhatsApp} alt="zap"/>
                            Entrar em contato
                        </a>
                    </footer>
        </article>
    )
}

export default TeacherItem