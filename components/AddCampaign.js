import React from 'react'
import Navbar from './Navbar'
import "../css/addcampaign.css"
import { useState, useContext } from 'react'
import alertContext from '../context/AlertContext'
const AddCampaign = () => {


    const context = useContext(alertContext);
    const { showAlert } = context;
    const { initial } = ({
        username: "",
        name: "",
        enddate: "",
        goal: "",
        state: "",
        city: "",
        startdate: ""
    })
    const [credentials, setcredentials] = useState({
        username: " ",
        name: " ",
        enddate: " ",
        goal: " ",
        state: " ",
        city: " ",
        startdate: " "
    })
    const [n, Setn] = useState(false);
    const [g, Setg] = useState(false);
    const [st, Setst] = useState(false);
    const [ct, Setct] = useState(false);


    const handleChange = (e) => {
        setcredentials({ ...credentials, [e.target.name]: e.target.value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("here");
        const { username, name, goal, state, enddate, city, startdate } = credentials;
        const response = await fetch("http://localhost:5000/api/campaign/addcampaign", {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },

            body: JSON.stringify({ username, name, goal, state, city, enddate, startdate }) // body data type must match "Content-Type" header
        });
        const json = await response.json();

        if (json.sucess) {

            showAlert("Campaign Added", "success");
            setcredentials(initial);
        }
        else {
            showAlert("Failed", "danger");
            if (json.errors) {
                json.errors.map(async (err) => {
                    if (err.param === 'name')
                        Setn(true);
                    if (err.param === 'goal')
                        Setg(true);
                    if (err.param === 'state')
                        Setst(true);
                    if (err.param === 'city')
                        Setct(true);
                })

            }
            setTimeout(() => {
                Setn(false);
                Setst(false);
                Setct(false);
                Setg(false);
            }, 1500);
        }

    }
    return (
        <>
            <div className="background-2">
                <Navbar back="navbar-dark bg-dark" />
                <div className="addcampaign container">
                    <div className="mb-3">
                        <h3>Add Campaign</h3>
                        <form id="myform" onSubmit={handleSubmit}>
                            <label htmlFor="username" className="form-label">Your Name:  </label>
                            <input type="text" className="form-control" id="username" onChange={handleChange} name="username" />
                            <label htmlFor="name" className="form-label">Campaign Name: {n && <span className="error">(Min length: 5)</span>} </label>
                            <input type="text" className="form-control" id="name" onChange={handleChange} name="name" />
                            <label htmlFor="goal" className="form-label">Goal: {g && <span className="error">(Enter Goal)</span>}</label>
                            <input type="text" name="goal" className="form-control" onChange={handleChange} id="goal" />
                            <label htmlFor="state" className="form-label">State: {st && <span className="error">(Enter state)</span>}</label>
                            <input type="text" name="state" className="form-control" onChange={handleChange} id="state" />
                            <label htmlFor="city" className="form-label">City: {ct && <span className="error">(Enter city)</span>}</label>
                            <input type="text" name="city" className="form-control" onChange={handleChange} id="city" />
                            <label htmlFor="startdate" className="form-label">Start Date: (DD-MM-YY)</label>
                            <input type="text" name="startdate" className="form-control" onChange={handleChange} id="startdate" />
                            <label htmlFor="enddate" className="form-label">End Date: (DD-MM-YY)  </label>
                            <input type="text" name="enddate" className="form-control" onChange={handleChange} id="enddate" />
                            <button type="submit" className="btn btn-dark">Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AddCampaign
