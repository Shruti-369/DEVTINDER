const validator = require("validator");

const validateSignUpData = (req) => {
    const { firstName, lastName, emailId, password, gender } = req.body;

    if (!firstName || !lastName) {
        throw new Error("Name is not valid!");
    }
    else if (!validator.isEmail(emailId)) {
        throw new Error("Email is not valid!");
    }
    else if (!validator.isStrongPassword(password)) {
        throw new Error("Please enter a strong Password!");
    }
    else if (!validator.isLength(password, { min: 8 })) {
        throw new Error("Password should be at least 8 characters long!");
    }
    else if (!["male", "female", "other"].includes(gender)) {
        throw new Error("Gender must be male, female or other");
    }
};

const validateLoginData = (req) => {
    const { emailId, password } = req.body;

    if (!validator.isEmail(emailId)) {
        throw new Error("Invalid Credentials");
    }
    else if (!validator.isLength(password, { min: 8 })) {
        throw new Error("Password should be at least 8 characters long!");
    }
};

const validateUpdateData = (req) => {
    const { photoUrl, about, skills } = req.body;

    if (photoUrl && !validator.isURL(photoUrl)) {
        throw new Error("Invalid URL for photo");
    }
    else if (about && !validator.isLength(about, { max: 500 })) {
        throw new Error("About section should be less than 500 characters");
    }
    if (skills && skills.length > 25) {
        throw new Error("Cannot have more than 25 skills");
    }
}

module.exports = {
    validateSignUpData,
    validateLoginData,
    validateUpdateData
};