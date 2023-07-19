const express = require('express');
const router = express.Router();

const { verify } = require('../middleware/auth.middleware')

const {
    getTask,
    logoutHandle,
    addTask,
    getEditTask,
    editTaskHandle,
    deleteTask,
    doneTask,
    pendingTask,
} = require('../controllers/user.controllers')

router.route('/task')
    .get(verify, getTask)

router.route('/add-task')
    .post(verify, addTask)

router.route('/add-task')
    .post(verify, addTask)

router.route('/edit-task/:taskId')
    .get(verify, getEditTask)
    .post(verify, editTaskHandle)

router.route('/delete-task')
    .post(verify, deleteTask)

router.route('/done-task')
    .post(verify, doneTask)

router.route('/pending-task')
    .post(verify, pendingTask)

router.route('/logout')
    .post(logoutHandle)

module.exports = router;