import React from 'react'
import campaignContext from '../context/Campaigncontext';
import "../css/ongoing.css";
import { useContext } from 'react';
import { useEffect } from 'react';
import Campaign from './Campaign.js'

const Ongoing = () => {

    const context = useContext(campaignContext);
    const { getallCampaigns, allcampaigns } = context;

    useEffect(() => {
        getallCampaigns();
        // eslint-disable-next-line
    }, [])


    return (
        <>
            <div className="container ongoing ">
                <h1>Ongoing Campaigns</h1>
                {!allcampaigns.length && <h3>No Active Users</h3>}
                {allcampaigns.map((campaign) => (
                    <Campaign key={campaign._id} btns={true} t={true} name={campaign.name} state={campaign.state} city={campaign.city} head={campaign.head} goal={campaign.head} />
                ))
                }
            </div>
        </>
    )
}

export default Ongoing
