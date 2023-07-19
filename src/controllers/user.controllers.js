const User = require('../models/user.models');
const Task = require('../models/task.models');

const getTask = async (req, res) => {
    const user = req.user;
    const tasks = [];
    for (let id of user.tasks){
        let task = await Task.findById(id);
        tasks.push(task)
    }
    res.render('task', { user, tasks });
}

const addTask = async (req, res) => {
    const user = req.user;
    const task = req.body.task;
    const newTask = new Task({ content: task });
    await newTask.save();
    user.tasks.push(newTask._id);
    await user.save()
    res.redirect('/user/task')
}

const getEditTask = async (req, res) => {
    const taskId = req.params.taskId;
    const task = await Task.findById(taskId);
    res.render('edit-task', { task })
}

const editTaskHandle = async (req, res) => {
    const { taskId, task } = req.body;
    await Task.findByIdAndUpdate(taskId, { content: task });
    res.redirect('/user/task')
}

const deleteTask = async (req, res) => {
    const taskId = req.body.taskId;
    const user = req.user;
    await Task.findByIdAndDelete(taskId);
    user.tasks = user.tasks.filter(id => id.toString() !== taskId)
    await user.save();
    res.redirect('/user/task')
}

const doneTask = async (req, res) => {
    const taskId = req.body.taskId;
    await Task.findByIdAndUpdate(taskId, { status: true });
    res.redirect('/user/task')
    
}

const pendingTask = async (req, res) => {
    const taskId = req.body.taskId;
    await Task.findByIdAndUpdate(taskId, { status: false });
    res.redirect('/user/task')
    
}

const logoutHandle = (req, res) => {
    res.clearCookie('jwt');
    res.redirect('/login')
}



module.exports = {
    getTask,
    logoutHandle,
    addTask,
    getEditTask,
    editTaskHandle,
    deleteTask,
    doneTask,
    pendingTask
}