const express = require("express");
const router = express.Router();
const fetchuser = require("../middleware/fetchuser");
const { body, validationResult } = require("express-validator");
const Campaign = require("../Models/Campaign");

//Route 1:fetch all campaign by GET : "localhost:5000/api/campaigns/fetchallcampaigns". Login needed.
router.get("/fetchallcampaigns", async (req, res) => {
    try {
        const campaign = await Campaign.find();
        res.send(campaign);
    } catch (error) {
        console.log(error);
        res.status(500).send("Some Error Occured ;(");
    }
});

//Route 2:Add campaign by POST : "localhost:5000/api/campaigns/addcampaign".Login needed.
router.post(
    "/addcampaign",
    fetchuser,
    [
        body("name", "Enter a valid name").isLength({ min: 5 }),
        body("goal", "Enter a valid goal").isLength({ min: 5 }),
        body("state", "Enter a valid State").isLength({ min: 5 }),
        body("city", "Enter a valid city").isLength({ min: 5 })
    ],
    async (req, res) => {
        try {
            //getting info from req.body.
            const { username, name, goal, state, city, start_date, end_date } = req.body;

            //if there are errors,return them
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            let idd = req.user.id;
            Campaign.collection.dropIndexes();
            //create new campaign
            const campaign = new Campaign({
                name,
                goal,
                state,
                city,
                head: username,
                start_date,
                end_date,
                progress: 0,
                volunteers: [{ idd }]
            });
            //saving new campaign
            const savedcampaign = await campaign.save();
            res.json({ sucess: "true", savedcampaign });

        }
        catch (error) {
            console.log(error);
            res.json({ sucess: "false" });
        }
    }
);

//Route 3: Add user to existing campaign: PUT "localhost:5000/api/campaigns/adduser/:id".Login needed.
router.put("/adduser", fetchuser, async (req, res) => {
    //create a new campaign object
    const { name } = req.body;

    try {
        const campaign = await Campaign.findOne({ name: name });
        if (!campaign) {

            return res.status(404).send("not foundd");
        }

        //is present already
        const c = await Campaign.findOne({ "volunteers": { idd: req.user.id }, name: name })
        if (c) {

            return res.status(404).send("Already joined");
        }
        Campaign.findOneAndUpdate(
            { name: name },
            { $push: { volunteers: { idd: req.user.id } } },
            function (error, success) {
                if (error) {
                    console.log(error);
                } else {
                    console.log(success);
                }
            });
        res.send("success");
    }
    catch (error) {
        console.log(error);
        res.status(500).send("Some Error Occured ;(");
    }
});

//Route 4: Delete a existing campaign: PUT "localhost:5000/api/campaigns/deletecampaign/:id".Login needed.
router.delete("/deletecampaign", fetchuser, async (req, res) => {
    try {
        // find the campaign to be updated and update it.


        let campaign = await Campaign.findOne({ name: req.body.name });

        if (!campaign) {
            return res.status(404).send("not found");
        }

        //campaign user is different from current user.
        if (campaign.head.toString() !== req.user.id) {
            return res.status(401).send("not Allowed");
        }

        campaign = await Campaign.findOneAndDelete({ head: req.user.id });
        res.send("Success");
    } catch (error) {
        console.log(error);
        res.status(500).send("Some Error Occured ;(");
    }
});

//Route 5: Get all campaigns by a user: PUT "localhost:5000/api/campaigns/getcampaigns".Login needed.
router.get("/getcampaigns", fetchuser, async (req, res) => {
    try {
        // find the campaign to be updated and update it.
        let idd = req.user.id;

        let campaign = await Campaign.find({ 'volunteers': { $elemMatch: { idd: idd } } });

        if (!campaign) {
            return res.status(404).send("nothing found");
        }

        res.send(campaign);
    } catch (error) {
        console.log(error);
        res.status(500).send("Some Error Occured ;(");
    }
});



//Route 6:  get a specific Campaign: PUT "localhost:5000/api/campaigns/getcampaign".Login needed.
router.get("/getcampaign", async (req, res) => {
    try {


        let campaign = await Campaign.findOne({ name: req.body.name });
        if (!campaign) {
            return res.status(404).send("Campaign do not exist");
        }
        res.send(campaign);
    } catch (error) {
        console.log(error);
        res.status(500).send("Some Error Occured ;(");
    }
});



module.exports = router;
