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
            const fromUser = await User.findById(fromUserId);
            const toUser = await User.findById(toUserId);

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
            if (!toUser) {
                return res.status(404).json({ error: "User not found" });
            }

            const connectionRequest = new ConnectionRequest({
                fromUserId,
                toUserId,
                status
            })

            const data = await connectionRequest.save();

            let message = "";

            if (status === "interested") {
                message = `${fromUser.firstName} is interested in ${toUser.firstName}`;
            }
            else if (status === "ignored") {
                message = `${fromUser.firstName} ignored ${toUser.firstName}`;
            }

            res.json({
                message,
                connectionRequest: data,
            });

        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
)

requestRouter.post("/request/review/:status/:requestId",
    userAuth,
    async (req, res) => {
        try {
            // 1.status validation
            // 2.id's should be in db
            // 3.loggedInUser => toUserId
            // 4.prev status must be interested

            const loggedInUser = req.user;
            const { status, requestId } = req.params;

            const allowedStatus = ["accepted", "rejected"];
            if (!allowedStatus.includes(status)) {
                return res.status(400).json({ message })
            }

            const connectionRequest = await ConnectionRequest.findOne({
                _id: requestId,
                toUserId: loggedInUser._id,
                status: "interested",
            })
            if (!connectionRequest) {
                return res
                    .status(404)
                    .json({ message: "Connection Request not found" });
            }
            console.log(req.user);

            connectionRequest.status = status;

            const data = await connectionRequest.save();

            res.json({ message: "Connection request" + status, data });
        } catch (error) {
            res
                .status(400)
                .json({ error: error.message });
        }
    }
)

module.exports = requestRouter;