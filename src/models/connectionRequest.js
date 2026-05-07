const mongoose = require('mongoose');

const connectionRequestSchema = new mongoose.Schema({

    fromUserId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    }, // ObjectId of the user who sent the connection request

    toUserId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    }, // ObjectId of the user who received the connection request

    status: { // 'ignored', 'interested', 'accepted', 'rejected'
        type: String,
        enum: {
            values: ['accepted', 'rejected', 'ignored', 'interested'],
            message: '{VALUE} is not a valid status'
        },
        default: 'rejected'
    }
},
    {
        timestamps: true
    }

);

const ConnectionRequest = mongoose.model('ConnectionRequest', connectionRequestSchema);

module.exports = ConnectionRequestModel = ConnectionRequest;