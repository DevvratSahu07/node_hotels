const mongoose = require('mongoose');
const mongoURL = 'mongodb://localhost:27017/hotels';

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
