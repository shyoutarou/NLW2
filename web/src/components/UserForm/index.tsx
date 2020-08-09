import React, { useState } from 'react'
import logoImage from '../../assets/images/logo.svg'
import details from '../../assets/images/details.svg'
import details2 from '../../assets/images/details2.svg'
import './styles.css'

interface UserFormProps {
    flexDirection: 'row' | 'row-reverse'
}

const UserForm: React.FC<UserFormProps> = ({ children, flexDirection }) => {

    return (
        <div className="userform-container" style={{ flexDirection }}>
            <div className="userform-banner">
                <div className="userform-logo">
                    <img className='userform-logo-details' src={details} alt=""/>
                    <img className='userform-logo-details' src={details2} alt=""/>
                    <img className='userform-logo-proffy' src={logoImage} alt=""/>
                </div>
            </div>
            <div className="userform-form">
                {children}
            </div>
        </div>
    )
}

export default UserForm