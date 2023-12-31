const dotenv = require('dotenv')
//dot env configuration
dotenv.config()
const express = require('express');
const app = express();
const cors = require('cors');
const connectDatabase = require('./config/database');
const userRouter = require('./routes/userRoutes');
const placeRouter = require('./routes/placeRoutes');

//database connection
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
app.use('/uploads',express.static(__dirname + '/uploads'));

//routes
app.use('/',userRouter);
app.use('/places',placeRouter);

//server
app.listen(process.env.PORT, (err)=>{
    if(err){
        console.log(err);
    }else{
        console.log(`Server running on ${process.env.SERVER_URL}`);
    }
})