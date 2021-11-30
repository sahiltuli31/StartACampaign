import React, { useState } from 'react'
import "../css/home.css"
import Ongoing from '../components/Ongoing.js'
import Footer from './Footer'
import Navbar from './Navbar'
import { Link } from 'react-router-dom'
import Users from './Users'
const Home = () => {

    const [navbar, setNavbar] = useState("navbar-dark bg-transparent");
    const changeNavbarColor = () => {
        if (window.pageYOffset > 50) {
            setNavbar("navbar-dark bg-dark ")
        }
        else {
            setNavbar("navbar-dark bg-transparent")
        }
    };
    window.addEventListener('scroll', changeNavbarColor);
    return (
        <>
            <Navbar back={navbar} extra="login-signup" />

            <div className="home-img">
                <div className="container home-info">
                    <h1>  It all starts with </h1>
                    <h1 className="home-info-2"> <span className="home-s">One person...</span> </h1>
                </div>
                <div className="btns">
                    <Link to="/addcampaign" className="btn btn-dark btt">Start a Campaign</Link>
                    <Link to="/ongoing" className="btn btn-dark ">Join a Campaign</Link>
                </div>
            </div>

            <Ongoing />


            <Users />

            <Footer />
        </>
    )
}

export default Home
