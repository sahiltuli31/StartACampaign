import CampaignContext from "./Campaigncontext";
import { useState } from "react";

const CampaignState = (props) => {

    const [allcampaigns, Setallcampaigns] = useState([]);
    const [usercampaigns, Setusercampaigns] = useState([]);
    const [campaign, Setcampaign] = useState([]);

    const host = "http://localhost:5000";
    //Get all Campaign
    const getallCampaigns = async () => {
        const url = `${host}/api/campaign/fetchallcampaigns`;

        const response = await fetch(url, {
            method: 'GET', // *GET, POST, PUT, DELETE, etc.
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const json = await response.json();
        Setallcampaigns(json);
    }

    //add Campaign
    const addCampaign = async (username, name, goal, city, state, startdate, enddate) => {
        const url = `${host}/api/campaign/addcampaign`;

        const response = await fetch(url, {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },

            body: JSON.stringify({
                username,
                name, goal, city, state, startdate, enddate
            }) // body data type must match "Content-Type" header
        });
        const json = await response.json();
        Setallcampaigns(allcampaigns.concat(json));
    }

    //get user campaigns
    const getuserCampaigns = async () => {
        const url = `${host}/api/campaign/getcampaigns`;

        const response = await fetch(url, {
            method: 'GET', // *GET, POST, PUT, DELETE, etc.
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },

            body: JSON.stringify() // body data type must match "Content-Type" header
        });
        const json = await response.json();
        Setusercampaigns(json);
    }

    //add user to campaign
    const addUser = async (name) => {
        const url = `${host}/api/campaign/adduser`;
        await fetch(url, {
            method: 'PUT', // *GET, POST, PUT, DELETE, etc.
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },

            body: JSON.stringify({ name }) // body data type must match "Content-Type" header
        });

    }


    // //delete a Campaign
    // const removeCampaign = async (name) => {

    //     const url = `${host}/api/campaigns/deletecampaign`;
    //     // eslint-disable-next-line
    //     const response = await fetch(url, {
    //         method: 'DELETE', // *GET, POST, PUT, DELETE, etc.
    //         headers: {
    //             'Content-Type': 'application/json',
    //             'auth-token': localStorage.getItem('token')
    //         },
    //         body: JSON.stringify({ name })
    //     });
    //     const newCampaigns = allcampaigns.filter((campaign) => { return campaign.name !== name });
    //     const newuserCampaigns = usercampaigns.filter((campaign) => { return campaign.name !== name });

    //     Setallcampaigns(newCampaigns);
    //     Setusercampaigns(newuserCampaigns);
    // }

    //get Campaign Details
    const getCampaign = async () => {
        const url = `${host}/api/campaign/getcampaign`;
        // eslint-disable-next-line
        const response = await fetch(url, {
            method: 'GET', // *GET, POST, PUT, DELETE, etc.
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify()
        });
        const json = await response.json();
        Setcampaign(json);
    }

    return (
        <CampaignContext.Provider value={{ getallCampaigns, allcampaigns, usercampaigns, campaign, addCampaign, getuserCampaigns, addUser, getCampaign }}>
            {props.children}
        </CampaignContext.Provider>
    )
}

export default CampaignState;