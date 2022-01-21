const UserService = require('../services/user.services')

const getUsers = async function (req, res) {
    console.log('log')
    try {
        const users = await UserService.getUsers();
        console.log('user',users)
        res.status(200).send(users);
    } catch (e) {
        res.status(400).send({error: e.message})
    }
}


module.exports = {
    getUsers
}