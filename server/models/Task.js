const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
    name: { type: String },
    isDone: { type: Boolean, default: false }
});

model.exports = mongoose.model("Task", TaskSchema);