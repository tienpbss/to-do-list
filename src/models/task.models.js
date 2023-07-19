const mongoose = require('mongoose');

const TaskSchema = mongoose.Schema({
    content: {
        type: String,
        required: true
    },
    status: {
        type: Boolean,
        default: false
    }
},
    {
        timestamps: true,
    })

const TaskModel = mongoose.model('Task', TaskSchema);

module.exports = TaskModel;