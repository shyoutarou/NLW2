import React from 'react'
import LogoImg from '../../assets/images/logo.svg'
import LandingImg from '../../assets/images/landing.svg'
import StudyIcon from '../../assets/images/icons/study.svg'
import GiveClasses from '../../assets/images/icons/give-classes.svg'
import PurpleHeart from '../../assets/images/icons/purple-heart.svg'
import { Link } from 'react-router-dom'
import './styles.css'

const Landing = () => {
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
                    Total de 200 conexões já realizadas <img src={PurpleHeart} alt="sz"/>
                </span>
            </div>
        </div>
    )
}

export default Landing