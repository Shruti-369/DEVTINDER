const mongoose = require('mongoose');
const { minify } = require('vite');
const validator = require("validator");

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        minlength: 4,
        maxlength: 50,
        trim: true,         // ➕ removes accidental spaces
    },
    lastName: {
        type: String,
        maxlength: 50,
        trim: true,
    },
    emailId: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error("Invalid email address");
            }
        }
    },
    password: {
        type: String,
        required: true,
        validate(value) {
            if (!validator.isStrongPassword(value)) {
                throw new Error("Use 8+ chars with uppercase, number & symbol");
                //                ↑ fix your misleading message too
            }
        }
    },
    age: {
        type: Number,
        required: true,
        min: [18, "Must be at least 18"],   // ➕ custom message
        max: [120, "Invalid age"],
    },
    gender: {
        type: String,
        enum: {
            values: ["male", "female", "other"],
            message: "{VALUE} is not a valid gender"
        },
        lowercase: true,
        trim: true,
    },
    photoUrl: {
        type: String,
        default: "/assets/dummyUser.webp",
        validate(value) {
            if (!validator.isURL(value)) {
                throw new Error("photoUrl must be a valid URL");
            }
        }
    },
    about: {
        type: String,
        default: "Hey there! I am using this app.",
        maxlength: [200, "About must be under 200 characters"],  // ➕
    },
    skills: {
        type: [String],
        validate(value) {
            if (value.length > 25) {
                throw new Error("Cannot have more than 25 skills");
            }
        }
    },
},
    {
        timestamps: true
    });

const User = mongoose.model("User", userSchema);
//always capital first letter for model name and it should be singular and mongoose will automatically create a collection with plural name in the database

module.exports = User;