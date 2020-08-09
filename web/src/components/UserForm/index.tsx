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
                    <img width='300' className='userform-logo-proffy' src={logoImage} alt=""/>
                </div>
            </div>
            <div className="userform-form">

            </div>
        </div>
    )
}

export default UserForm