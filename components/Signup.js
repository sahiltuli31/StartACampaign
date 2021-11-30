import React, { useState, useContext } from 'react'
import "../css/signup.css"
import { useHistory } from 'react-router-dom'
import alertContext from '../context/AlertContext';
import Navbar from './Navbar';
const SignUp = () => {
    // const host = "http://localhost:5000";
    const history = useHistory();
    const context = useContext(alertContext);
    const { showAlert } = context;
    const [credentials, setcredentials] = useState({
        name: "",
        email: "",
        age: "",
        city: "",
        state: "",
        password: "",
        cpassword: "",
        bio: ""
    })
    const [name, Setname] = useState(false);
    const [age, Setage] = useState(false);
    const [email, Setemail] = useState(false);
    const [city, Setcity] = useState(false);
    const [state, Setstate] = useState(false);
    const [password, Setpassword] = useState(false);
    const [cpassword, Setcpassword] = useState(false);

    const [email2, Setemail2] = useState(false);

    const handleChange = (e) => {
        setcredentials({ ...credentials, [e.target.name]: e.target.value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (credentials.password !== credentials.cpassword) {
            Setcpassword(true);
            setTimeout(() => {
                Setcpassword(false);
            }, 1500);
        }
        else {
            const { name, age, city, email, state, password, bio } = credentials;
            const response = await fetch("http://localhost:5000/api/auth/createuser", {
                method: 'POST', // *GET, POST, PUT, DELETE, etc.
                headers: {
                    'Content-Type': 'application/json',
                },

                body: JSON.stringify({ name, age, city, state, email, password, bio }) // body data type must match "Content-Type" header
            });
            const json = await response.json();

            if (json.sucess) {
                localStorage.setItem('token', json.authtoken);
                history.push("/");
                showAlert("You are Signed up.", "success");
            }
            else {
                showAlert("Signup Failed");
                if (json.errors) {
                    json.errors.map(async (err) => {
                        if (err.param === 'name')
                            Setname(true);
                        if (err.param === 'age')
                            Setage(true);
                        if (err.param === 'email')
                            Setemail(true);
                        if (err.param === 'city')
                            Setcity(true);
                        if (err.param === 'state')
                            Setstate(true);
                        if (err.param === 'password')
                            Setpassword(true);

                    })
                    setTimeout(() => {
                        Setname(false)
                    }, 1500);
                }
                if (json.error === "Email already used") {
                    Setemail2(true);
                    setTimeout(() => {
                        Setemail2(false)
                    }, 1500);
                }
            }
        }

    }

    return (
        <div className=" background">
            <Navbar back="navbar-light bg-transparent" extra="login" />
            <div className="signup">
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <h3>SignUp</h3>
                        <label htmlFor="name" className="form-label">Your Name: {name && <span className="error">(Min length: 5)</span>} </label>
                        <input type="text" className="form-control" id="name" onChange={handleChange} name="name" aria-describedby="emailHelp" />
                        <label htmlFor="age" className="form-label">Age: {age && <span className="error">(Enter Age,Only Numeric value Allowed)</span>}</label>
                        <input type="text" name="age" className="form-control" onChange={handleChange} id="age" aria-describedby="emailHelp" />
                        <label htmlFor="state" className="form-label">State: {state && <span className="error">(Enter State)</span>}</label>
                        <input type="text" name="state" className="form-control" onChange={handleChange} id="state" aria-describedby="emailHelp" />
                        <label htmlFor="city" className="form-label">City: {city && <span className="error">(Enter City)</span>}</label>
                        <input type="text" name="city" className="form-control" onChange={handleChange} id="city" aria-describedby="emailHelp" />
                        <label htmlFor="bio" className="form-label">Something About yourself!</label>
                        <textarea type="text" name="bio" className="form-control large" onChange={handleChange} id="bio" aria-describedby="inputGroup-sizing-lg" />
                        <label htmlFor="email" className="form-label">Email address: {email && <span className="error">Enter valid Email</span>} {email2 && <span className="error">Email already registered</span>}</label>
                        <input type="email" name="email" className="form-control" onChange={handleChange} id="email" aria-describedby="emailHelp" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password: {password && <span className="error">(Choose better Password(Min length: 5))</span>}</label>
                        <input type="password" name="password" onChange={handleChange} className="form-control" id="password" />
                        <label htmlFor="cpassword" className="form-label">Confirm Password: {cpassword && <span className="error">(Passwords does not match)</span>}</label>
                        <input type="password" name="cpassword" onChange={handleChange} className="form-control" id="cpassword" />
                    </div>
                    <button type="submit" className="btn btn-dark">Submit</button>
                </form>
            </div>
        </div>

    )
}

export default SignUp
