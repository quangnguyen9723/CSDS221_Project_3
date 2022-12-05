const mongoose = require("mongoose");

const todoSchema = mongoose.Schema({
    username: String,
    title: String,
    description: String,
    deadline: Date,
    priority: String,
    isComplete: Boolean,
});

const Todo = mongoose.model("Todo", todoSchema);

module.exports = Todo;