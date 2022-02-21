import React from 'react'
import { Link } from 'react-router-dom'

import '../../App.css'
import LogoImage from '../../assets/images/Hulkappslogo.png'

export default function LandingPage() {
    return (
        <header style={ BackgroundStyle }>
            <div className="logotype" style={logoStyle} ></div>
            <div className="buttons text-center">
                <Link to="/login">
                    <button className="primary-button">log in</button>
                </Link>
                <Link to="/register">
                    <button className="primary-button" id="reg_btn"><span>register </span></button>
                </Link>
            </div>
        </header>
    )
}

export const BackgroundStyle = {
    width: "100%",
    height: "100vh",
    display: 'flex',
    flexDirection:'column',
    background: `url("https://cdn.pixabay.com/photo/2021/08/04/13/06/software-developer-6521720_960_720.jpg")`,
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    justifyContent:'center', 
    alignItems:'center',
}

const logoStyle = {
    width:"50%",
    height: "100px",
    background: `url(${LogoImage})`,
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover"
}