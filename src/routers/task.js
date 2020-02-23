const express = require('express')
const router = express.Router();

const Task = require('../models/task');

router.post('/tasks', async (req, res) => {

    const task = new Task(req.body);
    try {
        await task.save()
        res.status(201).send(task)
        
    } catch (error) {
        res.status(400).send(error)
    }
})

router.get('/tasks', async (req, res) => {
    try {
        const tasks = await Task.find({})
        res.status(200).send(tasks) 
    } catch (error) {
        res.status(404).send(error)
    }
})

router.get('/tasks/:id', async (req, res) => {

    const _id = req.params.id;

    try {
        const task = await Task.findById(_id)
        if (!task) {
            return res.status(404).send()
        }
        res.send(task)
    } catch (error) {
        res.status(500).send(error)
    }
})

router.patch('/tasks/:id', async (req, res) => {
    
    const updates = Object.keys(req.body)
    const allowedUpdateds = ['completed', 'description'];

    const isValidOperation = updates.every(update => allowedUpdateds.includes(update));

    if (!isValidOperation) {
        return res.status(400).send({error: 'Invalid Updates!!'})
    }

    try {
        // const task = await Task.findByIdAndUpdate(req.params.id, req.body, {new : true, runValidators: true})

        const task = await Task.findById(req.params.id);

        updates.forEach( update => task[update] = req.body[update] )
        task.save()

        if (!task) {
            return res.status(404).send('No task updated')
        }
        res.send(task)
    } catch (error) {
        res.status(400).send(error)
    }
})

router.delete('/tasks/:id', async (req, res) => {
    try {
        const task = await Task.findByIdAndDelete(req.params.id)

        if (!task) {
            return res.status(404).send()
        }
        res.send(task)
        
    } catch (error) {
        res.status(500).send()
    }
})

module.exports = router;