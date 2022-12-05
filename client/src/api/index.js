import axios from 'axios';

// const todoUrl = 'http://localhost:8080/api/todos';
const todoUrl = '/api/todos';

export const fetchTodos = () => axios.get(todoUrl).then(res => res.data);

export const createTodo = (newTodo) => axios.post(todoUrl, newTodo);

export const updateTodo = (id, updatedTodo) => axios.patch(`${todoUrl}/${id}`, updatedTodo);

export const deleteTodo = (id) => axios.delete(`${todoUrl}/${id}`);

// const userUrl = 'http://localhost:8080/api/users';
const userUrl = '/api/users';

export const fetchUsers = () => axios.get(userUrl).then(res => res.data);

export const createUser = (newUser) => axios.post(userUrl, newUser)