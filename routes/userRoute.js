const express = require('express');
const userRoute = express.Router();
const UserController = require('../controller/user.controller')

userRoute.get('/users', UserController.getUsers)

module.exports = userRoute;
