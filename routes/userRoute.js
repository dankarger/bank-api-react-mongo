const express = require('express');
const userRoute = express.Router();
const UserController = require('../controller/user.controller.js')

userRoute.get('/', UserController.getUsers)

module.exports = userRoute;
