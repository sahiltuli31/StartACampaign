import React from 'react'
import "../css/campaign.css"
const User = (props) => {

    const { name, email, city, state } = props;
    return (
        <div className="d-flex user">
            <div className=" d-flex align-self-stretch align-items-center  container dd">
                <h3 className="name flex-fill" >&#9675; {name}</h3>
                <h4 className="location flex-fill"> <span className="head-s"> From:</span> {city},{state}</h4>
                <h4 className=" head flex-fill"> <span className="head-s"> Contact: </span>{email}</h4>
            </div>
            <button title="Invite" > <i className="fa fa-plus-circle fa-2x align-self-end" aria-hidden="true"></i></button>
        </div>


    )
}

export default User
