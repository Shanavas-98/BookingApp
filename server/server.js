const express = require('express');
require('dotenv').config()
const cors = require('cors');
const connectDatabase = require('./config/database');
const UserModel = require('./models/userModel');
const bcrypt = require('bcrypt');
const app = express();

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

//routes
app.post('/register', async(req,res)=>{
    try {
        const {name, email, password} = req.body;
        console.log(req.body);
        if(!name || !email || !password){
            throw Error("every field is required")
        }
        const salt=await bcrypt.genSalt(10);
        const newUser = await UserModel.create({
            name,
            email,
            password:await bcrypt.hash(password,salt)
        })
        res.json(newUser);
    } catch (error) {
        console.log(error);
    }
})

app.post('/login', async(req,res)=>{
    try {
        const {email,password} = req.body;
        console.log(req.body);
        if(!email || !password){
            throw Error('email,password required')
        }
        const user = await UserModel.findOne({email:email});
        console.log(user);
        if(!user){
            throw Error('user not found')
        }
        const auth = await bcrypt.compare(password, user?.password);
        console.log('auth',auth);
        if(!auth){
            throw Error('incorrect password')
        }
        res.json(user);
    } catch (error) {
        console.log(error);
    }
})

//server
app.listen(process.env.PORT, (err)=>{
    if(err){
        console.log(err);
    }else{
        console.log(`Server running on ${process.env.SERVER_URL}`);
    }
})