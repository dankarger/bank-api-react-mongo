const express = require('express');
const userRoute = express.Router();
const UserController = require('../controller/user.controller')

userRoute.get('/getUsers', UserController.getUsers)

module.exports = userRoute;
