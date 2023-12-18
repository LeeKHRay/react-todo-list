const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
    name: { type: String, required: true },
    isCompleted: { type: Boolean, required: true, default: false },
    priority: { type: Number, required: true },
    username: { type: String, required: true }
});

module.exports = mongoose.model("Task", TaskSchema);