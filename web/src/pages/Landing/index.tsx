import React, { useState, useEffect } from 'react'
import LogoImg from '../../assets/images/logo.svg'
import LandingImg from '../../assets/images/landing.svg'
import StudyIcon from '../../assets/images/icons/study.svg'
import GiveClasses from '../../assets/images/icons/give-classes.svg'
import PurpleHeart from '../../assets/images/icons/purple-heart.svg'
import { Link, useHistory, useParams, useLocation } from 'react-router-dom'
import { FiLogOut } from 'react-icons/fi'
import './styles.css'
import api from '../../services/api'


interface User {
    id: number
    name: string
    avatar: string
    whatsapp: string
    bio: string
    email: string
}

const Landing = () => {

    const history = useHistory()

    const [totalConnections, setTotalConnections] = useState(0)

    const [user, setUser] = useState<User>({
        avatar: 'default.png',
        bio: 'loading',
        email: 'loading',
        id: 0,
        name: 'loading',
        whatsapp: '0000000'
    })

    useEffect(() => {
        if(localStorage.getItem('token')) {
            api.defaults.headers.authorization = `Bearer ${localStorage.getItem('token')}`
            api.post('/auth').then(res => {
                setUser(res.data)
                console.log(res.data.avatar)
            }).catch(e => history.push('/'))
        } else {
            history.push('/')
        }
    }, [])

    useEffect(() => {
        api.get('/connections').then(resp => {
            setTotalConnections(resp.data.total)
        }).catch(err => {})
    }, [])

    const handleLogout = () => {
        localStorage.clear()
        history.push('/')
    }

    const handleProfile = () => {
        history.push('/profile', {
            user
        })
    }

    return (
        <div id="page-landing">
            <div id="page-landing-content" className='container'>
                <div className="page-landing-profile">
                    <div onClick={handleProfile} className="page-landing-profile-info">
                        <img src={`http://localhost:3333/uploads/${user.avatar}`} alt="user"/>
                        <h3>{user.name}</h3>
                    </div>
                    <div onClick={handleLogout} className="page-landing-logout">
                        <FiLogOut size={24} color='#D4C2FF' />
                    </div>
                </div>
                <div className="logo-container">
                    <img src={LogoImg} alt="logo"/>
                    <h2>Sua plataforma de estudos online.</h2>
                </div>

                <img src={LandingImg} alt="Plataforma de estudos" className="hero-image"/>

                <div className="buttons-container">
                    <Link to="/study" className="study">
                        <img src={StudyIcon} alt="Estudar"/>
                        Estudar
                    </Link>

                    <Link to="/give-classes" className="give-classes">
                        <img src={GiveClasses} alt="Dar aulas"/>
                        Dar aulas
                    </Link>
                </div>

                <span className="total-connections">
                    Total de {totalConnections} conexões já realizadas <img src={PurpleHeart} alt="sz"/>
                </span>
            </div>
        </div>
    )
}

export default Landing