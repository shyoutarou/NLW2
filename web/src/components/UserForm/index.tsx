import React from 'react'
import logoImage from '../../assets/images/logo.svg'
import details from '../../assets/images/details.svg'
import details2 from '../../assets/images/details2.svg'
import { FiCheck, FiHeart } from 'react-icons/fi'
import { FaHeart } from 'react-icons/fa'
import './styles.css'

const UserForm = () => {
    return (
        <div className="userform-container">
            <div className="userform-banner">
                <div className="userform-logo">
                    <img className='userform-logo-details' src={details} alt=""/>
                    <img className='userform-logo-details' src={details2} alt=""/>
                    <img className='userform-logo-proffy' src={logoImage} alt=""/>
                </div>
            </div>
            <div className="userform-form">
                <form>
                    <h3 className="userform-title">Fazer login</h3>
                    <div className="userform-inputs">
                        <input placeholder='Digite seu e-mail' className="userform-email" type="text"/>
                        <input placeholder='Digite sua senha' className="userform-password" type="text"/>
                    </div>
                    <div className="options">
                        <div className="remember">
                            <div className="checkbox">
                                <FiCheck size={16} color='white' />
                            </div>
                            <p>Lembrar-me</p>
                        </div>
                        <p className="forget-password">Esqueci minha senha</p>
                    </div>
                    <button className='form-button'>Entrar</button>
                    <div className="userform-signup">
                        <p>Não tem conta? <strong>Cadastre-se</strong></p>
                        <span>É de graça <FaHeart className='heart-fa' size={16} color='#8257e5' /></span>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default UserForm