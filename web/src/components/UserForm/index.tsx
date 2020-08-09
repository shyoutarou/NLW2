import React from 'react'
import logoImage from '../../assets/images/logo.svg'
import details from '../../assets/images/details.svg'
import details2 from '../../assets/images/details2.svg'
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
                    <h3>Fazer login</h3>
                    <input type="text"/>
                    <input type="text"/>
                    <div>
                        <div>
                            <input type="checkbox"/>
                            <p>Lembrar-me</p>
                        </div>
                        <p>Esqueci minha senha</p>
                    </div>
                    <button>Entrar</button>
                </form>
                <div>
                    <p>Não tem conta? <strong>Cadastre-se</strong></p>
                    <p>É de graça s2</p>
                </div>
            </div>
        </div>
    )
}

export default UserForm