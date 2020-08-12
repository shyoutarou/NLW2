import React, { useState, FormEvent } from 'react'
import UserForm from '../../components/UserForm'
import { FiEye, FiEyeOff } from 'react-icons/fi'
import goBack from '../../assets/images/icons/back.svg'
import './styles.css'
import { useHistory } from 'react-router-dom'
import api from '../../services/api'


const Register = () => {

    const history = useHistory()

    const [visible, setVisible] = useState(false)
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()

        if(!name || !email || !password || !confirmPassword) {
            return alert('Preencha o formulario!')
        }

        if(password !== confirmPassword) {
            return alert('As senhas não conferem!')
        }

        try {
            await api.post('/users', {
                name, email, password,
                whatsapp: '',
                bio: '',
                avatar: 'default.png',
                subject: ''
            })
        } catch(e) {
            return alert('Erro ao cadastrar, tente novamente mais tarde!')
        }

        history.push('/register-success')
    }

    return (
        <UserForm flexDirection='row'> 
            <form onSubmit={handleSubmit} className="userform-mainform">
            <div onClick={() => history.goBack()} className="goback">
                <img src={goBack} alt="voltar"/>
            </div>
                <h3 className="userform-title">Cadastro</h3>
                <p>Preencha os dados abaixo para começar.</p>
                <div className="userform-inputs">
                    <div className="form-input">
                        <input value={name} onChange={e => setName(e.target.value)}
                        placeholder='Digite seu nome' className="userform-top" type="text" />
                        <div className="input-border"></div>
                    </div>
                    <div className="form-input">
                        <input value={email} onChange={e => setEmail(e.target.value)}
                        placeholder='Digite seu e-mail' className="userform-middle" type="email" />
                        <div className="input-border"></div>
                    </div>
                    <div className="form-input">
                        <input value={password} onChange={e => setPassword(e.target.value)}
                        placeholder='Digite sua senha' className="userform-middle"
                        type={visible ? "text" : "password"}/>
                        <div className="input-border"></div>
                        <div onClick={() => {setVisible(!visible)}} className="eye">
                            {visible ? <FiEye color="#8257e5" size={20} /> :
                            <FiEyeOff color="#8257e5" size={20} />}
                        </div>
                    </div>
                    <div className="form-input">
                        <input value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)}
                        placeholder='Confirme sua senha' className="userform-bottom"
                        type="password"/>
                        <div className="input-border"></div>
                    </div>
                </div>
                
                <button className='form-button'>Registrar</button>
            </form>
        </UserForm>
    )
}

export default Register