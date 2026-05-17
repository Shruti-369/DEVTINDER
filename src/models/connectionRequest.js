const mongoose = require('mongoose');

const connectionRequestSchema = new mongoose.Schema({

    fromUserId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", // reference to the user collection 
        required: true,
    }, // ObjectId of the user who sent the connection request

    toUserId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
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

connectionRequestSchema.index({ fromUserId: 1, toUserId: 1 }, { unique: true });


//pre is a middleware
// it will be called before saving a connection request to the database, we can use it to perform any necessary operations or validations on the connection request data before it is saved. For example, we can check if there is already an existing connection request between the same users and prevent duplicate requests from being saved.
connectionRequestSchema.pre("save", function () {
    const connectionRequest = this;

    // Check if the fromUserId and toUserId are the same
    if (
        connectionRequest.fromUserId.equals(
            connectionRequest.toUserId
        )
    ) {
        throw new Error(
            "Cannot send connection request to yourself"
        );
    }
});


const ConnectionRequest = mongoose.model('ConnectionRequest', connectionRequestSchema);

module.exports = ConnectionRequestModel = ConnectionRequest;