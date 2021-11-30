import React, { useEffect } from 'react'
import "../css/profile.css"
import Navbar from './Navbar'
import img from "../person.png"
import UserCampaign from './UserCampaign.js'
import { useState } from 'react'
const Profile = () => {




    const [name, Setname] = useState("");
    // eslint-disable-next-line
    const [age, Setage] = useState("");
    const [email, Setemail] = useState("");
    const [city, Setcity] = useState("");
    const [state, Setstate] = useState("");
    const [bio, Setbio] = useState("");

    //Get User Details
    const getDetails = async () => {
        const url = "http://localhost:5000/api/auth/getuser";

        const response = await fetch(url, {
            method: 'GET', // *GET, POST, PUT, DELETE, etc.
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
        });
        const json = await response.json();
        const { name, email, city, state, bio, age } = json;
        Setname(name);
        Setstate(state);
        Setemail(email);
        Setstate(state);
        Setcity(city);
        Setbio(bio);
        Setage(age);
    }

    useEffect(() => {
        getDetails();
    }, [])
    return (
        <div className="profile">
            <Navbar back="navbar-dark bg-dark" />
            <div className="container mt-4 p-3 d-flex justify-content-center">
                <div className="card p-4">
                    <div className=" image d-flex flex-column justify-content-center align-items-center"> <button className="btn btn-secondary"> <img src={img} height="100" width="100" alt="aaaa" /></button>
                        <span className=" name mt-3">{name}</span>
                        <span className="align-items-center bio">@{bio}</span>
                        <span className="bio">From : {city}, {state}</span>
                        <span className="bio">Contact(@) :- {email}</span>
                        <span className="bio">Contribution Rating: ⭐⭐⭐⭐⭐</span>
                        <div className="gap-3 mt-3 icons d-flex flex-row justify-content-center align-items-center"> <span><i className="fa fa-twitter"></i></span> <span><i className="fa fa-facebook-f"></i></span> <span><i className="fa fa-instagram"></i></span> <span><i className="fa fa-linkedin"></i></span> </div>
                        <div className=" px-2 rounded mt-4 date "> <span className="join">Joined Dec,01</span> </div>

                    </div>
                </div>
            </div>
            <UserCampaign />

        </div>

    )
}

export default Profile
