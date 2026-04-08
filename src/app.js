const express = require("express");

const app = express();

const {adminAuth, userAuth} = require("./middlewares/auth");

// //this will only handle GET call to /user
// app.get("/user", ()=>{
//     res.send({firstname: "Shruti", lastname: "jangra"});
// });

// app.post("/user", ()=>{s running on port 3006 🚀");
// });

// Handle Auth Middleware for all GET< POST, ...requests
app.use("/admin", adminAuth);

app.post("/user/login", () => {
    res.send("User logged in successfully");
})

app.get("/user", userAuth, (req, res) => {
    res.send({ firstname: "Shruti", lastname: "jangra" });
});

app.get("/admin/getAllData", (req, res) => {
    //logic of checking if the user is admin or not
    const token = "xyz";
    const isAdminAuthorized = token == "xyz";
    if (isAdminAuthorized) {
        res.send("All data");
    } else {
        res.status(403).send("Unauthorized");
    }
});

app.get("/admin/deleteUser", (req, res) => {
    //logic of checking if the user is admin or not
    const token = "xyz";
    const isAdminAuthorized = token == "xyz";
    if (isAdminAuthorized) {
        res.send("User deleted successfully");
    } else {
        res.status(403).send("Unauthorized");
    }
});

app.listen(7777, () => {
    console.log("Server is running on port 7777 🚀");
});
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