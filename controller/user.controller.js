const UserService = require('../services/user.services')
const utils = require('../utils/utils')

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
        const user = await UserService.getUser(req.params.passId);
        console.log('find', user)
        res.status(200).send(user);
    } catch (e) {
        res.status(400).send({error: e.message})
    }
}

const addUser = async function (req, res) {
    try {
        const users = await UserService.addUser(req, res);
        console.log('user-add', users)
        res.status(200).send(users);
    } catch (e) {
        res.status(400).send({error: e.message})
    }
}

const deleteUser = async function (req, res) {
    try {
        console.log('req', req.params.id)
        const deleteUser = await UserService.deleteUser(req.params.id);
        res.status(200).send(deleteUser);
    } catch (e) {
        res.status(400).send({error: e.message})
    }
}

const depositToUser = async (req, res) => {
    const {id} = req.params
    const {amount} = req.body
    try {
        const deposit = await UserService.depositToUser(id, amount)
        // res.status(200).json({message: `deposit ${amount}  to user id ${id}`})
        res.status(200).send(deposit)

    } catch (err) {
        res.status(400).json({message: err})
    }
}

const updateUser = async function (req, res) {
    try {
        const updatedUSer = await UserService.editUser(req.params.id, req.body);
        res.status(200).send(updatedUSer);
    } catch (e) {
        res.status(400).send({error: e.message})
    }
}

const addCredit = async function (req, res) {
    try {
        const {id} = req.body;
        const {amount} = req.body;
        const updatedUser = await UserService.addCredit(id, amount);
        res.status(200).send(updatedUser);
    } catch (e) {
        res.status(400).send({error: e.message})
    }
}

const withdraw = async function (req, res) {
    const {amount} = req.body
    const {passId} = req.params
    console.log('withdraw',amount,passId)
    const isUserCredit = await utils.checkUserCredit(passId, amount)
    if (!isUserCredit) res.status(200).send({message: 'the user cant withdraw '})
    else {
        try {
            const updatedUser = await UserService.withDraw(passId, amount)
            // res.status(201).send({message: `withdrawn ${amount} shmeckles from id ${id}`})
            res.status(201).send(updatedUser)

        } catch (err) {
            res.status(400).json({message: err})
        }
    }
}
module.exports = {
    getUsers,
    addUser,
    deleteUser,
    getUser,
    updateUser,
    depositToUser,
    addCredit,
    withdraw

}