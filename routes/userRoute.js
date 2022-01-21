const express = require('express');
const userRoute = express.Router();
const UserController = require('../controller/user.controller')

// userRoute.get('/', UserController.getUsers)
userRoute.get('/get-users', UserController.getUsers)
userRoute.post('/add-user', UserController.addUser)

module.exports = userRoute;
