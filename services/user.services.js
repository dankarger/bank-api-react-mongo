const User = require("../models/user.model");

const getUsers = async ()=> {
    const data =  await User.find();
    console.log('data',data)
    return data
}

const addUser = async (req, res) => {
    const user = await User.create(req.body)
    return user
}

const getUser = async (passId) => {
    const user = await User.findOne({passId: passId})
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

const editUser = async (id, user ) => {
    const updatedUser = await User.findByIdAndUpdate({ _id: id }, { $set: { "details.discount": discount }}, { new: true })
    // const updatedUser = await User.replaceOne({_id: id}, {user});
    return updatedUser
}


const depositToUser = async (id, amount) => {
    const user = await User.findOneAndUpdate({passId : id}, {$inc : {cash: amount}})
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

const addCredit = async (id, amount) => {
    const user = await User.findOneAndUpdate({passId:id}, {$inc : {credit:amount}})
    return user
}

const withDraw = async (passId,amount) => {
       let user = await User.findOne({passId:passId});
       user.cash -= +amount;
       user.save()
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
    filterUsers,
    depositToUser,
    addCredit,
    withDraw

}