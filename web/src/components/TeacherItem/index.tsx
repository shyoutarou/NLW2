import React from 'react'
import './styles.css'
import WhatsApp from '../../assets/images/icons/whatsapp.svg'

const TeacherItem = () => {
    return (
        <article className="teacher-item">
                    <header>
                        <img src="https://avatars2.githubusercontent.com/u/55261375?s=400&u=3c70552607a82dead0634c03ecf089e1616f2fa1&v=4" alt="user"/>
                        <div>
                            <strong>Breno Macêdo</strong>
                            <span>Física</span>
                        </div>
                    </header>
                    <p>Sim, eu dou aula de física :)</p>
                    <footer>
                        <p>
                            Preço/hora
                            <strong>R$ 100,00</strong>
                        </p>
                        <button type="button">
                            <img src={WhatsApp} alt="zap"/>
                            Entrar em contato
                        </button>
                    </footer>
        </article>
    )
}

export default TeacherItem