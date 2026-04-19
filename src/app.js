require('dotenv').config();
const express = require("express");
const app = express();
const connectDB = require("./config/database");
const User = require("./models/user");

app.use(express.json()); //middleware to parse JSON data from request body

app.post("/signup", async (req, res) => {
    try {
        const user = new User({
            firstName: "Virat",
            lastName: "Kohli",
            emailId: "virat@example.com",
            password: "pass123",
            age: 37
        });
        await user.save();
        res.json({ message: "User created successfully!", user });
    } catch (err) {
        console.error("Signup error:", err);
        res.status(500).json({ error: err.message });
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

