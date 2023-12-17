const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
    name: { type: String, required: true },
    isDone: { type: Boolean, required: true, default: false },
    priority: { type: Number, required: true },
    username: { type: String, required: true }
});

module.exports = mongoose.model("Task", TaskSchema);