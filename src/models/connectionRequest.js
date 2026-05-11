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

//pre is a middleware
// it will be called before saving a connection request to the database, we can use it to perform any necessary operations or validations on the connection request data before it is saved. For example, we can check if there is already an existing connection request between the same users and prevent duplicate requests from being saved.
connectionRequestSchema.pre("save", async function (next) {
    const connectionRequest = this;
    // Check if the fromUserId and toUserId are the same
    if (connectionRequest.fromUserId.equals(connectionRequest.toUserId)) {
        throw new Error("Cannot send connection request to yourself");
    }

    //very imp to call next() at the end of the pre middleware, otherwise the save operation will be stuck and the connection request will not be saved to the database
    next();
});


const ConnectionRequest = mongoose.model('ConnectionRequest', connectionRequestSchema);

module.exports = ConnectionRequestModel = ConnectionRequest;