const mongoose = require('mongoose');
const { minify } = require('vite');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        minlength: 4
    },
    lastName: {
        type: String
    },
    emailId: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true,
        min: 18
    },
    gender: {
        type: String,
        enum: ["male", "female", "other"],
        lowercase: true,
        trim: true
    },
    photoUrl: {
        type: String,
        default: "/assets/dummyUser.webp"
    },
    about: {
        type: String,
        default: "Hey there! I am using this app."
    },
    skills: {
        type: [String]
    },

});

const User = mongoose.model("User", userSchema);
//always capital first letter for model name and it should be singular and mongoose will automatically create a collection with plural name in the database

module.exports = User;