import React from 'react'
import Navbar from './Navbar'
import { useState, useEffect } from 'react';
import User from './User.js';
import "../css/users.css"
import Footer from './Footer';
const Users = () => {

    const host = "http://localhost:5000";

    const [users, Setusers] = useState([]);

    const getallUsers = async () => {
        const url = `${host}/api/auth/getusers`;

        const response = await fetch(url, {
            method: 'GET', // *GET, POST, PUT, DELETE, etc.
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const json = await response.json();
        Setusers(json);
    }
    const [loc, Setloc] = useState(false);
    useEffect(() => {
        getallUsers();
        if (window.location.href === "http://localhost:3000/users")
            Setloc(true);
        else
            Setloc(false);
    }, [])
    return (
        <div className=" container users">
            {loc && <Navbar back="navbar-dark bg-dark" />}
            <h1 className="active-users">Active Volunteers</h1>
            {!users.length && <h3>No Active Volunteers</h3>}
            {users.map((user) => (

                <User name={user.name} city={user.city} state={user.state} email={user.email} />
            ))}
            {loc && <Footer />}
        </div>
    )
}

export default Users
