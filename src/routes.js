const StudentController = require('./StudentController');

const routes = require('express').Router();
const studentController = require('./StudentController');

routes.post('/register', studentController.insert);
routes.delete('/register/:id', studentController.delete);
routes.get('/register', studentController.index);
routes.get('/register/student/:id', studentController.findOne);

module.exports = routes;