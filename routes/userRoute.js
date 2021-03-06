const express = require('express');
const userRoute = express.Router();
const UserController = require('../controller/user.controller')

userRoute.get('/get-users', UserController.getUsers);
userRoute.get('/get-user/:passId', UserController.getUser);
userRoute.post('/add-user', UserController.addUser);
userRoute.delete('/delete-user/:id', UserController.deleteUser);
userRoute.put('/edit-user/:id', UserController.updateUser);
userRoute.put('/deposit/:id', UserController.depositToUser);
userRoute.put('/add-credit/:passId', UserController.addCredit);
userRoute.put('/withdraw/:passId', UserController.withdraw);


module.exports = userRoute;
