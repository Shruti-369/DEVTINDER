const express = require('express');
const requestRouter = express.Router();
const { userAuth } = require("../middlewares/auth");
const { connection } = require('mongoose')
const ConnectionRequest = require("../models/connectionRequest");
const User = require("../models/user");

requestRouter.post("/request/send/:status/:toUserId",
    userAuth,
    async (req, res) => {

        try {
            const fromUserId = req.user._id;
            const toUserId = req.params.toUserId;
            const status = req.params.status;

            const validStatuses = ['ignored', 'interested'];
            if (!validStatuses.includes(status)) {
                return res
                    .status(400)
                    .json({ error: "Invalid status value" });
            }


            // CHECK IF THERE IS AN EXISTING REQUEST BETWEEN THESE TWO USERS
            const existingRequest = await ConnectionRequest.findOne({
                $or: [
                    { fromUserId, toUserId },
                    { fromUserId: toUserId, toUserId: fromUserId }
                ]
            });

            if (existingRequest) {
                return res.status(400).json({ error: "Connection request already exists" });
            }

            //if toUserId not in db 
            const toUser = await User.findById(toUserId);
            if (!toUser) {
                return res.status(404).json({ error: "User not found" });
            }

            const connectionRequest = new ConnectionRequest({
                fromUserId,
                toUserId,
                status
            })

            const data = await connectionRequest.save();

            res.json({
                message: "Connection request sent successfully",
                connectionRequest: data,
            })

        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    })

module.exports = requestRouter;