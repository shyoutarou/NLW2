import React, { useState, useEffect } from 'react'
import LogoImg from '../../assets/images/logo.svg'
import LandingImg from '../../assets/images/landing.svg'
import StudyIcon from '../../assets/images/icons/study.svg'
import GiveClasses from '../../assets/images/icons/give-classes.svg'
import PurpleHeart from '../../assets/images/icons/purple-heart.svg'
import { Link, useHistory, useParams, useLocation } from 'react-router-dom'
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

    const [user, setUser] = useState<User>()
    const params = useLocation<{ user: User }>()

    useEffect(() => {
        if(!params.state.user) {
            if(localStorage.getItem('token')) {
                api.defaults.headers.authorization = `Bearer ${localStorage.getItem('token')}`
                api.post('/auth').then(res => {
                    setUser(res.data.user)
                }).catch(e => history.push('/'))
            } else {
                history.push('/')
            }
        } else {
            
        }
    }, [])

    useEffect(() => {
        api.get('/connections').then(resp => {
            setTotalConnections(resp.data.total)
        }).catch(err => {})
    }, [])

    return (
        <div id="page-landing">
            <div id="page-landing-content" className='container'>
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