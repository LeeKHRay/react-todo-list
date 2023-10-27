const express = require("express");
const router = express.Router();

const { authentication } = require('../middlewares');

const mongoose = require("mongoose");
const Task = require("../models/Task");

router.use(authentication); // default path is '/'

router.get("/", async (req, res) => {
    const { username } = req.payload;

    const tasks = await Task.find({ username }, "-username").sort({ priority: 1 }).exec();

    res.send(tasks.map(({ _id, task, priority, isDone }) => ({ id: _id, task, priority, isDone })));
});

router.post("/", async (req, res) => {
    const { username } = req.payload;
    const { task } = req.body;

    const priority = await Task.countDocuments({ username }).exec() + 1;
    const { _id, isDone } = await Task.create({ task, priority, username });

    res.setHeader("Location", `http://localhost:3000/api/tasks/${_id}`).status(201).send({ id: _id, task, priority, isDone });
});

router.put("/", async (req, res) => {
    const { username } = req.payload;
    const tasks = req.body;

    await Task.bulkWrite(tasks.map((task) => ({
        replaceOne: {
            upsert: true,
            filter: { _id: new mongoose.Types.ObjectId(task.id), username },
            replacement: {
                ...task,
                username
            }
        }
    })));

    res.send({});
});

router.delete("/:id", async (req, res) => {
    const { username } = req.payload;
    const { id } = req.params;

    await Task.deleteOne({ _id: new mongoose.Types.ObjectId(id), username }).exec();

    res.send({});
});

module.exports = router;