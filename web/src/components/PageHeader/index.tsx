import React from 'react'
import { Link } from 'react-router-dom'
import BackIcon from '../../assets/images/icons/back.svg'
import LogoImg from '../../assets/images/logo.svg'
import './styles.css'

interface IPageHeader {
    title: string,
    description?: string
}

const PageHeader: React.FC<IPageHeader> = props => {
    return (
        <header className="page-header">
            <div className="top-bar-container">
                <Link to='/'>
                    <img src={BackIcon} alt="voltar"/>
                </Link>
                <img src={LogoImg} alt="proffy"/>
            </div>
            <div className="header-content">
                <strong>{props.title}</strong>
                {props.description && <p>{props.description}</p>}

                {props.children}
            </div>
        </header>
    )
}

export default PageHeader