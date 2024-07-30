const express = require('express');
const app = express();
const db = require('./db')
require('dotenv').config();
const PORT = process.env.PORT || 3000;


const bodyParser = require('body-parser');
app.use(bodyParser.json());
// const Person = require('./models/Person');
const MenuItem = require('./models/MenuItem');

app.get('/', function(req, res){
    res.send("Welcome to my hotel.. How I can help you? We have list of menu");
})

// Import the router files
const personRoutes = require('./routes/PersonRoutes');
const menuItemRoute = require('./routes/menuItemRoutes');
const { model } = require('mongoose');

// Use the routers 
app.use('/person', personRoutes);
app.use('/menu', menuItemRoute);

app.listen(PORT, ()=>{
    console.log("Listening at port 3000");
})

