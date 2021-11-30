import React from 'react'
import "../css/campaign.css"
import { useContext } from 'react';
import alertContext from '../context/AlertContext';
import campaignContext from '../context/Campaigncontext';
const Campaigns = (props) => {
    // eslint-disable-next-line
    const { name, state, city, head, t } = props;
    const context = useContext(campaignContext);
    const alert = useContext(alertContext);
    const { showAlert } = alert;
    const { addUser } = context;
    const add = () => {
        addUser(name);
        showAlert("You Joined this Campaign", "success")
    }
    return (
        <div className="d-flex campaign">
            <div className=" d-flex align-self-even align-items-center  container dd">

                <h3 className="name flex-fill" >&#9675; {name}</h3>
                <h4 className="head flex-fill"> <span className="head-s"> Started By:</span> {head}</h4>
                <h4 className="location flex-fill"> <span className="head-s"> Location: </span>{city},{state}</h4>
            </div>
            {props.btns && <button title="Join this Campaign" onClick={add}> <i className="fa fa-plus-circle fa-2x align-self-end" aria-hidden="true"></i></button>}
        </div>
    )
}

export default Campaigns
