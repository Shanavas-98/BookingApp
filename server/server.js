const express = require('express');
require('dotenv').config()
const cors = require('cors');
const connectDatabase = require('./config/database');
const app = express();
const userRoutes = require('./routes/userRoutes')

connectDatabase();

//cross origin connection
app.use(cors({
    credentials: true,
    origin:process.env.CLIENT_URL,
    methods:['GET', 'PUT', 'POST', 'PATCH', 'DELETE'],
}))

// Middleware to parse form data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//static files setup
app.use('/uploads',express.static(__dirname + '/public/uploads'));

//routes
app.use('/',userRoutes);

//server
app.listen(process.env.PORT, (err)=>{
    if(err){
        console.log(err);
    }else{
        console.log(`Server running on ${process.env.SERVER_URL}`);
    }
})