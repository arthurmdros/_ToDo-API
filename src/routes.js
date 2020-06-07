const express = require('express');
const ToDoController = require('./controllers/toDoController');

const routes = express.Router();

routes.get('/index', ToDoController.index);
routes.post('/create', ToDoController.create);
routes.delete('/delete/:id', ToDoController.delete);
routes.put('/update/:id', ToDoController.update);

module.exports = routes;