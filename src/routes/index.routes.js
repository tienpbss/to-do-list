const express = require('express');
const router = express.Router();

const {
    unVerify
} = require('../middleware/auth.middleware')

const {
    getIndex,
    getLogin,
    loginHandle,
    getRegister,
    registerHandle
} = require('../controllers/index.controllers')

router.route('/').get(getIndex);
router.route('/login')
    .get(unVerify, getLogin)
    .post(unVerify, loginHandle)
router.route('/register')
    .get(unVerify, getRegister)
    .post(unVerify, registerHandle)

module.exports = router;