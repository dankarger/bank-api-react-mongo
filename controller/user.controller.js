const UserService = require('../services/user.services')

const getUsers = async function (req, res) {
    try {
        const users = await UserService.getUsers();
        res.status(200).send(users);
    } catch (e) {
        res.status(400).send({error: e.message})
    }
}
const getUser = async function (req, res) {
    try {
        const users = await UserService.getUser(req.params.passId);
        res.status(200).send(users);
    } catch (e) {
        res.status(400).send({error: e.message})
    }
}


const addUser = async function (req, res ) {
    try {
        const users = await UserService.addUser(req, res);
        console.log('user',users)
        res.status(200).send(users);
    } catch (e) {
        res.status(400).send({error: e.message})
    }
}


const deleteUser = async function (req, res ) {
    try {
        console.log('req',req.params.id)
        const deleteUser = await UserService.deleteUser(req.params.id);
        res.status(200).send(deleteUser);
    } catch (e) {
        res.status(400).send({error: e.message})
    }
}


module.exports = {
    getUsers,
    addUser,
    deleteUser,
    getUser
}