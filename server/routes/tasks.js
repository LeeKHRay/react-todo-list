const express = require("express");
const router = express.Router();

const { authentication } = require('../middlewares');

const mongoose = require("mongoose");
const Task = require("../models/Task");

router.use(authentication); // default path is '/'

router.get("/", async (req, res) => {
    const { username } = req.payload;
    const { search = "" } = req.query;

    const tasks = await Task.find({ 
        username, 
        name: { $regex: `.*${search}.*`, $options : 'i' } 
    }, "-username")
    .sort({ priority: 1 })
    .exec();

    res.send(tasks.map(({ _id, name, priority, isCompleted }) => ({ id: _id, name, priority, isCompleted })));
});

router.post("/", async (req, res) => {
    const { username } = req.payload;
    const { taskName } = req.body;

    const [{ priority: prevPriority } = { priority: 0 }] = await Task.find({ username }, "priority").sort({ priority: -1 }).limit(1); // get the max priority
    const { _id, priority } = await Task.create({ name: taskName, priority: prevPriority + 1, username });

    res.status(201).send({ id: _id, name: taskName, priority, isCompleted: false });
});

router.put("/", async (req, res) => {
    const { username } = req.payload;
    const tasks = req.body;

    await Task.bulkWrite(tasks.reduce((arr, task) => {
        if (task.name) { // only update non-empty tasks
            arr.push({
                replaceOne: {
                    upsert: true,
                    filter: { _id: new mongoose.Types.ObjectId(task.id), username },
                    replacement: {
                        ...task,
                        username
                    }
                }
            });
        }

        return arr;
    }, []));

    res.send({});
});

router.delete("/:id", async (req, res) => {
    const { username } = req.payload;
    const { id } = req.params;

    await Task.deleteOne({ _id: new mongoose.Types.ObjectId(id), username }).exec();

    res.send({});
});

module.exports = router;