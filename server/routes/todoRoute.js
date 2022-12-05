const express = require("express");
const {getTodos, createTodo, updateTodo, deleteTodo} = require("../controllers/todoController");

const router = express.Router();

router.get('/api/todos', getTodos);
router.post('/api/todos', createTodo);
router.patch('/api/todos/:id', updateTodo);
router.delete('/api/todos/:id', deleteTodo);

module.exports = router;
