import React, { useState } from 'react'
import UserForm from '../../components/UserForm'
import { FiEye, FiEyeOff } from 'react-icons/fi'
import goBack from '../../assets/images/icons/back.svg'
import './styles.css'


const Register = () => {

    const [visible, setVisible] = useState(false)

    return (
        <UserForm flexDirection='row'> 
            <form>
            <div className="goback">
                <img src={goBack} alt="voltar"/>
            </div>
                <h3 className="userform-title">Cadastro</h3>
                <p>Preencha os dados abaixo para começar.</p>
                <div className="userform-inputs">
                    <div className="form-input">
                        <input placeholder='Digite seu nome' className="userform-name" type="text" />
                        <div className="input-border"></div>
                    </div>
                    <div className="form-input">
                        <input placeholder='Digite seu e-mail' className="userform-email" type="text" />
                        <div className="input-border"></div>
                    </div>
                    <div className="form-input">
                        <input placeholder='Digite sua senha' className="userform-password"
                        type={visible ? "text" : "password"}/>
                        <div className="input-border"></div>
                        <div onClick={() => {setVisible(!visible)}} className="eye">
                            {visible ? <FiEye color="#8257e5" size={20} /> :
                            <FiEyeOff color="#8257e5" size={20} />}
                        </div>
                    </div>
                    <div className="form-input">
                        <input placeholder='Confirme sua senha' className="userform-confirmpassword"
                        type="password"/>
                        <div className="input-border"></div>
                    </div>
                </div>
                
                <button className='form-button'>Entrar</button>
            </form>
        </UserForm>
    )
}

export default Register