import React from 'react'
import campaignContext from '../context/Campaigncontext'
import { useContext, useEffect } from 'react'
import "../css/ongoing.css";
import Campaign from "./Campaign"
const UserCampaign = (props) => {

    const context = useContext(campaignContext);
    const { usercampaigns, getuserCampaigns } = context;

    useEffect(() => {

        getuserCampaigns();
        // eslint-disable-next-line
    }, []);

    return (
        <>
            <div className="container ongoing ">
                <h1>Campaigns Joined</h1>

                {usercampaigns.map((campaign) => (
                    <Campaign key={campaign._id} btns={false} t={false} name={campaign.name} state={campaign.state} city={campaign.city} head={campaign.head} goal={campaign.head} />
                ))
                }
            </div>
        </>
    )
}

export default UserCampaign
