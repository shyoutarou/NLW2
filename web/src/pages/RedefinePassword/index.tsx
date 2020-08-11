import React, { useState, FormEvent } from 'react'
import UserForm from '../../components/UserForm'
import { FiEye, FiEyeOff } from 'react-icons/fi'
import goBack from '../../assets/images/icons/back.svg'
import { useParams, useHistory } from 'react-router-dom'
import './styles.css'
import api from '../../services/api'


const RedefinePasswordSuccess = () => {

    interface IParams {
        id: string
        token: string
    }
    
    const params = useParams<IParams>()
    const history = useHistory()

    const [visible, setVisible] = useState(false)
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const handleRedefine = async (e: FormEvent) => {
        e.preventDefault()

        if(!password) {
            return alert('Insira sua nova senha!')
        }

        if(password !== confirmPassword) {
            return alert('As senhas não coincidem!')
        }

        try {
            await api.put(`/profiles/resetpassword/${params.id}`, {
                new_pass: password,
                token: params.token
            })
        } catch(e) {
            alert('Erro ao redefinir a senha, tente novamente mais tarde')
        }

        history.push('/redefine-password-success')

    }

    return (
        <UserForm flexDirection='row'> 
            <form onSubmit={handleRedefine} className="userform-mainform">
                <div className="goback">
                    <img src={goBack} alt="voltar"/>
                </div>
                    <h3 className="userform-title">Olá, usuário!</h3>
                    <p>Redefina sua senha preenchendo os campos abaixo.</p>
                    <div className="userform-inputs">
                        <div className="form-input">
                            <input value={password} onChange={e => setPassword(e.target.value)}
                            placeholder='Digite sua nova senha' className="userform-top"
                            type={visible ? "text" : "password"}/>
                            <div className="input-border"></div>
                            <div onClick={() => {setVisible(!visible)}} className="eye">
                                {visible ? <FiEye color="#8257e5" size={20} /> :
                                <FiEyeOff color="#8257e5" size={20} />}
                            </div>
                        </div>
                        <div className="form-input">
                            <input value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)}
                            placeholder='Confirme sua nova senha' className="userform-bottom"
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