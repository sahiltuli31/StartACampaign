import React from 'react'
import Footer from './Footer.js';
import Navbar from "./Navbar.js";
import Ongoing from "./Ongoing"
const Campaigns = () => {


    return (
        <>
            <Navbar back="navbar-dark bg-dark" />
            <Ongoing />
            <Footer />
        </>
    )
}

export default Campaigns
