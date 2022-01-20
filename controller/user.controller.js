const UserService = require('../services/user.services.js')



const getUsers = async function (req, res) {
    try {
        const users = await UserService.getUsers();
        res.status(200).send(users);
    } catch (e) {
        res.status(400).send({error: e.message})
    }
}


module.exports = {
    getUsers
}