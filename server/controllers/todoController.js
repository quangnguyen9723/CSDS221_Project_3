const mongoose = require("mongoose");

const Todo = require("../models/todo");

exports.getTodos = async (req, res) => {
    try {
        const todos = await Todo.find();

        res.status(200).json(todos);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

exports.createTodo = async (req, res) => {
    const { username, title, description, deadline, priority, isComplete } = req.body;

    const newTodo = new Todo({ username, title, description, deadline, priority, isComplete })

    try {
        await newTodo.save();

        res.status(201).json(newTodo);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
};

exports.updateTodo = async (req, res) => {
    const { id } = req.params;
    const { username, title, description, deadline, priority, isComplete } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No todo with id: ${id}`);

    const updatedTodo = { username, title, description, deadline, priority, isComplete, _id: id };

    await Todo.findByIdAndUpdate(id, updatedTodo, { new: true });

    res.json(updatedTodo);
};

exports.deleteTodo = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No todo with id: ${id}`);

    await Todo.findByIdAndRemove(id);

    res.json({ message: "Todo deleted successfully." });
};