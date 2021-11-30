import React from 'react'
import img from "../logo.png"
import "../css/footer.css"

const Footer = () => {
    return (
        <div className="footer">
            <a className="navbar-brand" href="/"><img src={img} alt="" /></a>
            <div className="row">
                <div className="col-3">
                    <h5>Create Account</h5>
                    <h5>login</h5>
                    <h5>Start A Camapign</h5>

                </div>
                <div className="col-3">
                    <h5>Signup</h5>
                    <h5>Invite Volunteers</h5>
                    <h5>Campaigns</h5>

                </div>
            </div>
        </div>
    )
}

export default Footer
