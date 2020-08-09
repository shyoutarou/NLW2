import React from 'react'
import successIcon from '../../assets/images/icons/success-check-icon.svg'
import successDetails from '../../assets/images/success-background.svg'
import './styles.css'

interface SuccessProps {
    title: string
    description: string
    button: string
}

const Success: React.FC<SuccessProps> = ({ title, description, button }) => {
    return (
        <div className="success-container">
            <img className="z1" src={successIcon} alt="sucesso"/>
            <img className="success-details" src={successDetails} alt=""/>
            <h1 className="success-title z1">{title}</h1>
            <p className="success-description z1">{description}</p>
            <button className="success-button z1">{button}</button>
        </div>
    )
}

export default Success