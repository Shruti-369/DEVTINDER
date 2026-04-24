const express = require('express');
const authRouter = express.Router();
const { validateSignUpData, validateLoginData } = require("../utils/validation");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();


authRouter.post("/signup", async (req, res) => {
    // Validation of data
    try {
        validateSignUpData(req);
    } catch (err) {
        return res.status(400).json({ error: err.message });
    }

    // Hashing the password before saving to the database
    const { password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10); // 10 is the salt rounds
    console.log("Hashed Password:", hashedPassword);
    req.body.password = hashedPassword;

    //creating a new instance of User model and saving it to the database
    try {
        const user = new User(req.body);
        await user.save();
        res.json({ message: "User created successfully!", user });
    } catch (err) {
        console.error("Signup error:", err);
        res.status(500).json({ error: err.message });
    }
});

authRouter.post("/login", async (req, res) => {
    try {
        validateLoginData(req);
    } catch (err) {
        return res.status(400).json({ error: err.message });
    }

    try {
        const { emailId, password } = req.body;
        //find user in db with the provided emailId
        const user = await User.findOne({ emailId: emailId });
        if (!user) {
            throw new Error("Invalid credentials");
        }
        //compare the provided password with the hashed password stored in the database using bcrypt.compare() method
        const isPasswordValid = await user.validatePassword(password);
        if (isPasswordValid) {
            //create  a JWT token (you should generate dynamically instead of hardcoding)
            const token = await user.getJWT();
            // console.log("JWT:", process.env.JWT_SECRET);

            //add the token to cookie and send response back to the user 
            res.cookie("token", token);
            res.status(200).json({ message: "Login Successful" });
        } else {
            throw new Error("Invalid credentials");
        }
    } catch (err) {
        res.status(400).json({ error: "ERROR : " + err.message });
    }
});

module.exports = authRouter;