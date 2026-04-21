require('dotenv').config();
const express = require("express");
const app = express();
const connectDB = require("./config/database");
const User = require("./models/user");

app.use(express.json()); //middleware to parse JSON data from request body


//push notification API 
app.post("/signup", async (req, res) => {

    //creating a new instance of User model and saving it to the database
    try {
        const user = new User(req.body);
        await user.save();
        res.json({ message: "User created successfully!", user });
    } catch (err) {
        console.error("Signup error:", err);
        res.status(500).json({ error: err.message });
    }
});

//get user by email
app.get("/user", async (req, res) => {

    try {
        const userEmail = req.body.emailId;
        const user = await User.find({ emailId: userEmail });
        if (user.length === 0) {
            return res.status(404).json({ message: "User not found" });
        } else {
            res.send(user);
        }
        res.send(user);
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
});

//feed API - GET /feed - get  all the users from the database
app.get("/feed", async (req, res) => {
    try {
        const users = await User.find({});
        res.send(users);
    }
    catch (err) {
        res.status(400).send("Something went wrong");
    }
});

app.delete("/delete", async (req, res) => {
    const userId = req.body.id;
    try {
        //const user = await User.findByIdAndDelete(_id:userId);
        const user = await User.findByIdAndDelete(userId);
        res.send("User deleted successfully");
    } catch (err) {
        res.status(400).send("Something went wrong");
    }
});

app.patch("/update", async (req, res) => {
    const userId = req.body.userId;
    const data = req.body;
    try {
        const user = await User.findByIdAndUpdate(userId, data, {
            new: true,
            runValidators: true
        });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.json({ message: "User updated successfully!", user });
    }
    catch (err) {
        res.status(400).send("UPDATE FAILED: " + err.message);
    }
});

connectDB()
    .then(() => {
        console.log("✅ DB connected successfully")
        app.listen(process.env.PORT, () => {
            console.log(`Server is running on port ${process.env.PORT} 🚀`);
        });
    })
    .catch((err) => console.log("❌ DB connection failed", err));








// //this will only handle GET call to /user
// app.get("/user", ()=>{
//     res.send({firstname: "Shruti", lastname: "jangra"});
// });

// app.post("/user", ()=>{s running on port 3006 🚀");
// });


//     // saving data to db
//     res.send("data saved successfully");
// });

// //this will match all the HTTP method API calls to /test
// app.use("/test", (req, res) => {
//     res.send("test");
// });

// app.use("/", (req, res) => {
//     res.send("home");
// });

// app.listen(3006, () => {
//     console.log("Server i


//

