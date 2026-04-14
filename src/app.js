require('dotenv').config();
const express = require("express");
const app = express();
const connectDB = require("./config/database");

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

