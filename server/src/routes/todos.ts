import express from 'express';

import { getTodos, postTodo, deleteTodo, updateTodo } from '../controllers/todos';

const route = express.Router();

// todo route
route.get('/todos', getTodos);
route.post('/todo', postTodo);
route.put('/todo/:todoId', updateTodo);
route.delete('/todo/:todoId', deleteTodo);

export default route;