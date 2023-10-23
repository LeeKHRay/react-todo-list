const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
    task: { type: String, required: true },
    isDone: { type: Boolean, required: true, default: false },
    username: { type: String, required: true }
});

module.exports = mongoose.model("Task", TaskSchema);