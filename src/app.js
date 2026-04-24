require("dotenv").config();
const express = require("express");
const app = express();
const connectDB = require("./config/database");
const cookieParser = require("cookie-parser");


app.use(cookieParser()); //middleware to parse cookies from incoming requests
app.use(express.json()); //middleware to parse JSON data from request body


const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/request");

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);

//get user by email
app.get("/user", async (req, res) => {

    try {
        const { emailId, password } = req.body;

        const user = await User.findOne({ emailId: emailId });

        if (!user) {
            throw new Error("Invalid credentials");
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (isPasswordValid) {
            // Create a JWT Token (you should generate dynamically instead of hardcoding)

            // Add the token to cookie and send response back to the user
            res.cookie("token", "kvndkfjbvhjdfbhjvbdjfbvjbdjfbvjhvbdjhvbvdjhbgvdvshgvsdv");
            res.send("Login Successful!!");
        } else {
            throw new Error("Invalid credentials");
        }

    } catch (err) {
        res.status(400).send("ERROR: " + err.message);
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

app.patch("/update/:userId", async (req, res) => {
    validateUpdateData(req);
    const userId = req.params?.userId;
    const data = req.body;

    try {
        const ALLOWED_UPDATES = ["photoUrl", "password", "about", "skills"];
        const isUpdatesAllowed = Object.keys(data).every((key) => ALLOWED_UPDATES.includes(key));
        if (!isUpdatesAllowed) {
            throw new Error("Invalid updates! Only photoUrl, password, about and skills can be updated.");
        }
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

