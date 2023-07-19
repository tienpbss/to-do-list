const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/user.models');


const getIndex = (req, res) => {
    res.render('index');
}

const getLogin = (req, res) => {
    res.render('login');
}

const loginHandle = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
        res.redirect('login');
    }
    const checkPassword = await bcrypt.compare(password, user.password);
    if (!checkPassword){
        return res.redirect('login')
    }
    const token = jwt.sign({ id: user.id }, process.env.JWT_KEY);
    res.cookie('jwt', token);
    res.redirect('/user/task');
}

const getRegister = (req, res) => {
    res.render('register');
}

const registerHandle = async (req, res) => {
    const { username, email, password } = req.body;
    const salt = 10;
    const hashedPassword = await bcrypt.hash(password, salt);
    const result = await User.create({
        username,
        email,
        password: hashedPassword
    })
    res.redirect('login');  
}


module.exports = {
    getIndex,
    getLogin,
    loginHandle,
    getRegister,
    registerHandle
}