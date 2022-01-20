const User = require("../models/user.model.js");

const getUsers = async ()=> {
    const users=  await User.find();
    return users
}

const addUser = async (req, res) => {
    const user = await User.create(req.body)
    return user
}

const getUser = async (id) => {
    const user = await User.findById(id)
    return user
}

const getActiveUsers = async () => {
    const users = await User.where("isActive").equals("true");
    return users
}
const deleteUser = async (id) => {
    const user = await User.deleteOne({_id:id})
    return (user);
}
const deleteAllUsers = async () => {
    const user = await User.deleteMany({})
    return user;
}

const editUser = async (id, discount ) => {
    const user = await User.findByIdAndUpdate({ _id: id }, { $set: { "details.discount": discount }}, { new: true })
    return user
}
const changeActiveUser = async (id, isActive ) => {
    const user = await User.findByIdAndUpdate({ _id: id }, { $set: { isActive: isActive }}, { new: true })
    return user
}

const filterUsers = async (min, max) => {
    const user = await User.where("cash").gt(+min).where("cash").lt(+max)
    return user
}


module.exports = {
    getUsers,
    addUser,
    getUser,
    deleteUser,
    deleteAllUsers,
    getActiveUsers,
    editUser,
    changeActiveUser,
    filterUsers
}