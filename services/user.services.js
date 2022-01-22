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
    // const user = await User.findByIdAndUpdate({ _id: id }, { $set: { "details.discount": discount }}, { new: true })
    const updatedUser = await User.replaceOne({_id: id}, {user});
    return updatedUser
}

// const transferCash = async (req, res) => {
//     const { fromId, toId, amount } = req.body
//     if (fromId === toId) res.json({ message: 'Cant transfer money tosame acount ' })
//     try {
//         const isClientCredit = await checkClientCredit(fromId, amount)
//         if (!isClientCredit) res.status(200).json({ message: 'the client reached his credit limit' })
//         await Client.findOne({passportId : fromId}, {$inc: {cash: -amount}}).save()
//         // await Client.findOneAndUpdate({ passportId: fromId }, {$inc: { cash: -amount }})
//         await Client.findOne({ passportId: toId }, { $inc: { cash: amount }}).save()
//         // await Client.findOneAndUpdate({ passportId: toId }, { $inc: { cash: amount }})
//         res.json({ message: `transferred ${amount} shmeckles from id ${fromId} to id ${toId}`})
//     } catch (err) {
//         res.status(200).json({ message: 'something went wrong with the transfer' })
//     }
// }

const depositToUser = async (id, amount) => {
    const user = await User.findOneAndUpdate({passportId : id}, {$inc : {cash: amount}})
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

const addCredit = async (passId, amount) => {
    const user = await User.findOneAndUpdate({passportId : passId}, {$inc : {credit: amount}})
    return user
}

const withDraw = async (passId,amount) => {
        const user = await User.findOneAndUpdate({passId : passId}, {$inc : {cash: -amount}})
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