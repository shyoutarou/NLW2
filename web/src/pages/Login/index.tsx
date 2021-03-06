import React, { useState, FormEvent, useEffect } from 'react'
import UserForm from '../../components/UserForm'
import { FiCheck, FiEye, FiEyeOff } from 'react-icons/fi'
import { FaHeart } from 'react-icons/fa'
import './styles.css'
import { useHistory } from 'react-router-dom'
import api from '../../services/api'

const Login = () => {

    const history = useHistory()

    const [remember, setRemember] = useState(false)
    const [visible, setVisible] = useState(false)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    
    useEffect(() => {
        if(localStorage.getItem('token')) {
            api.defaults.headers.authorization = `Bearer ${localStorage.getItem('token')}`
            api.post('/auth').then(res => {
                history.push('/home', {
                    user: res.data.user
                })
            }).catch(e => history.push('/'))
        } else {
            history.push('/')
        }
    }, [])
    

    const handleLogin = async (e: FormEvent) => {
        e.preventDefault()

        try {
            const res = await api.post('/profiles', {
                email, password
            })

            api.defaults.headers.authorization = res.data.token
            localStorage.setItem('token', res.data.token)

            history.push('/home', {
                user: res.data.user
            })
        } catch(e) {
            return alert('usuario ou senha inválidos!')
        }

    }

    return (
        <UserForm flexDirection='row'>
            <form onSubmit={handleLogin} className="userform-mainform">
                <h3 className="userform-title">Fazer login</h3>
                <div className="userform-inputs">
                    <div className="form-input">
                        <input value={email} onChange={e => setEmail(e.target.value)}
                        placeholder='Digite seu e-mail' className="userform-top" type="text" />
                        <div className="input-border"></div>
                    </div>
                    <div className="form-input">
                        <input value={password} onChange={e => setPassword(e.target.value)}
                        placeholder='Digite sua senha' className="userform-bottom"
                        type={visible ? "text" : "password"}/>
                        <div className="input-border"></div>
                        <div onClick={() => {setVisible(!visible)}} className="eye">
                            {visible ? <FiEye color="#8257e5" size={20} /> :
                            <FiEyeOff color="#8257e5" size={20} />}
                        </div>
                    </div>
                </div>
                <div className="options">
                    <div className="remember">
                        <label className="checkbox-container">
                            <input onChange={e => setRemember(e.target.checked)} checked={remember}
                            type="checkbox"/>
                            <div className="checkbox">
                                {remember && <FiCheck size={16} color='white' />}
                            </div>
                        </label>
                        <p>Lembrar-me</p>
                    </div>
                    <p className="forget-password" onClick={() => history.push('/forgot-password')}>Esqueci minha senha</p>
                </div>
                <button className='form-button'>Entrar</button>
                <div className="userform-signup">
                    <p>Não tem conta? <strong onClick={() => history.push('/register')}>Cadastre-se</strong></p>
                    <span>É de graça <FaHeart className='heart-fa' size={16} color='#8257e5' /></span>
                </div>
            </form>
        </UserForm>
    )
}

export default Login