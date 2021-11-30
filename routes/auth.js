const express = require("express");
const router = express.Router();
const User = require("../Models/User");
const { body, validationResult } = require("express-validator");
var bcrypt = require("bcrypt");
const fetchuser = require("../middleware/fetchuser");
var jwt = require("jsonwebtoken");

const JWT_SECRET = "maryhadalittlelamb";

//Route 1: create user using POST to "/api/auth/createuser".No login needed.
router.post(
    "/createuser",
    [
        body("email", "Enter a valid e-mail").isEmail(),
        body("password", "Enter a valid password").isLength({ min: 5 }),
        body("name", "Enter a valid name").isLength({ min: 3 }),
        body("age", "Enter Correct age").isFloat({ min: 5, max: 100 }),
        body("city", "Enter valid city").isLength({ min: 3 }),
        body("state", "Enter correct state").isLength({ min: 3 })
    ],
    async (req, res) => {
        let success = false;
        //if there are errors,return them
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ sucess: success, errors: errors.array() });
        }
        //check if user with this email already exist.
        try {
            console.log("here");
            let user = await User.findOne({ email: req.body.email });
            if (user) {
                return res.status(400).json({ sucess: success, error: "Email already used" });
            }
            const salt = await bcrypt.genSalt(10);
            const secpw = await bcrypt.hash(req.body.password, salt);

            user = await User.create({
                name: req.body.name,
                email: req.body.email,
                city: req.body.city,
                state: req.body.state,
                bio: req.body.bio,
                age: req.body.bio,
                password: secpw,
            });
            const data = {
                user: {
                    id: user.id,
                },
            };
            const authtoken = jwt.sign(data, JWT_SECRET);
            success = true;
            //send token
            res.json({ sucess: success, authtoken: authtoken });
        } catch (error) {

            res.status(500).send("Some Error Occured ;(");
        }
    }
);

//Route 2: login user using POST to "/api/auth/login".No login needed.
router.post(
    "/login",
    [
        body("email", "Enter a valid e-mail").isEmail(),
        body("password", "Password can not be blank").exists(),
    ],
    async (req, res) => {
        let sucess = false;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ sucess: sucess, errors: errors.array() });
        }

        const { email, password } = req.body;
        try {
            let user = await User.findOne({ email: email });
            if (!user) {
                return res.status(400).json({ sucess: sucess, error: "Enter Correct Credentials" });
            }
            const passwordcompare = await bcrypt.compare(password, user.password);
            if (!passwordcompare) {
                return res.status(400).json({ sucess: sucess, error: "Enter Correct Credentials" });
            }

            const data = {
                user: {
                    id: user.id,
                },
            };
            const authtoken = jwt.sign(data, JWT_SECRET);
            sucess = true;
            //send token
            res.json({ sucess: sucess, authtoken: authtoken });
        } catch (error) {

            res.status(500).send("Some Error Occured ;(");
        }
    }
);

//Route 3 :get details of logged in user using POST to "/api/auth/login".Login needed.
router.get("/getuser", fetchuser, async (req, res) => {
    try {

        const userID = req.user.id;
        const user = await User.findById(userID).select("-password");
        res.send(user);
    } catch (error) {
        res.status(500).send("Some Error Occured ;(");
    }
});

//Route 4: get user details by email using GET to "/api/auth/getbyemail". No Login needed
router.get("/getbyemail", async (req, res) => {
    try {
        let email = req.body.email;
        const user = await User.findOne({ email: email }).select("-password");
        res.send(user);
    } catch (error) {

        res.status(500).send("Some Error Occured ;(");
    }
})

//Route 5: get all users details using GET to "/api/auth/getusers". No Login needed
router.get("/getusers", async (req, res) => {
    try {
        const user = await User.find().select("-password");
        res.send(user);
    } catch (error) {

        res.status(500).send("Some Error Occured ;(");
    }
})
module.exports = router;
