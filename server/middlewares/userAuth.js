const { verifyToken } = require("../config/token");
const UserModel = require("../models/userModel");

module.exports = async (req, res, next) => {
    try {
        if (!req.headers.authorization || !req.headers.authorization.startsWith('Bearer')) {
            throw Error('Authorisation required')
        }
        let token = req.headers.authorization.split(' ')[1];
        if (!token || token === 'null') {
            throw Error('User token required')
        }
        const decoded = verifyToken(token);
        const user = await UserModel.findById(decoded.id, { password: 0 });
        if (!user) {
            throw Error('User not exists');
        }
        req.userId = user?._id;
        next();
    } catch (error) {
        console.log("user auth middleware",error);
    }
}