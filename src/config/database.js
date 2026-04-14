require('dotenv').config();
const mongoose = require('mongoose');

const connectDB = async () => {
    await mongoose.connect(
        process.env.MONGO_URI
    );  //this will return a promise therefore async await or then catch can be used
} // whenever will call this function it will return a promise and we can handle that promise in app.js file

module.exports = connectDB; 
