import express from 'express';
import jwt from "json-web-token";

const router = express.Router();
// const User = require('../models/User');
import User from "../models/schema.js"

import '../models/connection.js';

// Register a new user
router.post('/register', async (req, res) => {
    const user = new User({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        password: req.body.password,
    });

    if (req.body.password == req.body.confirmpassword) {
        try {
            const savedUser = await user.save();
            res.json(savedUser);
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    }
    else {
        return res.status(200).json({ message: "Password does not match" });
    }
});

// Refer a new user
router.post('/refer', async (req, res) => {
    if (req.body.password == req.body.confirmpassword) {

        const referringUser = await User.findOne({ referralCode: req.body.referralCode });
        //  console.log(referringUser);
        if (!referringUser) {
            return res.status(400).json({ message: 'Invalid referral code' });
        }

        const referredUser = new User({
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            email: req.body.email,
            password: req.body.password,
            referredBy: referringUser._id
        });


        try {
            console.log(referredUser.referralCode);
            const savedUser = await referredUser.save();
            console.log(referredUser.referralCode);

            referringUser.referredUsers.push(savedUser._id);
            referringUser.points += 50; // add points to referring user's account
            await referringUser.save();
            res.json(savedUser);
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    }
    else {
        return res.status(200).json({ message: "Password does not match" });
    }
});

router.post('/login', async (req, res) => {
    var userDetails = req.body;
    var user = await User.findOne({ email: userDetails.email });
    if (user) {
        if (user.password === userDetails.password) {

            let payload = { "subject": user.email };
            let token = jwt.encode("qwdbqkbdkqwd", payload);
            return res.status(200).json({ "token": token, "user": user });
        } else {
            return res.status(401).json({ message: "Invalid credentials" })
        }
    }
    else
        return res.json({ "token": "error" });
})

export default router;
