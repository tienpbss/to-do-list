const jwt = require('jsonwebtoken');
const User = require('../models/user.models');

const verify = async (req, res, next) => {
    const token = req.cookies.jwt;
    if (!token){
        throw new Error('Missing token');
    }
    const decoded = jwt.verify(token, process.env.JWT_KEY);
    const userId = decoded.id;
    const user = await User.findById(userId);
    req.user = user
    next();
}

const unVerify = (req, res, next) => {
    const token = req.cookies.jwt;
    if (token){
        throw new Error('You are logged');
    }
    next();
}

module.exports = {
    verify,
    unVerify
};