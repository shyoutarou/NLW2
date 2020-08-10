import React, { useState } from 'react'
import UserForm from '../../components/UserForm'
import { FiEye, FiEyeOff } from 'react-icons/fi'
import goBack from '../../assets/images/icons/back.svg'
import './styles.css'


const RedefinePasswordSuccess = () => {

    const [visible, setVisible] = useState(false)

    return (
        <UserForm flexDirection='row'> 
            <form className="userform-mainform">
            <div className="goback">
                <img src={goBack} alt="voltar"/>
            </div>
                <h3 className="userform-title">Olá, usuário!</h3>
                <p>Redefina sua senha preenchendo os campos abaixo.</p>
                <div className="userform-inputs">
                    <div className="form-input">
                        <input placeholder='Digite sua nova senha' className="userform-top"
                        type={visible ? "text" : "password"}/>
                        <div className="input-border"></div>
                        <div onClick={() => {setVisible(!visible)}} className="eye">
                            {visible ? <FiEye color="#8257e5" size={20} /> :
                            <FiEyeOff color="#8257e5" size={20} />}
                        </div>
                    </div>
                    <div className="form-input">
                        <input placeholder='Confirme sua nova senha' className="userform-bottom"
                        type="password"/>
                        <div className="input-border"></div>
                    </div>
                </div>
                
                <button className='form-button'>Entrar</button>
            </form>
        </UserForm>
    )
}

export default RedefinePasswordSuccess