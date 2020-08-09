import React from 'react'
import UserForm from '../../components/UserForm'
import { FiEye, FiEyeOff } from 'react-icons/fi'
import goBack from '../../assets/images/icons/back.svg'
import './styles.css'

const ForgotPassword = () => {
    return (
        <UserForm flexDirection="row-reverse">
            <form>
                <div className="goback">
                    <img src={goBack} alt="voltar"/>
                </div>
                <h3 className="userform-title">Eita, esqueceu sua senha?</h3>
                <p>Não esquenta, vamos dar um jeito nisso.</p>
                <div className="userform-inputs">
                    <div className="form-input">
                        <input placeholder='Digite seu e-mail' className="userform-email" type="email" />
                        <div className="input-border"></div>
                    </div>
                </div>
                
                <button className='form-button'>Enviar</button>
            </form>
        </UserForm>
    )
}

export default ForgotPassword