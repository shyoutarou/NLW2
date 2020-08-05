import React, { useState, useEffect } from 'react'
import LogoImg from '../../assets/images/logo.svg'
import LandingImg from '../../assets/images/landing.svg'
import StudyIcon from '../../assets/images/icons/study.svg'
import GiveClasses from '../../assets/images/icons/give-classes.svg'
import PurpleHeart from '../../assets/images/icons/purple-heart.svg'
import { Link } from 'react-router-dom'
import './styles.css'
import api from '../../services/api'

const Landing = () => {

    const [totalConnections, setTotalConnections] = useState(0)

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