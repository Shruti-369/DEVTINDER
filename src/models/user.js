const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String
    },
    emailId: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    }

});

const User = mongoose.model("User", userSchema);
//always capital first letter for model name and it should be singular and mongoose will automatically create a collection with plural name in the database
  
module.exports = User;