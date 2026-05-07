const express = require('express');
const requestRouter = express.Router();
const { userAuth } = require("../middlewares/auth");

requestRouter.post("/request/send/interested/:toUserId", userAuth, async (req, res) => {
    try {

    } catch (error) {
        res.status(400).json({ error: error.message });
    }
})

module.exports = requestRouter;