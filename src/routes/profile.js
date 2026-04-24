const express = require('express');
const profileRouter = express.Router();
const { userAuth } = require("../middlewares/auth");
const { validate } = require('../models/user');
const { validateUpdateData } = require('../utils/validation');

//get profile API
profileRouter.get("/view", userAuth, async (req, res) => {

    try {
        const user = req.user; //userAuth middleware will add the user object to the request if the token is valid

        return res.send(user);
    } catch (err) {
        return res.status(401).send("Invalid token");
    }

});

profileRouter.patch("/edit", userAuth, async (req, res) => {
    try {
        validateUpdateData(req);

        const loggedInUser = req.user; //userAuth middleware will add the user object to the request if the token is valid
        const ALLOWED_UPDATES = ["firstName", "lastName", "skills", "photoUrl", "about"];

        Object.keys(req.body).forEach((update) => {
            if (ALLOWED_UPDATES.includes(update)) {
                loggedInUser[update] = req.body[update];
            }
        });

        await loggedInUser.save();
        return res.send(loggedInUser);

    } catch (err) {
        return res.status(400).send(err.message);
    }
});

profileRouter.patch("/forgotpassword", userAuth, async (req, res) => {
    try {
        validateForgotPasswordData(req);

        const loggedInUser = req.user; //userAuth middleware will add the user object to the request if the token is valid
        const ALLOWED_UPDATES = ["password"];

        Object.keys(req.body).forEach((update) => {
            if (ALLOWED_UPDATES.includes(update)) {
                loggedInUser[update] = req.body[update];
            }
        });
        await loggedInUser.save();
        return res.send(loggedInUser);
    } catch (err) {
        return res.status(400).send(err.message);
    }
});

module.exports = profileRouter;