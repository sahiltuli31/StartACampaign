import React, { useState } from 'react'
import { useContext } from 'react'
import "../css/login.css"
import alertContext from "../context/AlertContext"
import { useHistory } from 'react-router-dom'
import Navbar from './Navbar'

function Login() {

    // const host = "http://localhost:5000";
    const history = useHistory();
    const context = useContext(alertContext);
    const { showAlert } = context;
    const [Credentials, setCredentials] = useState({
        email: "",
        password: ""
    })
    const [err, setErr] = useState(false);

    const handleChange = (e) => {
        setCredentials({ ...Credentials, [e.target.name]: e.target.value });
    }
    const handleSubmit = async (e) => {

        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/auth/login", {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            headers: {
                'Content-Type': 'application/json',
            },

            body: JSON.stringify({ email: Credentials.email, password: Credentials.password }) // body data type must match "Content-Type" header
        });
        const json = await response.json();
        if (json.sucess) {
            localStorage.setItem('token', json.authtoken);
            history.push("/");

            showAlert("Logged in !!!", "success")
        }
        else {
            setErr(true);
            setTimeout(() => {
                setErr(false);
            }, 2000);

        }
    }
    return (
        <div className="background">
            <Navbar back="navbar-light bg-transparent" extra="signup" />
            <div className="login">
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <h1>Login</h1>
                        <label htmlFor="email" className="form-label">Email address {err && <span className="error">(Enter Correct Credentials)</span>}</label>
                        <input type="email" className="form-control" id="email" name="email" onChange={handleChange} aria-describedby="emailHelp" />
                        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password {err && <span className="error">(Enter Correct Credentials)</span>}</label>
                        <input type="password" onChange={handleChange} name="password" className="form-control" id="password" />
                    </div>
                    <button type="submit" className="btn btn-dark" >Submit</button>
                </form>
            </div>
        </div>

    )
}

export default Login



