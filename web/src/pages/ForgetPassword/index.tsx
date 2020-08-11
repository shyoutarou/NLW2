import React, { useState, FormEvent } from 'react'
import UserForm from '../../components/UserForm'
import goBack from '../../assets/images/icons/back.svg'
import './styles.css'
import { useHistory } from 'react-router-dom'
import api from '../../services/api'

const ForgotPassword = () => {

    const history = useHistory()
    const [email, setEmail] = useState('')

    const handleReset = async (e: FormEvent) => {
        e.preventDefault()

        try {
            await api.post('/profiles/resetpassword', {
                email
            })
        } catch(e) {
            return alert('Email inexistente!')
        }

        history.push('/forgot-password-success')
    }

    return (
        <UserForm flexDirection="row-reverse">
            <form onSubmit={handleReset} className="userform-mainform">
                <div onClick={() => history.goBack()} className="goback">
                    <img src={goBack} alt="voltar"/>
                </div>
                <h3 className="userform-title">Eita, esqueceu sua senha?</h3>
                <p>Não esquenta, vamos dar um jeito nisso.</p>
                <div className="userform-inputs">
                    <div className="form-input">
                        <input value={email} onChange={e => setEmail(e.target.value)}
                        placeholder='Digite seu e-mail' className="userform-unique" type="email" />
                        <div className="input-border"></div>
                    </div>
                </div>
                
                <button className='form-button'>Enviar</button>
            </form>
        </UserForm>
    )
}

export default ForgotPassword