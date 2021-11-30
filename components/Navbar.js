import React from 'react'
import img from "../logo.png"
import "../css/navbar.css"
import { Link, useHistory } from 'react-router-dom'
import Alert from './Alert'
import alertContext from '../context/AlertContext'
import { useContext } from 'react'

function Navbar(props) {


    let history = useHistory();
    const context = useContext(alertContext);
    const { showAlert } = context;
    const handleLogout = () => {
        localStorage.removeItem('token');
        history.push("/login");
        showAlert("Logged out!!", "success");
    }


    return (
        <div>
            <nav id="mynav" className={`navbar navbar-expand-lg fixed-top ${props.back}`}>
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/"><img src={img} alt="" className="navbar-img" /></Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className="nav-link active" aria-current="page" to="/home">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link active" to="/ongoing">Ongoing Campaigns</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link active" to="/users">Active Volunteers</Link>
                            </li>
                        </ul>
                        <Alert />
                        <div className="d-flex">
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                {(props.extra === "login" || props.extra === "login-signup") && !localStorage.getItem('token') ? <li className="nav-item">
                                    <Link className="nav-link active" to="/login">Login</Link>
                                </li> : null}
                                {(props.extra === "signup" || props.extra === "login-signup") && !localStorage.getItem('token') ? <li className="nav-item">
                                    <Link className="nav-link active" to="/signup">Signup</Link>
                                </li> : null}
                                {localStorage.getItem('token') ? <li className="nav-item">
                                    <Link className="nav-link active" to="/profile">Profile</Link>
                                </li> : null}
                                {localStorage.getItem('token') ? <li className="nav-item">
                                    <button className="btn btn-light" onClick={handleLogout}>Logout</button>
                                </li> : null
                                }
                            </ul>
                        </div>
                    </div>
                </div>
            </nav >
        </div >
    )
}

export default Navbar
