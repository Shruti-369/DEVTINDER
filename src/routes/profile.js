const express = require('express');
const profileRouter = express.Router();
const { userAuth } = require("../middlewares/auth");

//get profile API
profileRouter.get("/", userAuth, async (req, res) => {
    // const cookies = req.cookies;
    // // console.log("Cookies:", cookies);

    // //extract the token from cookies 
    // const { token } = cookies;

    // //[✅ check FIRST] if token is not present in cookies, return unauthorized error
    // if (!token) {
    //     return res.status(401).send("Unauthorized: No token provided");
    // }

    try {
        // // ✅ verify AFTER check
        // const decodedmessage = jwt.verify(token, process.env.JWT_SECRET);
        // // console.log("Decoded JWT:", decodedmessage);
        // const { _id } = decodedmessage;
        // // console.log("User ID from token:", _id);
        // const user = await User.findById(_id);
        // if (!user) {
        //     return res.status(404).send("User not found");
        // }
        const user = req.user; //userAuth middleware will add the user object to the request if the token is valid

        return res.send(user);
    } catch (err) {
        return res.status(401).send("Invalid token");
    }

});

module.exports = profileRouter;