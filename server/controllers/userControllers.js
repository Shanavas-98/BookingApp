const bcrypt = require('bcrypt');
const UserModel = require('../models/userModel')
const { verifyToken, createToken } = require('../config/token');

const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            throw { status: 400, message: "Every field is required" };
        }
        const salt = await bcrypt.genSalt(10);
        const newUser = await UserModel.create({
            name,
            email,
            password: await bcrypt.hash(password, salt)
        })
        res.status(200).json(newUser);
    } catch (error) {
        console.log("register", error);
        res.status(error.status || 500).json({
            name: error.name || 'Internal Server Error',
            message: error.message || 'Something went wrong on the server.',
            stack: error.stack
        });
    }
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            throw { status: 400, message: 'Email and password are required.' };
        }
        const user = await UserModel.findOne({ email: email });
        if (!user) {
            throw { status: 404, message: 'User not found.' };
        }
        const auth = await bcrypt.compare(password, user?.password);
        if (!auth) {
            throw { status: 401, message: 'Incorrect password.' };
        }
        const expiry = 24 * 60 * 60;
        const token = createToken(user._id, expiry)
        res.status(200).json({ id: user._id, name: user.name, email: user.email, token: token });
    } catch (error) {
        console.log("login", error);
        res.status(error.status || 500).json({
            name: error.name || 'Internal Server Error',
            message: error.message || 'Something went wrong on the server.',
            stack: error.stack
        });
    }
}

const authUser = async (req, res) => {
    try {
        if (!req.headers.authorization || !req.headers.authorization.startsWith('Bearer')) {
            throw { status: 401, message: 'Authorization required' };
        }
        let token = req.headers.authorization.split(' ')[1];
        if (!token || token == 'null') {
            throw { status: 401, message: 'User token required' };
        }
        const decoded = verifyToken(token); 
        const user = await UserModel.findById(decoded.id, { password: 0 });
        if (!user) {
            throw { status: 404, message: 'User not found' };
        }
        res.status(200).json({ id: user._id, name: user.name, email: user.email, token: token });
    } catch (error) {
        console.log("auth user", error.name);
        res.status(error.status || 500).json({
            name: error.name || 'Internal Server Error',
            message: error.message || 'Something went wrong on the server.',
            stack: error.stack
        });
    }
}

module.exports = {
    register,
    login,
    authUser,
}