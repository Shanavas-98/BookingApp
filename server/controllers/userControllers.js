const bcrypt = require('bcrypt');
const UserModel = require('../models/userModel')
const { verifyToken, createToken } = require('../config/token');

const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        console.log(req.body);
        if (!name || !email || !password) {
            throw Error("every field is required")
        }
        const salt = await bcrypt.genSalt(10);
        const newUser = await UserModel.create({
            name,
            email,
            password: await bcrypt.hash(password, salt)
        })
        res.json(newUser);
    } catch (error) {
        console.log(error);
    }
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log(req.body);
        if (!email || !password) {
            throw Error('email,password required')
        }
        const user = await UserModel.findOne({ email: email });
        console.log(user);
        if (!user) {
            throw Error('user not found')
        }
        const auth = await bcrypt.compare(password, user?.password);
        console.log('auth', auth);
        if (!auth) {
            throw Error('incorrect password')
        }
        const expiry = 24 * 60 * 60;
        const token = createToken(user._id, expiry)
        res.json({ id: user._id, name: user.name, email: user.email, token: token });
    } catch (error) {
        console.log(error);
    }
}

const authUser = async (req, res) => {
    try {
        if (!req.headers.authorization || !req.headers.authorization.startsWith('Bearer')) {
            throw Error('Authorisation required')
        }
        let token = req.headers.authorization.split(' ')[1];
        if (!token || token === 'null') {
            throw Error('User token required')
        }
        const decoded = verifyToken(token);
        const user = await UserModel.findById(decoded.id,{password:0});
        if (!user) {
            throw Error('User not exists');
        }
        res.json({ id: user._id, name: user.name, email: user.email, token: token });
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    register,
    login,
    authUser
}