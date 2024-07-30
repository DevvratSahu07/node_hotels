const mongoose = require('mongoose');
require('dotenv').config();

// Define the MongoDB connection URL
// const mongoURL = process.env.MONGODB_RUL_LOCAL; // local URL
const mongoURL = process.env.MONGODB_URL; // Online (MongoDB Atlas Url)

// Setup mongodb connection
mongoose.connect(mongoURL,{
    useNewUrlParser: true,
    useUnifiedTopology: true
})
// Mongodb default connection object
const db = mongoose.connection;

// Define event listeners for database connection
db.on('connected', ()=>{
    console.log("Connected to mongodb server");
});

db.on('error', (err)=>{
    console.log("Mongodb connection error: ",err);
});

db.on('disconnected', ()=>{
    console.log("Mongodb disonnected");
});

// Export the database connection
module.exports = db;
