import axios from 'axios';

const url = 'http://localhost:8080';

export const fetchTodos = () => axios.get(url).then(res => res.data).catch(e => console.log(e));

export const createTodo = (newTodo) => axios.post(url, newTodo);

export const updateTodo = (id, updatedTodo) => axios.patch(`${url}/${id}`, updatedTodo);

export const deleteTodo = (id) => axios.delete(`${url}/${id}`);