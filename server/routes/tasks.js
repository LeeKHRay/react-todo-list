const express = require("express");
const router = express.Router();

const { authentication } = require('../middlewares');

const mongoose = require("mongoose");
const Task = require("../models/Task");

router.use(authentication); // default path is '/'

router.get("/", async (req, res) => {
    const { username } = req.payload;

    const tasks = await Task.find({ username }).exec();

    res.send(tasks.map(({ _id, task, isDone, username }) => ({ id: _id, task, isDone, username })));
});

router.post("/", async (req, res) => {
    const { username } = req.payload;

    const { _id, task, isDone } = await Task.create({ task: req.body.task, username });

    res.setHeader("Location", `http://localhost:3000/api/tasks/${_id}`).status(201).send({ id: _id, task, isDone, username });
});

router.put("/", async (req, res) => {
    const { username } = req.payload;
    const tasks = req.body;
    console.log(req.body);
    console.log(tasks.map((task) => ({
        replaceOne: {
            upsert: true,
            filter: { _id: new mongoose.Types.ObjectId(task.id), username },
            replacement: task
        }
    })));

    await Task.bulkWrite(tasks.map((task) => ({
        replaceOne: {
            upsert: true,
            filter: { _id: new mongoose.Types.ObjectId(task.id), username },
            replacement: task
        }
    })));

    res.send({});
});

router.delete("/:id", async (req, res) => {
    const { username } = req.payload;
    const { id } = req.params;

    await Task.deleteOne({ username, _id: new mongoose.Types.ObjectId(id) }).exec();

    res.send({});
});

module.exports = router;